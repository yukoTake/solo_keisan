const db = require("../src/db/index.js");

console.log("---setup.js--start-");
exports.mochaGlobalTeardown = async () => {
  try {
    await db.destroy();
    console.log("✅ Closed database connection");
  } catch (error) {
    console.error(error);
  }
};
console.log("---setup.js-end");
