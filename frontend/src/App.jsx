import { createContext, useContext, useEffect, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
// import { UserContext } from "./main.jsx";

// export const UserContext = createContext({ id: 1, name: "pochi" });

function App() {
  // const { user, setUser } = useContext(UserContext);
  const [user, setUser] = useState({ id: 1, name: "pochi" });
  const navigate = useNavigate();
  const navigateUrl = (url) => {
    navigate(url, { state: user });
  };

  return (
    <>
      {/*<UserContext.Provider value={{ user }}>*/}
      <header>
        <div className="header_title">計算テスト</div>
        <div className="option">ようこそ、{user.name}さん</div>
      </header>
      <section id="top_button">
        <button
          onClick={() => {
            navigateUrl("/NewQ");
          }}
        >
          新しい問題
        </button>
        <button>過去の問題</button>
        <button
          onClick={() => {
            navigateUrl("/Result");
          }}
        >
          結果を確認
        </button>
      </section>
      {/*</UserContext.Provider>*/}
    </>
  );
}

export default App;
