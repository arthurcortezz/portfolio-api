import { NextFunction, Request, Response } from "express";
import { NotificationService } from "../services";

export default class NotificationController {
  async notificacaoPush(request: Request, response: Response, next: NextFunction) {
    try {
      await NotificationService.notificacaoPush();
      response.locals.menssagem = {
        resposta: {
          mensagem: "enviado",
        },
      };
      response.locals.codigo = 200;
      next();
    } catch (error: any) {
      if (error.codigo) return response.status(error.codigo).json(error.mensagem);
      else return response.status(500).json("Error.");
    }
  }
  async newSubscription(request: Request, response: Response, next: NextFunction) {
    try {
      const { subscription } = request.body;
      await NotificationService.newSubscription(subscription);
      response.locals.menssagem = {
        resposta: {
          mensagem: "enviado",
        },
      };
      response.locals.codigo = 200;
      next();
    } catch (error: any) {
      if (error.codigo) return response.status(error.codigo).json(error.mensagem);
      else return response.status(500).json("Error.");
    }
  }
}
