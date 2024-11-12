import { createContext, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({ id: 1, name: "pochi" });

function App() {
  const [user, setUser] = useState({ id: 1, name: "pochi" });

  const navigate = useNavigate();
  const navigateUrl = (url) => {
    navigate(url);
  };

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <header>
          <h1>計算テスト</h1>
          <p>ようこそ、{user.name}さん</p>
        </header>
        <nav>
          <button
            onClick={() => {
              navigateUrl("/NewQ");
            }}
          >
            新しい問題
          </button>
          <button>過去の問題</button>
          <button>結果を確認</button>
        </nav>{" "}
      </UserContext.Provider>
    </>
  );
}

export default App;
