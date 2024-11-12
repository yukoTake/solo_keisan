//API確認用
const axios = require("axios");
console.log("+++kakunin+++++");

// const apiUrl = "http://localhost:7000/keisan/result_summary/1";
// axios.get(apiUrl).then((res) => {
//   console.log("kakunin_status:", res.status);
//   console.log("kakunin_data:", res.data);
// });

// const apiUrl = "http://localhost:7000/keisan/result_summary";
// axios.post(apiUrl, { parameter_id: 1 }).then((res) => {
//   console.log("kakunin_status:", res.status);
//   console.log("kakunin_data:", res.data);
//   console.log("++end++");
// });

// const apiUrl = "http://localhost:7000/keisan/result_detail";
// axios.post(apiUrl, { user_id: 1, parameter_id: 1 }).then((res) => {
//   console.log("kakunin_status:", res.status);
//   console.log("kakunin_data:", res.data);
//   console.log("++end++");
// });

// const apiUrl = "http://localhost:7000/keisan/parameters/user/1";
// axios.get(apiUrl).then((res) => {
//   console.log("kakunin_status:", res.status);
//   console.log("kakunin_data:", res.data);
//   console.log("++end++");
// });
const apiUrl = "http://localhost:7000/keisan/parameters";
axios
  .post(apiUrl, {
    user_id: 1,
    arg1_min: 2,
    arg1_max: 2,
    arg1_decimal: 0, //現在非対応
    arg1_list: null,
    arg2_min: 3,
    arg2_max: 3,
    arg2_decimal: 0, //現在非対応
    arg2_list: null,
    operator: "-",
    res_min: 0,
    res_max: 100,
    question_count: 1,
    timestamp: new Date(),
  })
  .then((res) => {
    console.log("kakunin_status:", res.status);
    console.log("kakunin_data:", res.data);
    console.log("++end++");
  });
