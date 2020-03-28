const express = require("express");
const app = express();
const pug = require("pug");
const PORT = process.env.PORT || 5000;
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const db = require("./db");

// PUG
app.set("view engine", "pug");

// Middleware
app.use(express.static(path.join(__dirname, "/")));
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/random", (req, res) => {
  // Get data from DB
  db.select()
    .from("objects")
    .then(d => {
      // Random sort all data (folders) from DB
      const randomSortArray = d
        .map((elem, index) => [elem, Math.random()])
        .sort((a, b) => a[1] - b[1])
        .map(elem => elem[0]);
      // Parse images in choosen folder
      fs.readdir("." + randomSortArray[0].url, (err, items) => {
        let arr = [];
        for (let i = 0; i < items.length; i++) {
          arr.push(`${randomSortArray[0].url}/${items[i]}`);
        }
        res.send(arr);
      });
    });
});

app.post("/intolog", (req, res) => {
  db.select()
    .from("objects")
    .where({ url: req.body.url })
    .then(d => {
      db.insert({ id: d[0].id })
        .into("log")
        .then(d => d);
    });
});

app.get("/log", (req, res) => {
  db.select()
    .from("log")
    .then(d => {
      res.send(d);
    });
});

app.listen(PORT, () => {
  console.log("OK ===> ", PORT, process.pid);
});
