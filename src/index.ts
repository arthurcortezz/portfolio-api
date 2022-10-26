import cors from "cors";
import helmet from "helmet";
import express from "express";
import { connect } from "mongoose";

import { Routes } from "./routes";
import { mongooseUri } from "./config";

connect(mongooseUri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
const app = express();
app.use(helmet());
app.use(cors());

app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 1000000 }));
app.use(express.json({ limit: "50mb" }));

app.use(Routes);

app.listen(process.env.PORT || 3001, () => {
  console.log("[INFO] MongoDB Server running!");
});
