// import { mongooseUri } from "./config";
// import { connect } from "mongoose";

// connect(mongooseUri)
//   .then(() => {
//     app.listen(process.env.PORT || 3001);
//     console.log("connected mongodb");
//   })
//   .catch((error) => console.log(error));

// //initial configs
// var express = require("express");
// var app = express();
// var cors = require("cors");
// var jwt = require("jsonwebtoken");
// var SECRET = "tuca1";
// var mongoose = require("mongoose");

// //Models
// const Comment = require("./models/Comment");

// //read json / midlewares
// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// //routes
// app.post("/comment", async (req: any, res: any) => {
//   const comment = {
//     name: req.body.name,
//     reason: req.body.reason,
//     message: req.body.message,
//   };
//   try {
//     await Comment.create(comment);
//     res.status(202).json(comment);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// app.post("/login/", (req: any, res: any) => {
//   if (req.body.user === "tuca" && req.body.pass === "123") {
//     const token = jwt.sign({ idUser: 1 }, SECRET, { expiresIn: 500 });
//     console.log("Login");
//     return res.json({ auth: true, token });
//   }
//   res.status(401).end();
// });

import cors from "cors";
import helmet from "helmet";
import express from "express";
import { connect } from "mongoose";

import { Routes } from "./routes";
import { mongooseUri } from "./config";

connect(mongooseUri!);
const app = express();
app.use(helmet());
app.use(cors());

app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 1000000 })
);
app.use(express.json({ limit: "50mb" }));

app.use(Routes);

app.listen(process.env.PORT || 3001, () => {
  console.log("[INFO] MongoDB Server running!");
});
