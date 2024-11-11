import { createContext, useState } from "react";
import { ParamSelect } from "./ParamSelect.jsx";
import { ParamNew } from "./ParamNew.jsx";

// export const ParamContext = createContext();
export function NewQ() {
  const [paramClass, setParamClass] = useState("new");
  // const [selectedParam, setSelectedParam] = useState({ id: 0 });
  return (
    <>
      <header>
        <h1>新しい問題にチャレンジしよう</h1>
        <a href="/">HOME</a>
      </header>
      <p>
        パラメータを設定してね！
        <br />
        <input
          type="radio"
          className="radio"
          name="param"
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
          name="param"
          value="select"
          checked={paramClass === "select"}
          onChange={() => {
            setParamClass("select");
          }}
        />
        既存
      </p>
      {paramClass === "new" ? <ParamNew /> : <ParamSelect />}
    </>
  );
}
