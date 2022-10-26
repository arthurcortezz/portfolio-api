import { Router } from "express";
import { NotificationController } from "../controllers";

const router = Router();
const notificacao = new NotificationController();

router.post(
  "/notification/saveSubscription",
  // cripto.descriptografarRequest,
  // ensureAuthenticated,
  // authorization,
  // validarQuery(notificacaoPush),
  notificacao.newSubscription
);
router.post(
  "/notification/notificationPush",
  // cripto.descriptografarRequest,
  // ensureAuthenticated,
  // authorization,
  // validarQuery(notificacaoPush),
  notificacao.notificacaoPush
);

export default router;
