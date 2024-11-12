import { useEffect, useState } from "react";
import { ParamSelect } from "./ParamSelect.jsx";
import { ParamNew } from "./ParamNew.jsx";
import "./NewQ.css";
import { useLocation } from "react-router-dom";
import "./Result.css";

export function Result() {
  const location = useLocation();
  const user = location.state;
  const [pullList, setPullList] = useState([]);
  const [selectedPull, setSelectedPull] = useState({ id: 0 });
  const [resList, setResList] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:7000/keisan/result_summary/user/${user.id}`)
      .then((res) => res.json())
      .then((res) => {
        setPullList(res);
        const [lastRes] = res.slice(-1);
        console.log("lastRes", lastRes);
        setSelectedPull(lastRes);
        getDetail(lastRes.id);
      });
  }, []);

  const getDetail = (id) => {
    const summary_id = id ? id : selectedPull.id;
    fetch(`http://localhost:7000/keisan/result_detail/${summary_id}`)
      .then((res) => res.json())
      .then((res) => {
        setResList(res);
      });
  };

  const changeArg = (num) => {
    if (num) {
      return Number(parseFloat(num).toString());
    } else {
      return "";
    }
  };

  return (
    <>
      <header>
        <div className="header_title">学習結果を確認しよう</div>
        <div className="option">
          <a href="/">HOME</a>
          <div>ログイン：{user.name}さん</div>
        </div>
      </header>
      <section id="top">
        <div id="pull_area">
          <div id="pull_text">確認したい学習を選択してください</div>
          <select
            name="pull"
            className="pull"
            value={selectedPull.id}
            onChange={(e) => {
              console.log("change==", e.target.value);
              const id = Number(e.target.value);
              const obj = pullList.find((res) => res.id === id);

              setSelectedPull(obj);
              getDetail(e.target.value);
            }}
          >
            {pullList.map((res) => (
              <option key={`${res.id}_${res.question_no}`} value={res.id}>
                {res.id + "：" + res.timestamp.split("T")[0]}
              </option>
            ))}
          </select>
        </div>

        <div id="summary_area">
          <div>
            正解数：
            {selectedPull.correct_count ? selectedPull.correct_count : 0} /
            {selectedPull.question_count}
          </div>
          <div>回答時間： {selectedPull.time} 秒</div>
        </div>
      </section>
      <section>
        <table>
          <thead>
            <tr>
              <th>No</th>
              {resList.map((item) => (
                <th key={item.question_no}>{item.question_no}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="title">もんだい</td>
              {resList.map((item) => (
                <td key={`question_${item.question_no}`}>
                  {changeArg(item.arg1)} {item.operator} {changeArg(item.arg2)}
                </td>
              ))}
            </tr>
            <tr>
              <td className="title">正解</td>
              {resList.map((item) => (
                <td key={`correct_${item.question_no}`}>
                  {changeArg(item.correct)}
                </td>
              ))}
            </tr>
            <tr>
              <td className="title">回答</td>
              {resList.map((item) => (
                <td key={`answered_${item.question_no}`}>
                  {changeArg(item.answered)}
                </td>
              ))}
            </tr>
            <tr>
              <td className="title">成否</td>
              {resList.map((item) => (
                <td key={`isCorrect_${item.question_no}`}>
                  {item.isCorrectly ? "◎" : "×"}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}
