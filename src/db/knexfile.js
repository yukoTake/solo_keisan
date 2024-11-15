const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

module.exports = {
  development: {
    client: "pg",
    connection: {
      user: process.env.USER_NAME, //|| "postgres",
      database: process.env.DB_NAME, //|| "ccpixels",
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: { directory: "./seeds" },
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL, //||
    //"postgresql://user:tsFIrSzIx0XHvOkGodFSFRnaXn8H5Qu0@dpg-csm4sobqf0us73fsjti0-a/ccpixels_p28p",
    migrations: {
      directory: "./migrations",
    },
    seeds: { directory: "./seeds" },
  },
};
