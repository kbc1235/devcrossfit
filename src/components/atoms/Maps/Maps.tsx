import ReactDOMServer from "react-dom/server";
import { useEffect, useState } from "react";
import styled from "styled-components";
import theme from "../../../styles/theme";
import CrossfitText from "../../../assets/svg/crossfit";
declare global {
  interface Window {
    kakao: any;
  }
}

export default function Maps() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          let container = document.getElementById("map");
          let options = {
            center: new window.kakao.maps.LatLng(latitude, longitude),
            level: 6,
            raggable: false,
          };

          let map = new window.kakao.maps.Map(container, options);

          const keyword = "크로스핏";
          const places = new window.kakao.maps.services.Places();

          places.keywordSearch(
            keyword,
            (result: any, status: any) => {
              if (status === window.kakao.maps.services.Status.OK) {
                for (let i = 0; i < result.length; i++) {
                  const placePosition = new window.kakao.maps.LatLng(
                    result[i].y,
                    result[i].x
                  );
                  const markerOverlay = new window.kakao.maps.CustomOverlay({
                    position: placePosition,
                    content: ReactDOMServer.renderToString(
                      <MarkerBox>
                        <CrossfitText width={50} fill={theme.colors.red} />
                        <Marker>{result[i].place_name}</Marker>
                      </MarkerBox>
                    ),
                  });

                  // Create a marker with the custom image
                  const marker = new window.kakao.maps.Marker({
                    position: placePosition,
                  });

                  // Add a click event to the marker to display place info
                  window.kakao.maps.event.addListener(
                    marker,
                    "click",
                    function () {
                      const infowindow = new window.kakao.maps.InfoWindow({
                        content: `<div style="padding:10px;">${result[i].place_name}</div>`, // Customize content as needed
                        //   content: <Marker>${result[i].place_name}</Marker>,
                      });
                      infowindow.open(map, marker);
                    }
                  );

                  markerOverlay.setMap(map);
                }

                setIsLoading(true);
              } else {
                console.error("Failed to search for places:", status);
              }
            },
            {
              location: new window.kakao.maps.LatLng(latitude, longitude),
              radius: 10000,
            }
          );
        },
        (error) => {
          console.error("Error getting the user's location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);
  return (
    <MapBox>
      <Map id="map">
        {!isLoading && <Loading>내 주변 박스 찾는중...</Loading>}
      </Map>
    </MapBox>
  );
}
const MapBox = styled.div`
  width: 100vw;
  padding: 1rem;
  display: flex;

  @media (max-width: ${theme.deviceSize.tablet}) {
    display: block;
  }
`;
const Map = styled.div`
  width: 100%;
  height: 500px;
  border-radius: 8px;
  position: relative;
  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
  }
  @media (max-width: ${theme.deviceSize.tablet}) {
    height: 300px;
  }
`;

const Loading = styled.div`
  ${theme.common.flexCenter}
  width: 100%;
  height: 500px;
  border-radius: 8px;
  position: relative;
  border: 1px solid ${theme.colors.white};
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.bold};
  @media (max-width: ${theme.deviceSize.tablet}) {
    height: 300px;
  }
`;

const Marker = styled.p`
  margin-top: 0.2rem;
  font-size: 12px;
`;

const MarkerBox = styled.div`
  width: auto;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background-color: ${theme.colors.main};
`;
