require("dotenv").config();
const mysql = require("mysql2");
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Eshwar@241",
  database: "student_posts",
});

const query = (sql, binding) => {
  return new Promise((resolve, reject) => {
    con.query(sql, binding, (err, result, fields) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

con.connect(function (err) {
  if (err) throw err;
  console.log("connected");
  con.query(
    "CREATE DATABASE IF NOT EXISTS student_posts;",
    function (err, result) {
      if (err) throw err;
      console.log("Database Posts created");
    }
  );
});
module.exports = { con, query };