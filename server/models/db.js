const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 50,
  host: "localhost",
  user: "root",
  password: "",
  database: "ProManage",
});

module.exports = pool;
