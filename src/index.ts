import cors from "cors";

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
try {
  app.post("/comment", (req: any, res: any) => {
    const object: any = {
      name: req.body.name,
      reason: req.body.reason,
      message: req.body.message,
    };
    return res.json({ object: object });
  });
} catch (error) {
  console.log("🚀 ~ file: index.ts ~ line 29 ~ error", error);
}

app.post("/login/", (req: any, res: any) => {
  if (req.body.user === "tuca" && req.body.pass === "123") {
    const token = jwt.sign({ idUser: 1 }, SECRET, { expiresIn: 500 });
    console.log("Login");
    return res.json({ auth: true, token });
  }
  res.status(401).end();
});
