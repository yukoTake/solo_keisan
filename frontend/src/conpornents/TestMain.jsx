import { useContext, useEffect, useState } from "react";
import axios from "axios";

export function TestMain({ param }) {
  // const [selectedParam, setSelectedParam] = useContext(ParamContext);
  const [questions, setQuestions] = useState([1, 2]);
  const [questionNo, setQuestionNo] = useState(1);
  const [isDoTest, setIsDoTest] = useState(false);
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

  return (
    <>
      {isDoTest ? (
        <>
          <div>第{questions[questionNo].question_no}問</div>
          <section>
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
      <section>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>0</button>
      </section>
      <section>
        <p>入力値を表示</p>
        <button>修正する</button>
        <button>回答する</button>
      </section>
    </>
  );
}
