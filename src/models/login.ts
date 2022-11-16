import { Schema, model } from "mongoose";

const loginSchema = new Schema({
  user: String,
  pass: String,
  createdon: { type: Number, default: new Date().getTime() },
  updatedon: { type: Number, default: 0 },
});

loginSchema.pre("save", async function (next: any) {
  let object: any = this;
  object.createdon = new Date().getTime();
  return next();
});

loginSchema.pre("updateOne", async function (next: any) {
  let object: any = this;
  object._update.updatedon = new Date().getTime();
  return next();
});

export default model("users", loginSchema);
