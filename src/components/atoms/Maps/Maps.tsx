import { useState, useEffect } from "react";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";
import styled from "styled-components";

type Marker = {
  position: {
    lat: number;
    lng: number;
  };
  content: string;
};

interface SearchResultItem {
  y: string;
  x: string;
  place_name: string;
}
export default function Maps() {
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_APP_KAKAO_API_KEY || "",
    libraries: ["services"],
  });

  const [userState, setUserState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errorMsg: "위치 액세스 동의를 해주세요.",
    isLoading: true,
  });

  // const [info, setInfo] = useState("");
  const [markers, setMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserState({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          errorMsg: "",
          isLoading: false,
        });
      });
    }
  }, []);

  const KeywordSearchDB = (
    data: SearchResultItem[],
    status: kakao.maps.services.Status
  ) => {
    if (status === kakao.maps.services.Status.OK) {
      let keyWordMarkers: Marker[] = [];
      for (var i = 0; i < data.length; i++) {
        // @ts-ignore
        keyWordMarkers.push({
          position: {
            lat: Number(data[i].y),
            lng: Number(data[i].x),
          },
          content: data[i].place_name,
        });
      }
      setMarkers(keyWordMarkers);
    }
  };

  useEffect(() => {
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch("크로스핏", KeywordSearchDB, {
      location: new kakao.maps.LatLng(
        userState.center.lat,
        userState.center.lng
      ),
      radius: 8000,
    });
  }, []);

  console.log(markers);

  return (
    <MapContainer>
      {loading && <LoadingBox>로딩중..</LoadingBox>}
      {error && <ErrorBox>error...</ErrorBox>}

      <Map // 지도를 표시할 Container
        id="map"
        center={userState.center}
        style={{
          // 지도의 크기
          width: "100%",
          height: "100%",
        }}
        level={4} // 지도의 확대 레벨
      >
        {markers.map((marker) => (
          <MapMarker position={marker.position} />
        ))}
        <MapMarker position={userState.center} />
      </Map>
    </MapContainer>
  );
}

const ErrorBox = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: red;
`;
const LoadingBox = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: #fff;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;
