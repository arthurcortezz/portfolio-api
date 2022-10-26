import { Router } from "express";
import { NotificationController } from "../controllers";
import { Cryptography } from "../middleware";

const router = Router();
const notificacao = new NotificationController();
const crypto = new Cryptography();
router.post(
  "/notification/saveSubscription",
  // cripto.descriptografarRequest,
  // ensureAuthenticated,
  // authorization,
  // validarQuery(notificacaoPush),
  notificacao.newSubscription
  // crypto.criptografar
);
router.post(
  "/notification/notificationPush",
  // cripto.descriptografarRequest,
  // ensureAuthenticated,
  // authorization,
  // validarQuery(notificacaoPush),
  notificacao.notificacaoPush
  // crypto.criptografar
);

export default router;
