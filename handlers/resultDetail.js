const axios = require("axios");
const table = "result_detail";

module.exports = {
  table,
  // async find(knex, id) {
  //   console.log(`---${table}--find--start-`);
  //   return await knex
  //     .select("T.*")
  //     .from(`${table} as T`)
  //     .join("result_summary as S", "S.id", "T.summary_id")
  //     .where("T.summary_id", id);
  // },

  //問題作成
  async new(knex, { user_id, parameter_id }) {
    console.log(`---${table}--new--start-`);
    //summery登録
    const asummeryUrl = "http://localhost:7000/result_summary";
    let postSummery = await axios.post(asummeryUrl, {
      parameter_id: parameter_id,
    });
    const summeryId = postSummery.data[0].id;
    console.log("===", summeryId);

    //パラメータ取得
    const getUrl = `http://localhost:7000/parameters/${parameter_id}`; //⭐️あとで修正する
    let param = await axios.get(getUrl);
    [param] = param.data;
    console.log("====", param);

    const getNum = (min, max, list) => {
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
    for (let i = 1; i <= 10; i++) {
      let isOK = false;
      let arg1;
      let arg2;
      let correct;
      while (!isOK) {
        arg1 = getNum(param.arg1_min, param.arg1_max, param.arg1_list);
        arg2 = getNum(param.arg2_min, param.arg2_max, param.arg2_list);
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
      });
    }
    console.log("-questionArr;", questionArr);
    return await knex(table).insert(questionArr).returning("*");
  },
};
