import { Schema, model } from "mongoose";

const commentSchema = new Schema({
  message: String,
  name: String,
  reason: String,
  createdon: { type: Number, default: new Date().getTime() },
  updatedon: { type: Number, default: 0 },
});

commentSchema.pre("save", async function (next: any) {
  let object: any = this;
  object.createdon = new Date().getTime();
  return next();
});

commentSchema.pre("updateOne", async function (next: any) {
  let object: any = this;
  object._update.updatedon = new Date().getTime();
  return next();
});

export default model("comment", commentSchema);
