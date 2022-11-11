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

class Cryptography {
  crypt(request: Request, response: Response, next: NextFunction) {
    const cryptography = new CriptoService();
    let encrypted = cryptography.encrypt(response.locals.message);
    response.status(response.locals.code).json({ message: encrypted });
  }
  uncrypt(request: Request, response: Response, next: NextFunction) {
    const cryptography = new CriptoService();
    let uncrypted = cryptography.decrypt(request.body.message);
    request.body = uncrypted;
    next();
  }
}

export default Cryptography;
