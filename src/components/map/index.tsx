import { useState } from "react";
import { useKakaoLoader, Map, CustomOverlayMap } from "react-kakao-maps-sdk";
import styled from "styled-components";
import Loading from "./component/loading";
import Error from "./component/error";
import MarkerIcon from "../../assets/svg/marker";

import theme from "../../styles/theme";

export default function KakaoMap({ list }: { list?: any }) {
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_MAP_API_KEY,
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : (
        <Map // 지도를 표시할 Container
          center={{
            // 지도의 중심좌표
            lat: 37.54522980141051,
            lng: 127.07629558399515,
          }}
          style={{
            // 지도의 크기
            width: "100%",
            height: "100%",
          }}
          level={3} // 지도의 확대 레벨
        >
          {list?.map((item: any) => (
            <CustomOverlayMap
              key={item.id}
              position={{
                lat: item.selectedInfo.lat,
                lng: item.selectedInfo.lng,
              }}
            >
              <CustomMarker>
                <MarkerIcon width={36} height={36} fill={theme.colors.sub2} />
              </CustomMarker>
            </CustomOverlayMap>
          ))}
        </Map>
      )}
    </>
  );
}

const CustomMarker = styled.div`
  position: relative;
  & > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    animation: bounce 1s infinite;
    @keyframes bounce {
      0% {
        transform: translate(-50%, -50%);
      }
      50% {
        transform: translate(-50%, -30%);
      }
      100% {
        transform: translate(-50%, -50%);
      }
    }
  }
`;
