//API確認用
const axios = require("axios");

const apiUrl = "http://localhost:7000/result_summary/1";
axios.get(apiUrl).then((res) => {
  console.log("kakunin_status:", res.status);
  console.log("kakunin_data:", res.data);
});
