import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./TestMain.css";
import {
  CorrectCountContext,
  IsDoTestContext,
  QuestionNoContext,
  QuestionsContext,
  TimeContext,
} from "./Test.jsx";

export function TestMain({ param }) {
  // const [selectedParam, setSelectedParam] = useContext(ParamContext);
  const { questions, setQuestions } = useContext(QuestionsContext);
  const { questionNo, setQuestionNo } = useContext(QuestionNoContext);
  const { isDoTest, setIsDoTest } = useContext(IsDoTestContext);
  const { correctCount, setCorrectCount } = useContext(CorrectCountContext);
  const { time, setTime } = useContext(TimeContext);
  const [answer, setAnswer] = useState("");
  const [isRes, setIsRes] = useState();
  const [isResDisplay, setIsResDisplay] = useState(false);
  console.log("Q", questionNo);
  console.log("Qe", questions);
  // console.log("@@@", param.state);
  const changeArg = (num) => {
    return Number(parseFloat(num).toString());
  };

  const madeQuestion = () => {
    const apiUrl = "http://localhost:7000/keisan/result_detail";
    axios
      .post(apiUrl, {
        user_id: param.state.param.user_id,
        parameter_id: param.state.param.id,
      })
      .then((res) => {
        // console.log("res.data〜〜", res.data);
        setQuestions(res.data);
        setQuestionNo(1);
        setCorrectCount(0);
      });
  };

  const checkAnswer = () => {
    // console.log(Number(answer), questions[questionNo].correct);
    if (Number(answer) === Number(questions[questionNo - 1].correct)) {
      setIsRes(true);
      setCorrectCount(correctCount + 1);
    } else {
      setIsRes(false);
    }
    const apiUrl = "http://localhost:7000/keisan/result_detail";
    axios
      .patch(apiUrl, {
        summary_id: questions[questionNo - 1].summary_id,
        question_no: questions[questionNo - 1].question_no,
        answered: Number(answer),
        isCorrectly: isRes,
      })
      .then((res) => {
        // console.log(res.data);
        setIsResDisplay(true);
        setAnswer("");

        if (questionNo < questions.length) {
          setQuestionNo(questionNo + 1);
        } else {
          //テスト終了
          setQuestionNo(questionNo + 1);
          setIsDoTest("end");

          const apiUrl = "http://localhost:7000/keisan/result_summary";
          axios.patch(apiUrl, {
            summary_id: questions[questionNo - 1].summary_id,
            correct_count: correctCount,
            time: Number(time),
          });
        }
      });
  };

  return (
    <>
      {isDoTest === "start" && questions.length > 0 ? (
        <>
          <div id={"q_no"}>第{questions[questionNo - 1].question_no}問</div>
          <section id="question_sec">
            <div>{changeArg(questions[questionNo - 1].arg1)}</div>
            <div>{questions[questionNo - 1].operator}</div>
            <div>{changeArg(questions[questionNo - 1].arg2)}</div>
          </section>
          <section id="answer_num_sec">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
              <button
                key={num}
                onClick={() => {
                  setAnswer(answer + `${num}`);
                  setIsResDisplay(false);
                }}
              >
                {num}
              </button>
            ))}
          </section>
          <section id="answer_area">
            <button
              style={{ visibility: answer === "" ? "hidden" : "visible" }}
              onClick={() => {
                setAnswer("");
              }}
            >
              修正する
            </button>

            <div>こたえ</div>
            <div id="answer">{answer}</div>

            <section id="answer_buttons">
              <button
                style={{ visibility: answer === "" ? "hidden" : "visible" }}
                onClick={() => {
                  checkAnswer();
                }}
              >
                回答する
              </button>
            </section>
          </section>

          <section
            style={{
              visibility: !isResDisplay ? "hidden" : "visible",
            }}
          >
            {isRes ? <p>OK! 正解！</p> : <p>あたたっ！まちがい！</p>}
          </section>
        </>
      ) : isDoTest === "wait" ? (
        <button
          onClick={() => {
            madeQuestion();
            setIsDoTest("start");
          }}
        >
          START
        </button>
      ) : (
        <section>
          <p>おしまい！</p>
          <button
            onClick={() => {
              madeQuestion();
              setIsDoTest("start");
              setQuestionNo(1);
            }}
          >
            もう一度テストする
          </button>
        </section>
      )}
    </>
  );
}
