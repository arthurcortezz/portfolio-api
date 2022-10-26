import { Router } from "express";
import { NotificationController } from "../controllers";
const router = Router();
const notification = new NotificationController();
router.post(
  "/notification/saveSubscription",
  notification.newSubscription
);
router.post(
  "/notification/notificationPush",
  notification.notificacaoPush
);
export default router;
