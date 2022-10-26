const Hybrid = require("@kaduzinghost/hybrid-crypto");
import { v4 as uuid } from "uuid";
import { CustomException } from "../../exceptions";
import { CriptoKey } from "../../models";

class ChaveCriptografiaService {
  rsa: any;
  constructor() {
    this.rsa = new Hybrid.RSA();
  }

  gerarChaves = () => {
    return new Promise((resolve, reject) => {
      this.rsa.generateKeyPair((keyPair: any) => {
        if (keyPair) {
          resolve({
            publicKey: keyPair.publicKey,
            privateKey: keyPair.privateKey,
          });
        } else {
          reject();
        }
      });
    });
  };

  criar = async () => {
    try {
      let chave: any = await this.gerarChaves();
      let data = new Date();
      data.setDate(data.getDate() + 1);
      let codigo = {
        codigo: uuid(),
        chavePublica: chave.publicKey,
        chavePrivada: chave.privateKey,
        dataLimite: data.getTime(),
      };
      const resultado: any = await new CriptoKey(codigo).save();
      return {
        codigo: resultado.codigo,
        chavePublica: resultado.chavePublica,
      };
    } catch (error) {
      throw new CustomException(error.mensagem, error.codigo);
    }
  };

  buscarCodigo = async (codigo: String) => {
    try {
      const resultado = await CriptoKey.findOne({ codigo: codigo });
      if (!resultado) throw new CustomException("Não encontrado", 404);
      const { _doc } = resultado;
      return _doc;
    } catch (error) {
      throw new CustomException(error.mensagem, error.codigo);
    }
  };
}

export default new ChaveCriptografiaService();
