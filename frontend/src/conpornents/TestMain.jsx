import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./TestMain.css";
import {
  CorrectCountContext,
  IsDoTestContext,
  QuestionNoContext,
  QuestionsContext,
} from "./Test.jsx";

export function TestMain({ param }) {
  // const [selectedParam, setSelectedParam] = useContext(ParamContext);
  const { questions, setQuestions } = useContext(QuestionsContext);
  const { questionNo, setQuestionNo } = useContext(QuestionNoContext);
  const { isDoTest, setIsDoTest } = useContext(IsDoTestContext);
  const { correctCount, setCorrectCount } = useContext(CorrectCountContext);
  const [answer, setAnswer] = useState("");
  const [isRes, setIsRes] = useState();
  const [isResDisplay, setIsResDisplay] = useState(false);

  console.log(param);
  const changeArg = (num) => {
    return Number(parseFloat(num).toString());
  };

  const madeQuestion = () => {
    const apiUrl = "http://localhost:7000/keisan/result_detail";
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

  useEffect(() => {
    console.log("Updated questions:", questions);
  }, [questions]);

  const checkAnswer = () => {
    console.log(Number(answer), questions[questionNo].correct);
    if (Number(answer) === Number(questions[questionNo].correct)) {
      setIsRes(true);
      setCorrectCount(correctCount + 1);
    } else {
      setIsRes(false);
    }
    const apiUrl = "http://localhost:7000/keisan/result_detail";
    axios
      .patch(apiUrl, {
        summary_id: questions[questionNo].summary_id,
        question_no: questions[questionNo].question_no,
        answered: Number(answer),
        isCorrectly: isRes,
      })
      .then((res) => {
        console.log(res.data);
        setIsResDisplay(true);
        setAnswer("");

        if (questionNo < questions.length - 1) {
          setQuestionNo(questionNo + 1);
        } else {
          setIsDoTest("end");
        }
      });

    //Detailに結果登録
    //結果登録用に回答数、ミスのカウントステートつくる
    //最後にsummeryに結果登録
    //最後に結果表示（画面推移）
  };

  return (
    <>
      {isDoTest === "start" && questions.length > 0 ? (
        <>
          <div id={"q_no"}>第{questions[questionNo].question_no}問</div>
          <section id="question_sec">
            <div>{changeArg(questions[questionNo].arg1)}</div>
            <div>{questions[questionNo].operator}</div>
            <div>{changeArg(questions[questionNo].arg2)}</div>
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
            }}
          >
            もう一度テストする
          </button>
        </section>
      )}
    </>
  );
}
