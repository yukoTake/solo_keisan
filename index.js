const express = require("express");
const db = require("./src/db/");
const readResultSummery = require("./handlers/resultSummary");
const readResultDetail = require("./handlers/resultDetail");
const readParameters = require("./handlers/parameters");

const app = express();
app.use(express.json());
// app.use("/", express.static(__dirname + "/public"));

//users------------------------------------------

//parameters------------------------------------------
app.get("/parameters/:id", async (req, res) => {
  console.log("--index.js--app.get--/parameters--start-");
  const id = req.params.id;
  const resData = await readParameters.find(db, id);
  // console.log("resData;", resData);
  res.status(200).json(resData);
});

//result_summary------------------------------------------
app.get("/result_summary/:id", async (req, res) => {
  console.log("--index.js--app.get--/result_summary--start-");
  const id = req.params.id;
  const resData = await readResultSummery.findSummary(db, id);
  // console.log("resData;", resData);
  res.status(200).json(resData);
});

app.post("/result_summary", async (req, res) => {
  console.log("--index.js--app.post--/result_summary--start-");
  const params = req.body; //user_id, parameter_id を取得
  const resData = await readResultSummery.new(db, params);
  // console.log("resData;", resData);
  res.status(201).json(resData);
});

//result_detail------------------------------------------
// app.get("/result_detail/:summary_id", async (req, res) => {
//   console.log("--index.js--app.get--/result_detail/--start-");
//   const id = req.params.summary_id;
//   const resData = await readResultDetail.find(db, id);
//   // console.log("resData;", resData);
//   res.status(200).json(resData);
// });

app.post("/result_detail", async (req, res) => {
  console.log("--index.js--app.post--/result_detail/--start-");
  const params = req.body;
  const resData = await readResultDetail.new(db, params);
  // console.log("resData;", resData);
  res.status(201).json(resData);
});

//------------------------------------------------------
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Expressサーバー起動中：localhost:${PORT}`);
});
