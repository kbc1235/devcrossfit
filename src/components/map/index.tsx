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
              <CustomMarker item={item} />
            </CustomOverlayMap>
          ))}
        </Map>
      )}
    </>
  );
}

const CustomMarker = ({ item }: { item: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  const price = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const priceNum = price(item.price);

  return (
    <CustomMarkerWrapper onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? (
        <MarkerInfo>
          <Title>{item.selectedInfo.name}</Title>
          <Content>
            <Address>{item.selectedInfo.address}</Address>
            <Price>
              <span>드랍인:</span>
              <span>
                {priceNum}
                <span>원</span>
              </span>
            </Price>
          </Content>
        </MarkerInfo>
      ) : (
        <MarkerIcon width={36} height={36} fill={theme.colors.sub2} />
      )}
    </CustomMarkerWrapper>
  );
};
const Address = styled.p`
  font-size: 0.8rem;
  color: #888;
`;
const Price = styled.p`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-top: 10px;
  text-align: right;
  color: ${theme.colors.sub};
  font-size: 0.8rem;

  & > span {
    margin-left: auto;
    font-size: 1rem;
    color: ${theme.colors.sub};
    font-weight: 600;

    &:first-child {
      margin-left: 0;

      font-size: 0.8rem;
      font-weight: 300;
    }
    & > span {
      font-size: 0.8rem;
      font-weight: 300;
      color: ${theme.colors.sub};
    }
  }
`;
const Content = styled.div``;
const Title = styled.h1`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.sub2};
`;

const MarkerInfo = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: -2.4rem;
  background: #fff;
  padding: 10px;
  border-radius: 5px;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));
  &::after {
    content: "";
    position: absolute;
    bottom: -9px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #fff;
  }
`;

const CustomMarkerWrapper = styled.div`
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
