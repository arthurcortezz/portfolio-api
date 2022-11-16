import { Request, Response, NextFunction } from "express";
import { LoginService } from "../services";

interface Fields {
  user: string;
  pass: string;
}
export class LoginController {
  async makeLogin(request: Request, response: Response, next: NextFunction) {
    try {
      const login: Fields = {
        user: request.body.user,
        pass: request.body.pass,
      };
      const result = await LoginService.verifyUser(login);
      response.locals.message = {
        response: result.teste,
        log: `New login from ${result}`,
      };
      response.locals.code = 200;
      next();
    } catch (error: any) {
      if (error.code) return response.status(error.code).json(error.message);
      return response.status(500).json(error);
    }
  }
  async makeRegister(request: Request, response: Response, next: NextFunction) {
    try {
      const register: Fields = {
        user: request.body.user,
        pass: request.body.pass,
      };
      const result = await LoginService.register(register);
      response.locals.message = {
        response: result,
        log: `New login from ${result}`,
      };
      response.locals.code = 200;
      next();
    } catch (error: any) {
      if (error.code) return response.status(error.code).json(error.message);
      return response.status(500).json(error);
    }
  }
}
export default new LoginController();
