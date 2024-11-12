import { useState } from "react";
import { ParamSelect } from "./ParamSelect.jsx";
import { ParamNew } from "./ParamNew.jsx";
import "./NewQ.css";
import { useLocation } from "react-router-dom";
// import { UserContext } from "../main.jsx";

// export const ParamContext = createContext();
export function NewQ() {
  const [paramClass, setParamClass] = useState("new");
  const location = useLocation();
  const user = location.state;
  // const { user } = useContext(UserContext);
  // const [selectedParam, setSelectedParam] = useState({ id: 0 });
  console.log(user);
  return (
    <>
      <header>
        <div className="header_title">新しい問題にチャレンジしよう</div>
        <div className="option">
          <a href="/">HOME</a>
          <div>ログイン：{user.name}さん</div>
        </div>
      </header>
      <section id="radio_area">
        <div id="radio_title">テストの条件を設定してね！</div>
        <div id="radio_class">
          <input
            type="radio"
            className="radio"
            name="class"
            value="new"
            checked={paramClass === "new"}
            onChange={() => {
              setParamClass("new");
            }}
          />
          新規
          <input
            type="radio"
            className="radio"
            name="class"
            value="select"
            checked={paramClass === "select"}
            onChange={() => {
              setParamClass("select");
            }}
          />
          既存
        </div>
      </section>
      {paramClass === "new" ? (
        <ParamNew user={user} />
      ) : (
        <ParamSelect user={user} />
      )}
    </>
  );
}
