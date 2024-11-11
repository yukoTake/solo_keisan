import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./TestMain.css";

export function TestMain({ param }) {
  // const [selectedParam, setSelectedParam] = useContext(ParamContext);
  const [questions, setQuestions] = useState([1, 2]);
  const [questionNo, setQuestionNo] = useState(0);
  const [isDoTest, setIsDoTest] = useState(false);
  const [answer, setAnswer] = useState("");
  const [res, setRes] = useState();
  console.log(param);

  const try_question = () => {
    const apiUrl = "http://localhost:7000/result_detail";
    axios
      .post(apiUrl, {
        user_id: param.state.user_id,
        parameter_id: param.state.id,
      })
      .then((res) => {
        console.log("res.data", res.data);

        setQuestions(res.data);
        console.log("questions", questions);
      });
  };

  const ckeckAnswer = () => {
    if (Number(answer) === questions[questionNo].correct) {
      setRes(true);
    } else {
      setRes(false);
    }
    //Detailに結果登録
    //結果登録用に回答数、ミスのカウントステートつくる
    //最後にsummeryに結果登録
    //最後に結果表示（画面推移）
  };

  return (
    <>
      {isDoTest ? (
        <>
          <div id={"q_no"}>第{questions[questionNo].question_no}問</div>
          <section id="question_sec">
            <div>{questions[questionNo].arg1}</div>
            <div>{questions[questionNo].operator}</div>
            <div>{questions[questionNo].arg2}</div>
          </section>
        </>
      ) : (
        <button
          onClick={() => {
            try_question();
            setIsDoTest(true);
          }}
        >
          START
        </button>
      )}
      <section id="answer_num_sec">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button
            onClick={() => {
              setAnswer(answer + `${num}`);
            }}
          >
            {num}
          </button>
        ))}
      </section>
      <section>
        <p id="answer">{answer}</p>
        <button
          onClick={() => {
            setAnswer("");
          }}
        >
          修正する
        </button>
        <button
          onClick={() => {
            ckeckAnswer();
          }}
        >
          回答する
        </button>
      </section>
    </>
  );
}
