// db.js
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",       // ✅ your MySQL username
  password: "Sabya@143",       // ✅ your MySQL password
  database: "fureza",
});

module.exports = pool.promise();
