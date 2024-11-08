/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const data=[{id: 1, summery_id: 1, arg1:3,arg2:4,operator:"+",correct:7,answered:7,isCorrectly:true},
  {id: 2, summery_id: 1, arg1:3,arg2:8,operator:"+",correct:11,answered:7,isCorrectly:false},
  {id: 3, summery_id: 1, arg1:3,arg2:5,operator:"+",correct:8,answered:8,isCorrectly:true},
  {id: 4, summery_id: 1, arg1:3,arg2:4,operator:"+",correct:7,answered:7,isCorrectly:true},
  {id: 5, summery_id: 1, arg1:3,arg2:5,operator:"+",correct:8,answered:8,isCorrectly:true},
  {id: 6, summery_id: 1, arg1:3,arg2:4,operator:"+",correct:7,answered:7,isCorrectly:true},
  {id: 7, summery_id: 1, arg1:3,arg2:8,operator:"+",correct:11,answered:7,isCorrectly:false},
  {id: 8, summery_id: 1, arg1:3,arg2:5,operator:"+",correct:8,answered:8,isCorrectly:true},
  {id: 9, summery_id: 1, arg1:3,arg2:4,operator:"+",correct:7,answered:7,isCorrectly:true},
  {id: 10, summery_id: 1, arg1:3,arg2:5,operator:"+",correct:8,answered:8,isCorrectly:true},]

const newData=[]
　for(let i=0;i<=2;i++){
  data.forEach((value)=>{
    newData.push({id:value.id + i * 10,
      summary_id: i+1, arg1:value.arg1, arg2:value.arg2, operator:value.operator,
      correct:value.correct, answered:value.answered, isCorrectly:value.isCorrectly})
  })
 }

const table="result_detail"
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(table).del()
  await knex(table).insert(newData);
};
