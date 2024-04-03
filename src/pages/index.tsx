import { useState, useEffect } from "react";
import { postPlace, getPlace } from "../_crud/place";

export default function Home() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const handleSubmit = async () => {
    const res = await postPlace({ name, price, lat, lng });
    alert(res);
  };

  useEffect(() => {
    getPlace().then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <input
        type="text"
        value={lat}
        onChange={(e) => setLat(Number(e.target.value))}
      />
      <input
        type="text"
        value={lng}
        onChange={(e) => setLng(Number(e.target.value))}
      />

      <button onClick={handleSubmit}>보내기</button>
    </div>
  );
}
