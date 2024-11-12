import { useState } from "react";
import "./ParamNew.css";

export function ParamNew() {
  const [arg1Class, setArg1Class] = useState("num");
  const [arg2Class, setArg2Class] = useState("num");
  return (
    <section id="param_area">
      {[
        { num: 1, class: arg1Class, func: setArg1Class },
        { num: 2, class: arg2Class, func: setArg2Class },
      ].map((arg) => (
        <div className="arg" key={arg.num}>
          <div className="arg_row1">
            <p className="arg_title">{arg.num}つめの数</p>
            <input
              type="radio"
              className="radio"
              name={`arg${arg.num}`}
              checked={arg.class === "num"}
              onChange={() => {
                arg.func("num");
              }}
            />
            範囲内の数を使う
            <input
              type="radio"
              className="radio"
              name={`arg${arg.num}`}
              value="list"
              checked={arg.class === "list"}
              onChange={() => {
                arg.func("list");
              }}
            />
            指定の数を使う
          </div>

          {arg.class === "num" ? (
            <div className="select_num">
              <input className="number_input" type="number" />
              <p> 〜 </p>
              <input className="number_input" type="number" />
            </div>
          ) : (
            <div className="select_list">
              <div>
                半角で数字を入れてね。数字と数字の間は半角カンマ「 ,
                」を入れてね
              </div>
              <input className="number_input" id="list_input" type="text" />
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
