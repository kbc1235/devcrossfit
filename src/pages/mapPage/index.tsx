import { useQuery } from "react-query";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

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

  return <KakaoMap list={list} />;
}
