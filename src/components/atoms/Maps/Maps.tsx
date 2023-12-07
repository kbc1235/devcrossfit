import ReactDOMServer from "react-dom/server";
import { useEffect, useState } from "react";
import styled from "styled-components";
import theme from "../../../styles/theme";
declare global {
  interface Window {
    kakao: any;
  }
}

export default function Maps() {
  const [marker, setMarker] = useState<any>([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          let container = document.getElementById("map");
          let options = {
            center: new window.kakao.maps.LatLng(latitude, longitude),
            level: 2,
          };

          let map = new window.kakao.maps.Map(container, options);

          // Search for places nearby based on a keyword (e.g., 'coffee')
          const keyword = "주변크로스핏"; // Replace with your desired keyword
          const places = new window.kakao.maps.services.Places();

          places.keywordSearch(keyword, (result: any, status: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
              setMarker(result);
              for (let i = 0; i < result.length; i++) {
                // Create a marker for each place found
                const placePosition = new window.kakao.maps.LatLng(
                  result[i].y,
                  result[i].x
                );
                const markerOverlay = new window.kakao.maps.CustomOverlay({
                  position: placePosition,
                  content: ReactDOMServer.renderToString(
                    <Marker>{result[i].place_name}</Marker>
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
            } else {
              console.error("Failed to search for places:", status);
            }
          });
        },
        (error) => {
          console.error("Error getting the user's location:", error);
          // You can handle errors here
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      // Handle lack of geolocation support
    }
  }, []);
  console.log(marker);
  return (
    <MapBox>
      <Map id="map" />
      <ResultList>
        {marker?.map((item: any) => (
          <ResultItem>{item.place_name}</ResultItem>
        ))}
      </ResultList>
    </MapBox>
  );
}
const MapBox = styled.div`
  width: 100vw;
  height: 300px;
`;
const Map = styled.div`
  width: 100%;
  height: 100%;
`;

const ResultList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  height: 150px;
  padding: 1rem;
  gap: 1rem;
  overflow: auto;
  background: ${theme.colors.opacityMain};
  @media (max-width: ${theme.deviceSize.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ResultItem = styled.li`
  font-size: ${theme.fontSize.sm};
`;

const Marker = styled.div`
  ${theme.common.flexCenter};
  width: auto;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background-color: ${theme.colors.main};
  font-size: ${theme.fontSize.sm};
`;
