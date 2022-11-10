import { Router } from "express";
import { NotificationController } from "../controllers";
import { Cryptography } from "../middleware";

const router = Router();
const notificacao = new NotificationController();
const crypto = new Cryptography();
router.post(
  "/notification/saveSubscription",
  notificacao.newSubscription
);
router.post(
  "/notification/notificationPush",
  notificacao.notificacaoPush
);

export default router;
