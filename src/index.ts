//initial configs
import cors from "cors";
import helmet from "helmet";
import express from "express";

import { connect } from "mongoose";
import { Routes } from "./routes";
import { mongooseUri } from "./config";

//connection
connect(mongooseUri!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

//read json / midlewares / security
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use(Routes);

// port
app.listen(process.env.PORT || 3001, () => {});
