import { useEffect, useState } from "react";
import { useKakaoLoader, Map, CustomOverlayMap } from "react-kakao-maps-sdk";
import styled from "styled-components";
import Loading from "./component/loading";
import Error from "./component/error";
import MarkerIcon from "../../assets/svg/marker";

import theme from "../../styles/theme";

import MapNav from "./component/nav";

export default function KakaoMap({ list }: { list?: any }) {
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_MAP_API_KEY,
  });

  const [state, setState] = useState<{
    center: null | {
      lat: number;
      lng: number;
    };
    error: null | string;
    isLoading: boolean;
    myLocation: null | {
      lat: number;
      lng: number;
    };
  }>({
    center: null,
    error: null,
    isLoading: true,
    myLocation: null,
  });

  const handleClick = (item?: any) => {
    if (item) {
      setState({
        ...state,
        center: {
          lat: item.selectedInfo.lat,
          lng: item.selectedInfo.lng,
        },
      });
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState({
            ...state,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            myLocation: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            isLoading: false,
          });
        },
        (err) => {
          setState({
            ...state,
            error: err.message,
            isLoading: false,
          });
        }
      );
    } else {
      setState({
        ...state,
        error: "Geolocation is not supported by this browser.",
        isLoading: false,
      });
    }
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : (
        <>
          <Map // 지도를 표시할 Container
            center={state.center || { lat: 33.450701, lng: 126.570667 }}
            style={{
              // 지도의 크기
              width: "100vw",
              height: "100vh",
            }}
            level={3} // 지도의 확대 레벨
          >
            {state.isLoading ? (
              <Loading />
            ) : (
              list?.map((item: any) => (
                <CustomOverlayMap
                  key={item.id}
                  position={{
                    lat: item.selectedInfo.lat,
                    lng: item.selectedInfo.lng,
                  }}
                >
                  <CustomMarker item={item} />
                </CustomOverlayMap>
              ))
            )}
            {state.myLocation && (
              <CustomOverlayMap position={state.myLocation}>
                <Loacal />
              </CustomOverlayMap>
            )}
          </Map>
          <MapNav list={list} onClick={handleClick} />
        </>
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
const Loacal = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  background: ${theme.colors.sub2};
  border-radius: 50%;
  filter: drop-shadow(0 0 3px ${theme.colors.sub2});

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 50%;
    background: ${theme.colors.white};
    border-radius: 50%;
  }
`;
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
