import { useState } from "react";
import "./ParamNew.css";
import axios from "axios";

export function ParamNew() {
  const [arg1Class, setArg1Class] = useState("num");
  const [arg2Class, setArg2Class] = useState("num");
  const [operation, setOperation] = useState("+");
  const [arg1Min, setArg1Min] = useState(0);
  const [arg1Max, setArg1Max] = useState(10);
  const [arg1List, setArg1List] = useState("1,2,3");
  const [arg2Min, setArg2Min] = useState(0);
  const [arg2Max, setArg2Max] = useState(10);
  const [arg2List, setArg2List] = useState("1,2,3");

  const [resMin, setResMin] = useState(0);
  const [resMax, setResMax] = useState(0);
  const [questionCount, setQuestionCount] = useState(10);

  const redistParameter = () => {
    const apiUrl = "http://localhost:7000/keisan/parameters";
    axios
      .post(apiUrl, {
        user_id: param.state.user_id,
        parameter_id: param.state.id,
      })
      .then((res) => {
        console.log("res.data〜〜", res.data);
        setQuestions(res.data);
        setQuestionNo(0);
        setCorrectCount(0);
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
        <div className="operation_each" key={arg.num}>
          <div className="operation_title_row">
            <p className="operation_title">{arg.num}つめの数</p>

            {[
              { key: "num", text: "範囲内の数を使う" },
              { key: "list", text: "指定の数を使う" },
            ].map((radio) => (
              <>
                <input
                  key={radio.key}
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
                checked={operation === radio.text}
                onChange={() => {
                  setOperation(radio.text);
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
      <button
        className="set_button"
        onClick={() => {
          redistParameter();
          navigateUrl("/Test");
        }}
      >
        設定完了
      </button>
    </section>
  );
}
