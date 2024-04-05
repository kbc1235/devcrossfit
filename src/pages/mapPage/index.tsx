import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

import KakaoMap from "../../components/map";

export default function MapPage() {
  const [list, setList] = useState<any>([]);

  const record = async () => {
    const res = await getDocs(collection(db, "place"));
    setList(res.docs.map((doc) => ({ ...doc.data() })));
  };
  useEffect(() => {
    record();
  }, []);

  return <KakaoMap list={list} />;
}
