var express = require("express");
var app = express();
var cors = require("cors");
var jwt = require("jsonwebtoken");
var SECRET = "tuca1";
var mongoose = require('mongoose')

const Comment = require("./models/Comment")

//read json / midlewares
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://portfolio-k8kf-k5a9ewbq5-arthurcortezz.vercel.app/');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}
var corsOptions = { origin: "*", credentials: true };

app.use(allowCrossDomain);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//routes
app.post("/comment", async (req, res)  => {
  const comment = {
    name: req.body.name,
    reason: req.body.reason,
    message: req.body.message,
  };
  try {
    await Comment.create(comment)
    res.status(202).json(comment);
  } catch (error) {
    res.status(500).json({error:error})
  }
});

app.post("/login/", (req, res) => {
  if (req.body.user === "tuca" && req.body.pass === "123") {
    const token = jwt.sign({ idUser: 1 }, SECRET, { expiresIn: 500 });
    console.log("Login");
    return res.json({ auth: true, token });
  }
  res.status(401).end();
});

//port
mongoose.connect(`mongodb+srv://gestor:sysadmin@cluster.snmb0du.mongodb.net/portfoliodb?retryWrites=true&w=majority`)
.then(()=>{
  app.listen(3001)
  console.log("connected mongodb")
})
.catch((error)=> console.log(error))