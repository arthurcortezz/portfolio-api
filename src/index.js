const cors = require("cors");
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const SECRET = "tuca1";

//read json / midlewares
var corsOptions = { origin: "*", credentials: true };
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//port
app.listen(3001);

//routes
app.post("/comment", (req, res) => {
  const object = {
    name: req.body.name,
    reason: req.body.reason,
    message: req.body.message,
  };
  return res.status(202).json(object);
});

app.post("/login/", (req, res) => {
  if (req.body.user === "tuca" && req.body.pass === "123") {
    const token = jwt.sign({ idUser: 1 }, SECRET, { expiresIn: 500 });
    console.log("Login");
    return res.json({ auth: true, token });
  }
  res.status(401).end();
});
