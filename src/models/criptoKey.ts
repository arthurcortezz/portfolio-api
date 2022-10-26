import { Schema, model } from "mongoose";

const criptoKey = new Schema({
  codigo: {
    type: String,
  },
  chavePublica: {
    type: String,
  },
  chavePrivada: {
    type: String,
  },
  criadoem: {
    type: Number,
    default: new Date().getTime(),
  },
  dataLimite: {
    type: Number,
  },
});

export default model("cripto-key", criptoKey);
