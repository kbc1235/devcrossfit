import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages";
import MapPage from "../pages/mapPage";
import PlaceAddPage from "../pages/placeAddPage";
import RecordPage from "../pages/recordPage";
import Nav from "../layout/nav";

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/add" element={<PlaceAddPage />} />
        <Route path="/record" element={<RecordPage />} />
      </Routes>
      <Nav />
    </BrowserRouter>
  );
};
