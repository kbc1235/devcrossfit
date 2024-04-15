import { useEffect, useState } from "react";
import { useKakaoLoader, Map, CustomOverlayMap } from "react-kakao-maps-sdk";
import styled from "styled-components";
import Loading from "./component/loading";
import Error from "./component/error";
import LocalIcon from "../../assets/svg/local";
import MarkerIcon from "../../assets/svg/marker";
import { Btn } from "../button";

import theme from "../../styles/theme";

import MapNav from "./component/nav";

export default function KakaoMap({
  list,
  myLocation,
}: {
  list?: any;
  myLocation: { lat: number; lng: number };
}) {
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
    isPanto: boolean;
  }>({
    center: null,
    error: null,
    isLoading: true,
    isPanto: false,
  });

  const [openMarkerId, setOpenMarkerId] = useState<number | null>(null);

  // CustomMarker 컴포넌트에 전달할 함수
  const handleMarkerClick = (id: number) => {
    setOpenMarkerId(openMarkerId === id ? null : id);
  };
  const handleCenter = () => {
    setState({
      ...state,
      center: myLocation,
      isPanto: !state.isPanto,
    });
  };

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
            isPanto={state.isPanto}
            level={3} // 지도의 확대 레벨
            zoomable={false}
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
                  <CustomMarker
                    item={item}
                    isOpen={openMarkerId === item.id}
                    onClick={() => handleMarkerClick(item.id)}
                  />
                </CustomOverlayMap>
              ))
            )}
            {myLocation && (
              <CustomOverlayMap position={myLocation}>
                <Loacal />
              </CustomOverlayMap>
            )}
          </Map>
          <MapNav list={list} onClick={handleClick} myLocation={myLocation} />
          <CenterBtn type="button" onClick={handleCenter}>
            <LocalIcon width={16} height={16} fill={theme.colors.white} />
          </CenterBtn>
        </>
      )}
    </>
  );
}

const CustomMarker = ({
  item,
  isOpen,
  onClick,
}: {
  item: any;
  isOpen: boolean;
  onClick: () => void;
}) => {
  const price = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const priceNum = price(item.price);

  return (
    <CustomMarkerWrapper onClick={onClick}>
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
            {item.selectedInfo.img.length > 0 && (
              <ImgBox>
                {item.selectedInfo.img.map((image: string, index: number) => (
                  <img
                    key={index}
                    src={image}
                    alt={`image-${index}`}
                    loading="lazy"
                  />
                ))}
              </ImgBox>
            )}
          </Content>
        </MarkerInfo>
      ) : (
        <MarkerIcon width={24} height={24} fill={theme.colors.sub2} />
      )}
    </CustomMarkerWrapper>
  );
};

const ImgBox = styled.div`
  display: flex;
  max-width: 250px;
  gap: 10px;
  overflow-x: scroll;
  overflow-y: hidden;
  margin-top: 10px;
  &::-webkit-scrollbar {
    display: none;
  }
  & > img {
    width: 200px;
    height: 200px;
    border-radius: 10px;
  }
`;

const CenterBtn = styled(Btn)`
  width: 30px;
  height: 30px;
  position: absolute;
  bottom: 2dvh;
  right: 10px;
  z-index: 100;
  border-radius: 4px;
  background: ${theme.colors.sub2};
`;
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
  z-index: 20000;
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
