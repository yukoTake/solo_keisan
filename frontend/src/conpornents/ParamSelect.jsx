import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../App.jsx";

export function ParamSelect() {
  const user = useContext(UserContext);
  const [paramList, setParamList] = useState([]);
  const [selectedParam, setSelectedParam] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:7000/parameters/user/${user.id}`)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setParamList(res);
        setSelectedParam(res.slice(-1).id);
      });
  }, []);
  return (
    <>
      <select
        name="pull"
        className="pulldown"
        value={selectedParam ? selectedParam.id : ""}
        onChange={(e) => {
          setSelectedParam(e.target.value.split("_")[0]);
        }}
      >
        {paramList.map((param) => (
          <option key={param.id} value={param.id}>
            {param.id + "_" + param.date}
          </option>
        ))}
      </select>

      <p>ParamSelect</p>
    </>
  );
}
