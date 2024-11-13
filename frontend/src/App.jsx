import { createContext, useContext, useEffect, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState({ id: 1, name: "pochi" });
  const navigate = useNavigate();
  const navigateUrl = (url) => {
    navigate(url, { state: user });
  };

  return (
    <body className="root">
      {/*<UIProvider>*/}

      <header className="header">
        <div className="header_title">さくさく さんすう</div>
        <div className="option">ようこそ、{user.name}さん</div>
      </header>
      <section id="btn_area">
        <button
          // className="bd-placeholder-img"    top_button"
          className="btn"
          onClick={() => {
            navigateUrl("/NewQ");
          }}
        >
          📓新しいテスト{" "}
        </button>
        <button
          className="btn"
          onClick={() => {
            navigateUrl("/Result");
          }}
        >
          🔭結果をみる
        </button>{" "}
        <button className="btn">過去のテスト(工事中)</button>
      </section>

      {/*</UIProvider>*/}
    </body>
  );
}

export default App;
