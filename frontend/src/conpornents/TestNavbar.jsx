import "./TestNavbar.css";
import { useContext, useEffect, useState } from "react";
import {
  CorrectCountContext,
  IsDoTestContext,
  QuestionNoContext,
  QuestionsContext,
  TimeContext,
} from "./Test.jsx";

export function TestNavbar() {
  const { questions, setQuestions } = useContext(QuestionsContext);
  const { questionNo, setQuestionNo } = useContext(QuestionNoContext);
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
      <header id="test_nav_bar">
        <div>テスト</div>
        {isDoTest !== "wait" ? (
          <>
            <div>のこり{questions.length - questionNo}︎問</div>
            <div>
              結果：正解数{correctCount}／問題数{questionNo + 1}︎
            </div>
            <div>経過時間：{time}︎秒</div>
          </>
        ) : (
          <></>
        )}
        <a href="/">HOME</a>
      </header>
    </>
  );
}
