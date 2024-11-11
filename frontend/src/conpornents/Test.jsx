import { useLocation, useNavigate } from "react-router-dom";
import { TestNavbar } from "./TestNavbar.jsx";
import { TestMain } from "./TestMain.jsx";

export function Test() {
  const param = useLocation();
  // console.log(param);
  return (
    <>
      <TestNavbar />
      <TestMain param={param} />
    </>
  );
}
