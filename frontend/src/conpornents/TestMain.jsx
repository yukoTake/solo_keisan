import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import { ParamContext } from "./NewQ.jsx";
// import { ParamContext, UserContext } from "../App.jsx";

export function TestMain({ param }) {
  // const [selectedParam, setSelectedParam] = useContext(ParamContext);
  console.log(param);

  // useEffect(() => {
  //   fetch(`http://localhost:7000/parameters/${user.id}`)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setParamList(res);
  //       const [lastRes] = res.slice(-1);
  //       console.log(lastRes);
  //       setSelectedParam(lastRes);
  //     });
  // }, []);

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
