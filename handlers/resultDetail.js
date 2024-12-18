// const axios = require("axios");
const PORT = process.env.PORT;
console.log("-------resultDetail.js--", process.env.NODE_ENV, PORT);

// const axiosInstance = axios.create({
//   baseURL: `http://localhost:${PORT}`,
// });
const table = "result_detail";

module.exports = {
  table,
  async find(knex, summary_id) {
    console.log(`---${table}--find--start-${summary_id}`);
    return await knex
      .select("*")
      .from(table)
      .where({ summary_id: Number(summary_id) });
  },

  //問題作成
  async new(knex, { user_id, parameter_id }) {
    console.log(`---${table}--new--start-`);
    //パラメータ取得
    const getUrl = `/keisan/parameters/${parameter_id}`; //⭐️あとで修正する
    // const paramData = await axiosInstance.get(getUrl);
    const [param] = await knex
      .select("*")
      .from(`parameters`)
      .where("id", parameter_id);

    // const [param] = paramData;
    console.log("=param===", param);

    //summery登録
    const summeryUrl = "/keisan/result_summary";
    // let postSummery = await fetch(summeryUrl, {
    //   method: "POST",
    //   body: {
    //     parameter_id: parameter_id,
    //     question_count: param.question_count,
    //   },
    // });
    // let postSummery = await axiosInstance.post(summeryUrl, {
    // parameter_id: parameter_id,
    // question_count: param.question_count,
    // });

    let postSummery = await knex("result_summary")
      .insert({
        parameter_id: parameter_id,
        question_count: param.question_count,
        timestamp: new Date(),
        // id: newId,
      })
      .returning("*");

    const summeryId = postSummery[0].id;
    console.log("=summeryId=", summeryId);

    const getNum = (min, max, list, decimal) => {
      if (list === null) {
        return min + Math.floor(Math.random() * (max - min + 1));
      } else {
        return list[Math.floor(Math.random() * list.length)];
      }
    };

    const getCorrect = (arg1, arg2, ope) => {
      switch (ope) {
        case "+":
          return arg1 + arg2;
        case "-":
          return arg1 - arg2;
        case "×":
          return arg1 * arg2;
        case "÷":
          return arg1 / arg2;
      }
    };

    const questionArr = [];
    for (let i = 1; i <= param.question_count; i++) {
      let isOK = false;
      let arg1;
      let arg2;
      let correct;
      while (!isOK) {
        arg1 = getNum(
          param.arg1_min,
          param.arg1_max,
          param.arg1_list,
          param.arg1_decimal
        );
        arg2 = getNum(
          param.arg2_min,
          param.arg2_max,
          param.arg2_list,
          param.arg2_decimal
        );
        correct = getCorrect(arg1, arg2, param.operator);
        if (param.res_min <= correct && correct <= param.res_max) {
          isOK = true;
        }
      }
      questionArr.push({
        summary_id: summeryId,
        question_no: i,
        arg1: arg1,
        arg2: arg2,
        operator: param.operator,
        correct: correct,
        timestamp: new Date(),
      });
    }
    console.log("-questionArr;", questionArr);
    return await knex(table).insert(questionArr).returning("*");
  },

  //回答登録
  async edit(knex, { summary_id, question_no, answered, isCorrectly }) {
    console.log(`---${table}--edit--start-`);

    return await knex(table)
      .update({ answered: answered, isCorrectly: isCorrectly })
      .where({
        summary_id: Number(summary_id),
        question_no: Number(question_no),
      })
      .returning("*");
  },
};
