const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});

/////////////////////////////////////////////////// api to create data

////////// for get request ....................
// app.get("/create", (req, res) => {
//   // const name = req.params.name;
//   // const email = req.params.email;
//   const sql = "INSERT INTO student (`Name`, `Email`) VALUES (?)";
//   const values = [req.query.name, req.query.email];
//   // return res.json(req);
//   db.query(sql, [values], (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });

//////////////// for post request ................

app.post("/create", (req, res) => {
  const sql = "INSERT INTO student ( `Name` , `Email`) VALUES  (?)";
  const values = [req.body.name, req.body.email];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

////////////////////////////////////////////// api to get data
app.get("/", (req, res) => {
  const sql = "SELECT * FROM student";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error in get api...");
    return res.json(data);
  });
});

//////////////////////////////////////////// api to get data in update-form
app.get("/getUpdate/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM student where ID = ? ";
  db.query(sql, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

///////////////////////////////////////////////////// api to update data

app.put("/update/:id", (req, res) => {
  const sql = "UPDATE student set `Name` = ? , `Email` = ? where ID = ? ";
  const values = [req.body.name, req.body.email];
  const id = req.params.id;

  db.query(sql, [...values, id], (err, data) => {
    if (err) return res.json("error in the update api");
    return res.json(data);
  });
});

///////////////////////////////////////////////// api to delete data

app.delete("/student/:id", (req, res) => {
  const sql = "DELETE FROM student WHERE ID = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, data) => {
    if (err) res.json("Error in delete api....");
    return res.json(data);
  });
});

// app.get("/student/:id", (req, res) => {
//   const sql = "DELETE FROM student WHERE ID = ?";
//   const id = req.params.id;
//   db.query(sql, [id], (err, data) => {
//     if (err) res.json("Error in delete api....");
//     return res.json(data);
//   });
// });

app.listen(8081, () => {
  console.log("Listening...");
});
