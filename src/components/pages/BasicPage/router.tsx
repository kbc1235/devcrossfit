import { BrowserRouter, Routes, Route } from "react-router-dom";
import BasicPage from ".";
import TerminologyPage from "./Terminology/";

export const BasicRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BasicPage />} />
        <Route path="/terminology" element={<TerminologyPage />} />
      </Routes>
    </BrowserRouter>
  );
};
