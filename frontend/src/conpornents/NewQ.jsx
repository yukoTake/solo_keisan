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
      <header className="header">
        <div className="header_title">新しいテストにチャレンジしよう</div>
        <div className="option">
          <a href="/">HOME</a>
          <div>ログイン：{user.name}さん</div>
        </div>
      </header>
      <section id="main">
        <section id="radio_area">
          <div id="radio_title">テストの条件を決める</div>
          <div id="radio_class">
            <button
              className="param_select"
              onClick={() => {
                setParamClass("new");
              }}
            >
              ⭐️ 新しく設定する
            </button>
            <button
              className="param_select"
              onClick={() => {
                setParamClass("select");
              }}
            >
              📚 前の設定をつかう
            </button>
          </div>
        </section>
        {paramClass === "new" ? (
          <ParamNew user={user} />
        ) : (
          <ParamSelect user={user} />
        )}
      </section>
    </>
  );
}

// <input
//     type="radio"
//     className="radio"
//     name="class"
//     value="new"
//     checked={paramClass === "new"}
//     onChange={() => {
//         setParamClass("new");
//     }}
// />
// 新しく設定する
// < input
// type = "radio"
// className = "radio"
// name = "class"
// value = "select"
// checked = {paramClass === "select"
// }
// onChange = {()
// =>
// {
//     setParamClass("select");
// }
// }
// />
