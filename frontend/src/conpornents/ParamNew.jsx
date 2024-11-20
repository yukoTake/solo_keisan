import { useContext, useState } from "react";
import "./ParamNew.css";
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: import.meta.env.LOCAL_PATH,
});
import { useNavigate } from "react-router-dom";

export function ParamNew({ user }) {
  // const { user } = useContext(UserContext);
  const [arg1Class, setArg1Class] = useState("num");
  const [arg2Class, setArg2Class] = useState("num");
  const [operator, setOperator] = useState("+");
  const [arg1Min, setArg1Min] = useState(0);
  const [arg1Max, setArg1Max] = useState(10);
  const [arg1List, setArg1List] = useState("1,2,3");
  const [arg2Min, setArg2Min] = useState(0);
  const [arg2Max, setArg2Max] = useState(10);
  const [arg2List, setArg2List] = useState("1,2,3");
  const [resMin, setResMin] = useState(0);
  const [resMax, setResMax] = useState(100);

  const [questionCount, setQuestionCount] = useState(10);
  const navigate = useNavigate();

  const navigateUrl = (url, obj) => {
    navigate(url, { state: { param: obj, user: user } });
  };

  const redisParameter = () => {
    const argChange = (min, max, list, cls) => {
      if (cls === "num") {
        return { min: min, max: max, list: null };
      } else {
        return { min: null, max: null, list: list.split(",") };
      }
    };

    const arg1Obj = argChange(arg1Min, arg1Max, arg1List, arg1Class);
    const arg2Obj = argChange(arg2Min, arg2Max, arg2List, arg2Class);
    // const apiUrl = "http://localhost:7000/keisan/parameters";
    const apiUrl = "/keisan/parameters";
    axiosInstance
      .post(apiUrl, {
        user_id: user.id,
        arg1_min: arg1Obj.min,
        arg1_max: arg1Obj.max,
        arg1_decimal: 0, //現在非対応
        arg1_list: arg1Obj.list,
        arg2_min: arg2Obj.min,
        arg2_max: arg2Obj.max,
        arg2_decimal: 0, //現在非対応
        arg2_list: arg2Obj.list,
        operator: operator,
        res_min: resMin,
        res_max: resMax,
        question_count: questionCount,
        timestamp: new Date(),
      })
      .then((res) => {
        // console.log("res.data〜〜", res.data[0]);
        navigateUrl("/Test", res.data[0]);
      });
  };

  return (
    <section id="param_area">
      {[
        {
          num: 1,
          class: arg1Class,
          func: setArg1Class,
          funcMin: setArg1Min,
          funcMax: setArg1Max,
          funcList: setArg1List,
          min: arg1Min,
          max: arg1Max,
          list: arg1List,
        },
        {
          num: 2,
          class: arg2Class,
          func: setArg2Class,
          funcMin: setArg2Min,
          funcMax: setArg2Max,
          funcList: setArg2List,
          min: arg2Min,
          max: arg2Max,
          list: arg2List,
        },
      ].map((arg) => (
        <div className="operation_each" key={`d1_${arg.num}`}>
          <div className="operation_title_row" key={`d2_${arg.num}`}>
            <p className="operation_title" key={`p_${arg.num}`}>
              {arg.num}つめの数
            </p>

            {[
              { key: "num", text: "範囲内の数を使う" },
              { key: "list", text: "指定の数を使う" },
            ].map((radio) => (
              <>
                <input
                  key={`r_${radio.key}`}
                  type="radio"
                  className="radio"
                  name={`arg${arg.num}`}
                  checked={arg.class === radio.key}
                  onChange={() => {
                    arg.func(radio.key);
                  }}
                />
                {radio.text}
              </>
            ))}
          </div>

          {arg.class === "num" ? (
            <div className="select_num">
              <input
                className="number_input"
                type="number"
                value={arg.min}
                onChange={(e) => {
                  arg.funcMin(e.target.value);
                }}
              />
              <p> 〜 </p>
              <input
                className="number_input"
                type="number"
                value={arg.max}
                onChange={(e) => {
                  arg.funcMax(e.target.value);
                }}
              />
            </div>
          ) : (
            <div className="select_list">
              <div>
                半角で数字を入れてね。数字と数字の間は半角カンマ「 ,
                」を入れてね
              </div>
              <input
                className="number_input"
                id="list_input"
                type="text"
                value={arg.list}
                onChange={(e) => {
                  arg.funcList(e.target.value);
                }}
              />
            </div>
          )}
        </div>
      ))}

      <div className="operation_each">
        <div className="operation_title_row">
          <p className="operation_title">計算内容</p>{" "}
        </div>
        <div id="operation_check">
          {[
            { key: "tasu", text: "+", value: "たし算" },
            { key: "hiku", text: "-", value: "ひき算" },
            { key: "kakeru", text: "×", value: "かけ算" },
          ].map((radio) => (
            <div className="radio_each">
              <input
                key={radio.key}
                type="radio"
                className="radio"
                name="ope"
                checked={operator === radio.text}
                onChange={() => {
                  setOperator(radio.text);
                }}
              />
              {radio.text} ({radio.value})
            </div>
          ))}
        </div>
      </div>

      <div className="operation_each">
        <div className="operation_title_row">
          <p className="operation_title">計算結果の数</p>
        </div>
        <div className="select_num">
          <input
            className="number_input"
            type="number"
            value={resMin}
            onChange={(e) => {
              setResMin(e.target.value);
            }}
          />
          <p> 〜 </p>
          <input
            className="number_input"
            type="number"
            value={resMax}
            onChange={(e) => {
              setResMax(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="operation_each">
        <div className="operation_title_row">
          <p className="operation_title">出題数</p>
        </div>
        <div className="select_num">
          <input
            className="number_input"
            type="number"
            value={questionCount}
            onChange={(e) => {
              setQuestionCount(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="param_btn_area">
        <button
          onClick={() => {
            redisParameter();
          }}
        >
          設定完了
        </button>
      </div>
    </section>
  );
}
