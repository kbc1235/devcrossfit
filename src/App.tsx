import { Router } from "./router";
import Container from "./layout/container";
import axios from "axios";
import Header from "./layout/header";

export default function App() {
  axios.get("/api/places").then((res) => {
    console.log(res.data);
  });
  return (
    <Container>
      <Header />
      <Router />
    </Container>
  );
}
