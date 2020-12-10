require('dotenv').config()
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
var db = require("knex")({
  client: "pg",
  connection: {
    host: `${process.env.DB_HOST}`,
    user: `${process.env.DB_USER}`,
    password: "",
    database: `${process.env.DB_DATABASE}`,
  },
});

console.log(process.env.DB_HOST)



const app = express();
const port = 3001;

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  db.select()
    .table("users")
    .then((data) => {
      res.json(data);
      console.log(data);
    })
    .catch((err) => res.status(400).json("error"));
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt, saltRounds);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(port, () => {
  console.log(`app is working on port ${process.env.PORT}`);
});
