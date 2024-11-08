const knex = require("knex");
// console.log(knexConfig);
// const knexConfig = require("./knexfile");

const knexConfig =
    process.env.NODE_ENV !== "production"
        ? require("./knexfile")["development"]
        : require("./knexfile")["production"];

// const knexConfig = require("./knexfile")["development"];
// const knexConfig = require("knex")(config); //config環境をknexにrequireしないとknex使えない

module.exports = knex(knexConfig);
