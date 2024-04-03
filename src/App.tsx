import { Router } from "./router";
import Container from "./layout/container";
import Header from "./layout/header";

export default function App() {
  return (
    <Container>
      <Header />
      <Router />
    </Container>
  );
}
