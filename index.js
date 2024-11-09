const express = require("express");
const db = require("./src/db/");
const readResultSummery = require("./handlers/resultSummary");

const app = express();
app.use(express.json());
// app.use("/", express.static(__dirname + "/public"));

//result_summary------------------------------------------
app.get("/result_summary/:user_id", async (req, res) => {
  console.log("--index.js--app.get--/result_summary--start-");
  const userID = req.params.user_id;
  const resData = await readResultSummery.all(db, userID);
  console.log("resData;", resData);
  res.status(200).json(resData);
});

//result_detail------------------------------------------
app.get("/result_summary/:user_id", async (req, res) => {
  console.log("--index.js--app.get--/result_summary--start-");
  const userID = req.params.user_id;
  const resData = await readResultSummery.all(db, userID);
  console.log("resData;", resData);
  res.status(200).json(resData);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Expressサーバー起動中：localhost:${PORT}`);
});
