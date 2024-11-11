import { useContext, useEffect, useState } from "react";
import axios from "axios";

export function TestMain({ param }) {
  // const [selectedParam, setSelectedParam] = useContext(ParamContext);
  const [questions, setQuestions] = useState([]);
  console.log(param);

  useEffect(() => {
    const apiUrl = "http://localhost:7000/result_detail";
    axios
      .post(apiUrl, {
        user_id: param.state.user_id,
        parameter_id: param.state.id,
      })
      .then((res) => {
        console.log("kakunin_status:", res.status);
        console.log("kakunin_data:", res.data);
        console.log("++end++");
      });

    // const apiUrl = "http://localhost:7000/result_detail";
    // axios
    //   .post(apiUrl, {
    //     user_id: param.state.user_id,
    //     parameter_id: param.state.id,
    //   })
    //   //.then((res) => {
    //   // console.log(param.state.user_id, param.state.id);
    //   // fetch("http://localhost:7000/result_detail", {
    //   //   method: "POST",
    //   //   body: JSON.stringify({
    //   //     user_id: param.state.user_id,
    //   //     parameter_id: param.state.id,
    //   //   }),
    //   // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     setQuestions(res);
    //     console.log(questions);
    //   });
  }, []);

  return (
    <>
      <section>
        <div>arg1</div>
        <div>+</div>
        <div>arg2</div>
      </section>
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
