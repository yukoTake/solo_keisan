const express = require("express");
const db = require("./src/db/");
const readResultSummery = require("./handlers/resultSummary");

const app = express();
app.use(express.json());
// app.use("/", express.static(__dirname + "/public"));

app.get("/result_summery", async (req, res) => {
  console.log("--index.js--app.get--/result_summery--start-");
  const resData = await readResultSummery.all(db, req.body);
  res.status(200).json(resData);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Expressサーバー起動中：localhost:${PORT}`);
});
