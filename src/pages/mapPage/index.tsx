import { useQuery } from "react-query";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

import styled from "styled-components";
import KakaoMap from "../../components/map";

export default function MapPage() {
  const {
    data: list,
    isLoading,
    isError,
  } = useQuery("place", async () => {
    const res = await getDocs(collection(db, "place"));
    return res.docs.map((doc) => ({ ...doc.data() }));
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;

  return (
    <MapWrapper>
      <KakaoMap list={list} />
    </MapWrapper>
  );
}

const MapWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  margin: -1rem;
`;
