import ReactDOMServer from "react-dom/server";
import { useEffect, useState } from "react";
import styled from "styled-components";
import theme from "../../../styles/theme";
declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

const KEYWORD_LIST = [
  { id: 1, keyword: "크로스핏", emoji: "🏋️‍♂️" },
  { id: 2, keyword: "클라이밍", emoji: "🧗‍♂️" },
  { id: 3, keyword: "필라테스", emoji: "🧘‍♂️" },
  { id: 4, keyword: "스키샵", emoji: "🏂" },
];

export default function Maps() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectKeyword, setSelectKeyword] = useState({
    keyword: "크로스핏",
    emoji: "🏋️‍♂️",
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          let container = document.getElementById("map");
          let options = {
            center: new kakao.maps.LatLng(latitude, longitude),
            level: 4,
            raggable: false,
          };

          let map = new kakao.maps.Map(container, options);

          const currentPosition = new kakao.maps.LatLng(latitude, longitude);

          // 현위치 마커
          const myMarkerOverlay = new kakao.maps.CustomOverlay({
            position: currentPosition,
            content: ReactDOMServer.renderToString(<MyMarker />),
          });

          // 지도 중심좌표를 접속위치로 변경합니다
          myMarkerOverlay.setMap(map);

          // 키워드로 장소를 검색합니다 ------------------------------
          const keyword = selectKeyword.keyword;
          const places = new kakao.maps.services.Places();

          // 키워드로 장소를 검색합니다
          places.keywordSearch(
            keyword,
            (result: any, status: any) => {
              if (status === kakao.maps.services.Status.OK) {
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                for (let i = 0; i < result.length; i++) {
                  const placePosition = new kakao.maps.LatLng(
                    result[i].y,
                    result[i].x
                  );

                  // 키워드 마커를 생성합니다
                  const markerOverlay = new kakao.maps.CustomOverlay({
                    position: placePosition,
                    content: ReactDOMServer.renderToString(
                      <MarkerBox>
                        <Marker />
                        <MarkerText>
                          <PointText>{`${selectKeyword.keyword}${selectKeyword.emoji}`}</PointText>
                          <Text>
                            {result[i].place_name === "크로스핏메이커스"
                              ? "🌟" + result[i].place_name + "🌟"
                              : result[i].place_name}
                          </Text>
                        </MarkerText>
                      </MarkerBox>
                    ),
                  });

                  markerOverlay.setMap(map);
                }

                setIsLoading(true);
              } else {
                console.error("Failed to search for places:", status);
              }
            },
            {
              // 검색결과 10개만 보여주도록 설정
              location: new kakao.maps.LatLng(latitude, longitude),
              radius: 10000, // 10km
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
  }, [selectKeyword]);
  return (
    <MapBox>
      <Map id="map">
        <KeywordList>
          {KEYWORD_LIST.map((item) => {
            console.log(item);
            return (
              <KeywordItem key={item.id}>
                <KeywordButton
                  className={
                    selectKeyword.keyword === item.keyword ? "active" : ""
                  }
                  onClick={() => {
                    setSelectKeyword({
                      keyword: item.keyword,
                      emoji: item.emoji,
                    });
                  }}
                >
                  {item.emoji} {item.keyword}
                </KeywordButton>
              </KeywordItem>
            );
          })}
        </KeywordList>
        {!isLoading && (
          <Loading>내 주변 {selectKeyword.keyword} 찾는중...</Loading>
        )}
      </Map>
    </MapBox>
  );
}

const KeywordList = styled.ul`
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 1000;
`;

const KeywordItem = styled.li`
  display: flex;
  align-items: center;
  & + & {
    margin-top: 0.5rem;
  }
`;
const KeywordButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  background: ${theme.colors.white};
  color: ${theme.colors.main};
  font-size: ${theme.fontSize.sm};
  border: 1px solid ${theme.colors.main};
  &.active {
    background: ${theme.colors.main};
    color: ${theme.colors.white};
    border: 1px solid ${theme.colors.red};
  }
  &:active,
  &:focus,
  &:hover {
    background: ${theme.colors.main};
    color: ${theme.colors.white};
  }
`;

const MyMarker = styled.div`
  width: 20px;
  height: 20px;
  position: relative;
  background: ${theme.colors.main};
  border-radius: 50%;
  filter: drop-shadow(0px 0px 2px ${theme.colors.red});
  &::before {
    content: "this";
    display: flex;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: ${theme.colors.blue};
    width: 50%;
    height: 50%;
    border-radius: 50%;
    color: ${theme.colors.main};
    z-index: 1000;
  }
`;

const MapBox = styled.div`
  width: 100vw;
  height: calc(100vh - 74px);
  padding: 1rem;
  display: block;
`;
const Map = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  position: relative;
`;

const Loading = styled.div`
  ${theme.common.flexCenter}
  width: 100%;
  height: 100%;
  border-radius: 8px;
  position: relative;
  border: 1px solid ${theme.colors.white};
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.bold};
`;

const Marker = styled.p`
  width: 30px;
  height: 39px;
  position: relative;
  &::before {
    content: "C";
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    background: ${theme.colors.main};
    border-radius: 50%;
    font-size: ${theme.fontSize.sm};
    font-weight: ${theme.fontWeight.bold};
    text-shadow: 1px 1px 2px ${theme.colors.red};
  }

  &::after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-top: 10px solid ${theme.colors.main};
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;
const MarkerText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  position: absolute;
  width: auto;
  top: 0;
  left: 36px;
  padding: 0.5rem 0.8rem;
  border-radius: 8px;
  background-color: ${theme.colors.main};
`;

const Text = styled.p`
  font-size: ${theme.fontSize.xs};
`;

const MarkerBox = styled.div`
  position: relative;
`;

const PointText = styled(Text)`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.red};
`;
