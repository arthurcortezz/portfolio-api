import { Schema, model } from "mongoose";

const schema = new Schema({
  endpoint: { type: String, required: true, unique: true },
  expirationTime: String,
  keys: {
    auth: String,
    p256dh: String,
  },
});

schema.pre("save", async function (next: any) {
  let objeto = this as any;
  objeto.criadoem = new Date().getTime();
  objeto.atualizadoem = new Date().getTime();
  return next();
});

schema.pre("updateOne", async function (next: any) {
  let objeto: any = this as any;
  objeto._update.atualizadoem = new Date().getTime();
  return next();
});

export default model("subscription", schema);
