import { createContext, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./del_index.css";
import App from "./del_App.jsx";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { NewQ } from "./conpornents/NewQ.jsx";
import { Test } from "./conpornents/Test.jsx";

createRoot(document.getElementById("root")).render(
  //<StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/NewQ" element={<NewQ />} />
      <Route path="/Test" element={<Test />} />
    </Routes>
  </BrowserRouter>,
  //</StrictMode>,
);
