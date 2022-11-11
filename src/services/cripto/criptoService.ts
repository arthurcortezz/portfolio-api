const Hybrid = require("@kaduzinghost/hybrid-crypto");
import crypto from "crypto";
import { CriptoKey } from "..";
import { CustomException } from "../../exceptions";

export class CriptoService {
  crypt: any;
  constructor() {
    const entropy = Date.now;
    this.crypt = new Hybrid.Crypt({ entropy: entropy });
  }

  encryptOtherKey = (object: any) => {
    const publicKey = process.env.NEXT_STATIC_PUB_KEY;
    if (!publicKey) throw new CustomException("Key not found", 500);
    const jsonMsg = JSON.stringify(object);
    const encrypted = this.crypt.encrypt(publicKey, jsonMsg);
    if (!encrypted) throw new CustomException("Encrypt failed", 500);
    return encrypted;
  };

  encrypt = (object: any) => {
    const publicKey = process.env.NEXT_STATIC_PUB_KEY;
    if (!publicKey) throw new CustomException("Key not found", 500);
    const jsonMsg = JSON.stringify(object);
    const encrypted = this.crypt.encrypt(publicKey, jsonMsg);
    if (!encrypted) throw new CustomException("Encrypt failed", 500);
    return encrypted;
  };

  decrypt = (object: any) => {
    const privateKey = process.env.NEXT_STATIC_PRIV_KEY;
    if (!privateKey) throw new CustomException("Key not found", 500);
    const decrypted = this.crypt.decrypt(privateKey, object);
    if (!decrypted) throw new CustomException("Decrypt failed", 500);
    const jsonObject = JSON.parse(decrypted.message);
    return jsonObject;
  };

  criptografar = (object: any, chaves: any) => {
    const jsonString = JSON.stringify(object);
    let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(chaves.key.data), Buffer.from(chaves.iv.data));
    let encrypted = Buffer.concat([cipher.update(jsonString), cipher.final()]);
    return {
      resultado: encrypted.toString("base64"),
    };
  };

  descriptografar = async (object: any, codigo: string) => {
    const chave = await CriptoKey.buscarCodigo(codigo);
    const descriptografia = this.crypt.decrypt(chave.chavePrivada, object);
    if (!descriptografia) throw new CustomException("Decrypt failed", 500);
    const jsonObject = JSON.parse(descriptografia.message);
    return jsonObject;
  };
}
