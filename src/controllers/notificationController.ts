import { Request, Response, NextFunction } from "express";
import { NotificationService } from "../services";

export default class NotificacaoController {
  async notificacaoPush(request: Request, response: Response, next: NextFunction) {
    try {
      await NotificationService.notificacaoPush();
      response.locals.menssagem = {
        resposta: {
          mensagem: "enviado",
        },
      };
      response.locals.codigo = 200;
      // next();
    } catch (error: any) {
      if (error.codigo) return response.status(error.codigo).json(error.mensagem);
      else return response.status(500).json("Error.");
    }
  }
  async newSubscription(request: Request, response: Response, next: NextFunction) {
    try {
      const { endpoint, expirationTime, keys } = request.body;
      await NotificationService.newSubscription({
        endpoint,
        expirationTime,
        keys,
      });
      response.locals.menssagem = {
        resposta: {
          mensagem: "endpoint salvo",
        },
      };
      response.locals.codigo = 200;
      // next();
    } catch (error: any) {
      if (error.codigo) return response.status(error.codigo).json(error.mensagem);
      else return response.status(500).json("Error.");
    }
  }
}
