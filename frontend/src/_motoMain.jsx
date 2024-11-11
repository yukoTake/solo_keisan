import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./del_index.css";
import App from "./del_App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
