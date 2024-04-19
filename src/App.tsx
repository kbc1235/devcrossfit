import { Router } from "./router";
// import Header from "./layout/header";
import Container from "./layout/container";
// import Nav from "./layout/nav";
export default function App() {
  return (
    <Container>
      {/* <Header /> */}
      <Router />
      {/* <Nav /> */}
    </Container>
  );
}
