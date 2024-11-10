//API確認用
const axios = require("axios");
console.log("+++kakunin+++++");

// const apiUrl = "http://localhost:7000/result_summary/1";
// axios.get(apiUrl).then((res) => {
//   console.log("kakunin_status:", res.status);
//   console.log("kakunin_data:", res.data);
// });

// const apiUrl = "http://localhost:7000/result_summary";
// axios.post(apiUrl, { parameter_id: 1 }).then((res) => {
//   console.log("kakunin_status:", res.status);
//   console.log("kakunin_data:", res.data);
//   console.log("++end++");
// });

const apiUrl = "http://localhost:7000/result_detail";
axios.post(apiUrl, { user_id: 1, parameter_id: 1 }).then((res) => {
  console.log("kakunin_status:", res.status);
  console.log("kakunin_data:", res.data);
  console.log("++end++");
});
