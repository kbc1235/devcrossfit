import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk";

export default function useKakaoLoader() {
  useKakaoLoaderOrigin({
    appkey: "8b49950dce2a6040133905960bb429c4",
    libraries: ["clusterer", "drawing", "services"],
  });
}
