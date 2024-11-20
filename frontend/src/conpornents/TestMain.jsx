import { useContext, useEffect, useState } from "react";
import axios from "axios";
// const axiosInstance = axios.create({
//   baseURL: import.meta.env.LOCAL_PATH,
// });
import "./TestMain.css";
import {
  CorrectCountContext,
  IsDoTestContext,
  QuestionNoContext,
  QuestionsContext,
  TimeContext,
} from "./Test.jsx";
import { useNavigate } from "react-router-dom";
import OKImage from "../img/OK.png";
import NGImage from "../img/NG.png";

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
  // console.log("Q", questionNo);
  // console.log("Qe", questions);
  // console.log("@@@", param.state);
  const changeArg = (num) => {
    return Number(parseFloat(num).toString());
  };
  const navigate = useNavigate();

  const navigateUrl = (url) => {
    navigate(url, { state: param.state.user });
  };
  const madeQuestion = () => {
    const apiUrl = "/keisan/result_detail";
    // const apiUrl = "http://localhost:7000/keisan/result_detail";
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
        setIsResDisplay(false);
      });
  };

  const checkAnswer = () => {
    // console.log(
    //   Number(answer),
    //   questions[questionNo - 1].correct,
    //   Number(answer) === Number(questions[questionNo - 1].correct),
    // );
    let isCorrect;
    let correctCon = correctCount;
    if (Number(answer) === Number(questions[questionNo - 1].correct)) {
      setIsRes(true);
      setCorrectCount(correctCount + 1);
      isCorrect = true;
      correctCon++;
    } else {
      setIsRes(false);
      isCorrect = false;
    }
    const apiUrl = "/keisan/result_detail";
    // const apiUrl = "http://localhost:7000/keisan/result_detail";
    axios
      .patch(apiUrl, {
        summary_id: questions[questionNo - 1].summary_id,
        question_no: questions[questionNo - 1].question_no,
        answered: Number(answer),
        isCorrectly: isCorrect,
      })
      .then((res) => {
        // console.log(res.data);
        setIsResDisplay(true);
        setAnswer("");

        if (questionNo < questions.length) {
          setQuestionNo(questionNo + 1);
        } else {
          //テスト終了
          // setQuestionNo(questionNo + 1);
          setIsDoTest("end");

          const apiUrl = "/keisan/result_summary";
          // const apiUrl = "http://localhost:7000/keisan/result_summary";
          axios.patch(apiUrl, {
            summary_id: questions[questionNo - 1].summary_id,
            correct_count: correctCon,
            time: Number(time),
          });
        }
      });
  };

  return (
    <body id="test_main">
      {isDoTest !== "wait" && questions.length > 0 ? (
        // {isDoTest === "start" && questions.length > 0 ? (
        <>
          <section id="question_area">
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
          </section>

          {isDoTest === "end" ? (
            <section id="end_area">
              <div id="end_comment">おしまい！がんばったね！</div>
              <button
                className="end_button"
                onClick={() => {
                  madeQuestion();
                  setIsDoTest("start");
                  setQuestionNo(1);
                }}
              >
                もう一度テストする
              </button>
              <button
                className="end_button"
                onClick={() => {
                  navigateUrl("/Result");
                }}
              >
                🔭結果をみる
              </button>
            </section>
          ) : (
            <section id="answer_area">
              <button
                // style={{ visibility: answer === "" ? "hidden" : "visible" }}
                onClick={() => {
                  setAnswer("");
                }}
              >
                修正する
              </button>
              <div id="answer_display_area">
                <div>こたえ</div>
                <div id="answer">{answer}</div>
              </div>
              <section id="answer_buttons">
                <button
                  // style={{ visibility: answer === "" ? "hidden" : "visible" }}
                  onClick={() => {
                    checkAnswer();
                  }}
                >
                  回答する
                </button>
              </section>
            </section>
          )}
          <section
            id="result"
            style={{
              visibility: !isResDisplay ? "hidden" : "visible",
            }}
          >
            {isRes ? (
              <div className="end_area">
                <div className="end_comment">OK! 正解！</div>
                <img alt="ok" src={OKImage} />
              </div>
            ) : (
              <div className="end_area">
                <div className="end_comment">あたたっ！まちがいっ！</div>
                <img alt="ng" src={NGImage} />
              </div>
            )}
          </section>
        </>
      ) : isDoTest === "wait" ? (
        <button
          id="start_button"
          onClick={() => {
            madeQuestion();
            setIsDoTest("start");
          }}
        >
          START
        </button>
      ) : (
        ""
        // <section id="end_area">
        //   <div id="end_comment">おしまい！がんばったね！</div>
        //   <button
        //     className="end_button"
        //     onClick={() => {
        //       madeQuestion();
        //       setIsDoTest("start");
        //       setQuestionNo(1);
        //     }}
        //   >
        //     もう一度テストする
        //   </button>
        //   <button
        //     className="end_button"
        //     onClick={() => {
        //       navigateUrl("/Result");
        //     }}
        //   >
        //     🔭結果をみる
        //   </button>
        // </section>
      )}
    </body>
  );
}
