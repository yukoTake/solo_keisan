import { useEffect, useState } from "react";
// import { UserContext } from "../main.jsx";
import { useNavigate } from "react-router-dom";
import "./ParamSelect.css";

export function ParamSelect({ user }) {
  // const user = useContext(UserContext);
  // console.log("@@@", user);
  const [paramList, setParamList] = useState([]);
  const [selectedParam, setSelectedParam] = useState({ id: 0 });

  const navigate = useNavigate();
  const navigateUrl = (url) => {
    navigate(url, { state: { param: selectedParam, user: user } });
  };

  const getArg = (min, max, list, decimal) => {
    if (list === null) {
      return " " + min + " 〜 " + max + " (小数点: " + decimal + " )";
    } else {
      // console.log(list, min);
      return " " + list.join(",");
    }
  };

  useEffect(() => {
    console.log("user.id", user.id);
    let isDo = true;

    fetch(`http://localhost:7000/keisan/parameters/user/${user.id}`)
      .then((res) => res.json())
      .then((res) => {
        if (isDo) {
          setParamList(res);
          const [lastRes] = res.slice(-1);
          console.log("lastRes", lastRes);
          setSelectedParam(lastRes);
          isDo = false;
        }
      });

    return () => {
      isDo = false;
    };
  }, []);

  return (
    <>
      <section id="param_area">
        <div id="pull_area_param">
          <div id="pull_text_param">設定をえらんでね</div>
          <select
            name="pull"
            className="pull"
            value={selectedParam.id}
            onChange={(e) => {
              const id = Number(e.target.value);
              const obj = paramList.find((param) => param.id === id);

              setSelectedParam(obj);
            }}
          >
            {paramList.map((param) => (
              <option key={param.id} value={param.id}>
                {param.id + "：" + param.timestamp.split("T")[0]}
              </option>
            ))}
          </select>
        </div>

        {selectedParam.hasOwnProperty("arg1_min") ? (
          <section className="operation_each" id="param_display">
            <div>
              1つめの数 　：
              {getArg(
                selectedParam.arg1_min,
                selectedParam.arg1_max,
                selectedParam.arg1_list,
                selectedParam.arg1_decimal,
              )}
            </div>
            <div>
              2つめの数 　：{" "}
              {getArg(
                selectedParam.arg2_min,
                selectedParam.arg2_max,
                selectedParam.arg2_list,
                selectedParam.arg2_decimal,
              )}
            </div>
            <div>演算子　　　： {selectedParam.operator}</div>
            <div>
              計算結果の数：
              {" " + selectedParam.res_min + " 〜 " + selectedParam.res_max}
            </div>
            <div>出題数　　　： {selectedParam.question_count}</div>
          </section>
        ) : (
          <div>未選択です</div>
        )}
        <div className="param_btn_area">
          <button
            onClick={() => {
              navigateUrl("/Test");
            }}
          >
            設定完了
          </button>
        </div>
      </section>
    </>
  );
}
