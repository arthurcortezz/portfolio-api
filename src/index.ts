import cors from "cors";

const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const SECRET = "tuca1";

//read json / midlewares
var corsOptions = { origin: "http://localhost:3000", credentials: true };
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//port
app.listen(3001);

//routes
app.post("/comment", (req: any, res: any) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  const object: any = {
    name: req.body.name,
    reason: req.body.reason,
    message: req.body.message,
  };
  console.log("🚀 ~ file: index.ts ~ line 35 ~ app.post ~ object", object);
  return res.json({ name: "Arthur" });
});

app.post("/login/", (req: any, res: any) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://localhost:3001/comment/"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  if (req.body.user === "tuca" && req.body.pass === "123") {
    const token = jwt.sign({ idUser: 1 }, SECRET, { expiresIn: 500 });
    console.log("Login");
    return res.json({ auth: true, token });
  }
  res.status(401).end();
});
