//initial configs
var express = require("express");
var app = express();
var cors = require("cors");
var jwt = require("jsonwebtoken");
var SECRET = "tuca1";
var mongoose = require('mongoose')

//Models
const Comment = require("./models/Comment")

//read json / midlewares

app.use(allowCrossDomain);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
    res.status(500).json(error)
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
  app.listen(process.env.PORT || 3001)
  console.log("connected mongodb")
})
.catch((error)=> console.log(error))