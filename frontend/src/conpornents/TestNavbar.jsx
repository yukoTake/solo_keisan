import "./TestNavbar.css";
import { useContext, useEffect } from "react";
import {
  CorrectCountContext,
  DisplayQuestionNoContext,
  IsDoTestContext,
  QuestionNoContext,
  QuestionsContext,
  TimeContext,
} from "./Test.jsx";

export function TestNavbar({ param }) {
  const { questions, setQuestions } = useContext(QuestionsContext);
  const { questionNo, setQuestionNo } = useContext(QuestionNoContext);
  const { displayQuestionNo, setDisplayQuestionNo } = useContext(
    DisplayQuestionNoContext
  );
  const { isDoTest, setIsDoTest } = useContext(IsDoTestContext);
  const { correctCount, setCorrectCount } = useContext(CorrectCountContext);
  const { time, setTime } = useContext(TimeContext);

  useEffect(() => {
    let interval;
    if (isDoTest === "start") {
      setTime(0);
      interval = setInterval(() => {
        setTime((timeCount) => timeCount + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isDoTest]);

  return (
    <>
      <header className="header">
        <div className="header_title">新しいテストにチャレンジしよう</div>
        <div className="option">
          <a href="/">HOME</a>
          <div>{param.state.user.name}さん</div>
        </div>
      </header>
      <section id="info">
        {isDoTest !== "wait" ? (
          <div id="middle">
            {isDoTest === "start" ? (
              <div className="middle_children">
                のこり {questions.length - questionNo + 1} ︎問
              </div>
            ) : (
              <div className="middle_children"></div>
            )}
            <div className="middle_children">
              せいかい {correctCount}／もんだい {displayQuestionNo}︎
            </div>
            <div className="middle_children">じかん：{time} ︎秒</div>
          </div>
        ) : (
          <></>
        )}
      </section>
    </>
  );
}
