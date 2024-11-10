import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../App.jsx";

export function ParamSelect() {
  const user = useContext(UserContext);
  const [paramList, setParamList] = useState([]);
  const [selectedParam, setSelectedParam] = useState({ id: 0 });

  const getArg = (min, max, list, decimal) => {
    if (list === null) {
      return min + " 〜 " + max + " (小数点: " + decimal + " )";
    } else {
      console.log(list, min);
      return "リスト: " + list.join(",");
    }
  };

  useEffect(() => {
    fetch(`http://localhost:7000/parameters/user/${user.id}`)
      .then((res) => res.json())
      .then((res) => {
        setParamList(res);
        const [lastRes] = res.slice(-1);
        console.log(lastRes);
        setSelectedParam(lastRes);
      });
  }, []);
  return (
    <>
      <select
        name="pull"
        className="pulldown"
        value={selectedParam.id}
        onChange={(e) => {
          const id = Number(e.target.value);
          const obj = paramList.find((param) => param.id === id);
          console.log(obj);
          setSelectedParam(obj);
        }}
      >
        {paramList.map((param) => (
          <option key={param.id} value={param.id}>
            {param.id + "：" + param.timestamp.split("T")[0]}
          </option>
        ))}
      </select>

      {selectedParam.hasOwnProperty("arg1_min") ? (
        <section>
          <div>
            1つめの数の設定：
            {getArg(
              selectedParam.arg1_min,
              selectedParam.arg1_max,
              selectedParam.arg1_list,
              selectedParam.arg1_decimal,
            )}
          </div>
          <div>
            2つめの数の設定：
            {getArg(
              selectedParam.arg2_min,
              selectedParam.arg2_max,
              selectedParam.arg2_list,
              selectedParam.arg2_decimal,
            )}
          </div>
          <div>演算子：{selectedParam.operator}</div>
          <div>
            計算結果の設定：
            {selectedParam.res_min + " 〜 " + selectedParam.res_max}
          </div>
        </section>
      ) : (
        <div>未選択です</div>
      )}
      <p>ParamSelect</p>
    </>
  );
}
