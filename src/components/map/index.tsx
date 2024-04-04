import { useKakaoLoader, Map } from "react-kakao-maps-sdk";
import Loading from "./component/loading";
import Error from "./component/error";

export default function KakaoMap({ list }: { list?: any }) {
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_MAP_API_KEY,
  });
  console.log(list);
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
            lat: 33.450701,
            lng: 126.570667,
          }}
          style={{
            // 지도의 크기
            width: "100%",
            height: "100%",
          }}
          level={3} // 지도의 확대 레벨
        />
      )}
    </>
  );
}
