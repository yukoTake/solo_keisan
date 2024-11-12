import { createContext, StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { NewQ } from "./conpornents/NewQ.jsx";
import { Test } from "./conpornents/Test.jsx";
import { Result } from "./conpornents/Result.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/NewQ" element={<NewQ />} />
      <Route path="/Test" element={<Test />} />
      <Route path="/Result" element={<Result />} />
    </Routes>
  </BrowserRouter>,
);
