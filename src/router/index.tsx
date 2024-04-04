import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages";
import MapPage from "../pages/mapPage";
import PlaceAddPage from "../pages/placeAddPage";

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/add" element={<PlaceAddPage />} />
      </Routes>
    </BrowserRouter>
  );
};
