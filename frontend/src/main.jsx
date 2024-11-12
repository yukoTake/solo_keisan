import { createContext, StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { NewQ } from "./conpornents/NewQ.jsx";
import { Test } from "./conpornents/Test.jsx";

// export const UserContext = createContext();
// const UserProvider = ({ conponent }) => {
//   const [user, setUser] = useState({ id: 1, name: "pochi" });
//
//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {conponent}
//     </UserContext.Provider>
//   );
// };

createRoot(document.getElementById("root")).render(
  //<StrictMode>
  // <UserContext.Provider value={{ id: 1, name: "pochi" }}>
  // <UserProvider>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/NewQ" element={<NewQ />} />
      <Route path="/Test" element={<Test />} />
    </Routes>
  </BrowserRouter>,
  // </UserProvider>,
  // </UserContext.Provider>,

  /*</StrictMode>,*/
);
