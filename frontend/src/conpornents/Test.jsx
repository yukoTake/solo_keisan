import { useLocation } from "react-router-dom";
import { TestNavbar } from "./TestNavbar.jsx";
import { TestMain } from "./TestMain.jsx";
import { createContext, useState } from "react";

export const QuestionsContext = createContext([]);
export const QuestionNoContext = createContext(0);
export const IsDoTestContext = createContext("wait");
export const CorrectCountContext = createContext(0);
export const TimeContext = createContext(0);
export function Test() {
  const [questions, setQuestions] = useState([]);
  const [questionNo, setQuestionNo] = useState(0);
  const [isDoTest, setIsDoTest] = useState("wait");
  const [correctCount, setCorrectCount] = useState(0);
  const [time, setTime] = useState(0);
  const param = useLocation();
  // console.log(param);
  return (
    <QuestionsContext.Provider value={{ questions, setQuestions }}>
      <QuestionNoContext.Provider value={{ questionNo, setQuestionNo }}>
        <IsDoTestContext.Provider value={{ isDoTest, setIsDoTest }}>
          <CorrectCountContext.Provider
            value={{ correctCount, setCorrectCount }}
          >
            <TimeContext.Provider value={{ time, setTime }}>
              <>
                <TestNavbar param={param} />
                <TestMain param={param} />
              </>
            </TimeContext.Provider>
          </CorrectCountContext.Provider>
        </IsDoTestContext.Provider>
      </QuestionNoContext.Provider>
    </QuestionsContext.Provider>
  );
}
