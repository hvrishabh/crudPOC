const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
// app.use(express.json());
app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});

app.get("/", (req, res) => {
  //   res.json("Hello from the backend");
  const sql = "SELECT * FROM student";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error1");
    return res.json(data);
  });
});

app.post("/create", (req, res) => {
  const sql = "INSERT INTO student (`Name`, `Email`) VALUES (?) ";
  const values = [req.body.name, req.body.email];

  // return res.json(req);
  db.query(sql, [values], (err, data) => {
    if (err) return res.json("ERROR....");
    return res.json(data);
  });
});

// app.get("/create", (req, res) => {
//   const sql = "INSERT INTO student (`Name`, `Email`) VALUES (?) ";
//   const values = [req.query.name, req.query.email];

//   // return res.json(values);
//   db.query(sql, [values], (err, data) => {
//     if (err) return res.json("ERROR....");
//     return res.json(data);
//   });
// });

app.put("/update/:id", (req, res) => {
  const sql = "UPDATE student set `Name` = ? ,`Email` = ? where ID = ?";
  const values = [req.body.name, req.body.email];
  const id = req.params.id;

  // return res.json(req);
  db.query(sql, [...values, id], (err, data) => {
    if (err) return res.json("ERROR....");
    return res.json(data);
  });
});

app.delete("/student/:id", (req, res) => {
  const sql = "DELETE FROM student WHERE ID = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    if (err) return res.json("ERROR....");
    return res.json(data);
  });
});

app.get("/student/:id", (req, res) => {
  //   res.json("Hello from the backend");
  const id = req.params.id;
  const sql = "SELECT * FROM student WHERE ID = (?)";
  db.query(sql, [id], (err, data) => {
    if (err) return res.json("Error1");
    return res.json(data);
  });
});

app.listen(5000, () => {
  console.log("Listening..");
});
