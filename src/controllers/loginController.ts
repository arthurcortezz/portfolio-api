import { Request, Response, NextFunction } from "express";
import { LoginService } from "../services";

interface Fields {
  user: string;
  email?: string;
  phone?: string;
  pass: string;
  confirmPass?: string;
}
export class LoginController {
  async makeLogin(request: Request, response: Response, next: NextFunction) {
    try {
      const login: Fields = {
        user: request.body.user,
        pass: request.body.pass,
      };
      const result = await LoginService.verifyUser(login);
      response.status(result.code).json({ message: result.message });
    } catch (error: any) {
      if (error.code) return response.status(error.code).json(error.message);
      return response.status(500).json(error);
    }
  }
  async makeRegister(request: Request, response: Response, next: NextFunction) {
    try {
      const register: Fields = {
        user: request.body.user,
        email: request.body.email,
        phone: request.body.phone,
        pass: request.body.pass,
        confirmPass: request.body.confirmPass,
      };
      const result = await LoginService.register(register);
      response.status(result.code).json({ message: result.message });
    } catch (error: any) {
      if (error.code) return response.status(error.code).json(error.message);
      return response.status(500).json(error);
    }
  }
}
export default new LoginController();
