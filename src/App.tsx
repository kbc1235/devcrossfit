import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/pages/MainPage";
import Hero from "./components/pages/HeroPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/hero" element={<Hero />} />
      </Routes>
    </BrowserRouter>
  );
}
