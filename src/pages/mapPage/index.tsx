import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

import styled from "styled-components";
import KakaoMap from "../../components/map";

export default function MapPage() {
  const [myLocation, setMyLocation] = useState({ lat: 0, lng: 0 });
  const {
    data: list,
    isLoading,
    isError,
  } = useQuery(["place", myLocation], async () => {
    const res = await getDocs(collection(db, "place"));
    return res.docs.map((doc) => ({ ...doc.data() }));
  });

  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMyLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };
  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;

  return (
    <MapWrapper>
      <KakaoMap list={list} myLocation={myLocation} />
    </MapWrapper>
  );
}

const MapWrapper = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  margin: -1rem;
`;
