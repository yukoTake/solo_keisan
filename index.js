const express = require("express");
const db = require("./src/db/");
const cors = require("cors");
const readResultSummery = require("./handlers/resultSummary");
const readResultDetail = require("./handlers/resultDetail");
const readParameters = require("./handlers/parameters");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", express.static(__dirname + "/frontend")); //デプロイ用

//users------------------------------------------

//parameters------------------------------------------
app.get("/keisan/parameters/user/:id", async (req, res) => {
  console.log("--index.js--app.get--/parameters/user--start-");
  const id = req.params.id;
  const resData = await readParameters.findUser(db, id);
  // console.log("resData;", resData);
  res.status(200).json(resData);
});

app.get("/keisan/parameters/:id", async (req, res) => {
  console.log("--index.js--app.get--/parameters--start-");
  const id = req.params.id;
  const resData = await readParameters.find(db, id);
  // console.log("resData;", resData);
  res.status(200).json(resData);
});

app.post("/keisan/parameters", async (req, res) => {
  console.log("--index.js--app.get--/parameters--start-");

  const params = req.body; //user_id, parameter_id を取得
  const resData = await readParameters.new(db, params);

  // console.log("resData;", resData);
  res.status(201).json(resData);
});

//result_summary------------------------------------------
app.get("/keisan/result_summary/user/:id", async (req, res) => {
  console.log("--index.js--app.get--/result_summary-User-start-");
  const id = req.params.id;
  const resData = await readResultSummery.findUser(db, id);
  // console.log("resData;", resData);
  res.status(200).json(resData);
});

app.get("/keisan/result_summary/:id", async (req, res) => {
  console.log("--index.js--app.get--/result_summary--start-");
  const id = req.params.id;
  const resData = await readResultSummery.findSummary(db, id);
  // console.log("resData;", resData);
  res.status(200).json(resData);
});

app.post("/keisan/result_summary", async (req, res) => {
  console.log("--index.js--app.post--/result_summary--start-");
  const params = req.body; //user_id, parameter_id を取得
  const resData = await readResultSummery.new(db, params);
  console.log("params;", params);
  console.log("resData;", resData);
  res.status(201).json(resData);
});

app.patch("/keisan/result_summary", async (req, res) => {
  console.log("--index.js--app.patch--/result_summary/--start-");
  const params = req.body;
  // console.log("params;", params);
  const resData = await readResultSummery.edit(db, params);
  // console.log("resData;", resData);
  res.status(200).json(resData);
});

//result_detail------------------------------------------
app.get("/keisan/result_detail/:summary_id", async (req, res) => {
  console.log("--index.js--app.get--/result_detail/--start-");
  const summary_id = req.params.summary_id;

  const resData = await readResultDetail.find(db, summary_id);
  console.log("resData;", resData);
  res.status(200).json(resData);
});

app.post("/keisan/result_detail", async (req, res) => {
  console.log("--index.js--app.post--/result_detail/--start-");
  const params = req.body;
  // console.log("params;", params);
  const resData = await readResultDetail.new(db, params);
  // console.log("resData;", resData);
  res.status(201).json(resData);
});

app.patch("/keisan/result_detail", async (req, res) => {
  console.log("--index.js--app.patch--/result_detail/--start-");
  const params = req.body;
  // console.log("params;", params);
  const resData = await readResultDetail.edit(db, params);
  // console.log("resData;", resData);
  res.status(200).json(resData);
});

//------------------------------------------------------
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Expressサーバー起動中：localhost:${PORT}`);
});
