import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../components/pages/MainPage";
import Hero from "../components/pages/HeroPage";
import CrossfitMain from "../components/pages/CrossfitPage";
import BasicPage from "../components/pages/BasicPage/";
import TerminologyPage from "../components/pages/Terminology";

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/crossfit" element={<CrossfitMain />} />
        <Route path="/crossfitbasic" element={<BasicPage />} />
        <Route path="/term" element={<TerminologyPage />} />"
      </Routes>
    </BrowserRouter>
  );
};
