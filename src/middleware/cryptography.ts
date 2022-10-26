import { Request, Response, NextFunction } from "express";

import { CriptoService } from "../services";

export interface KeyRSA {
  Modulus: string;
  Exponent: string;
}

export interface AesKey {
  key: string;
  iv: string;
}

class Criptografia {
  criptografar(request: Request, response: Response, next: NextFunction) {
    const criptografia = new CriptoService();
    let criptografada = criptografia.encrypt(response.locals.menssagem);
    response.status(response.locals.codigo).json({ message: criptografada });
  }
  descriptografar(request: Request, response: Response, next: NextFunction) {
    const criptografia = new CriptoService();
    let descriptografada = criptografia.decrypt(request.body.message);
    request.body = descriptografada;
    next();
  }
}

export default Criptografia;
