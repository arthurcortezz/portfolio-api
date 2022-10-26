import { CustomException } from "../exceptions";
import { Notification } from "../models";
const webpush = require("web-push");
interface OpcoesNotificacao {
  endpoint: string;
  expirationTime: string;
  keys: Keys;
}
interface Keys {
  auth: string;
  p256dh: string;
}
class NotificationService {
  async notificacaoPush() {
    try {
      const subscriptions = await Notification.find();
      const payload = {
        title: "Teste de notificações",
        message: "Testando o service worker para enviar push de notificação",
      };
      const options = {
        vapidDetails: {
          subject: "mailto:arthurcortez@gmail.com",
          publicKey: process.env.VAPID_PUBLIC_KEY,
          privateKey: process.env.VAPID_PRIVATE_KEY,
        },
      };
      const payloadJson = JSON.stringify(payload);
      if (subscriptions) {
        console.log("🚀 ~ file: notificationService.ts ~ line 30 ~ NotificationService ~ notificacaoPush ~ subscriptions", subscriptions);
        subscriptions.forEach((e: any) => {
          const pushSubscription = {
            endpoint: e.endpoint,
            keys: {
              p256dh: e.keys.p256dh,
              auth: e.keys.auth,
            },
          };
          webpush.sendNotification(pushSubscription, payloadJson, options).catch((error: any) => {
            if (error.statusCode === 410) {
              this.deleteSubscription(error.endpoint);
            }
          });
        });
      }
    } catch (error: any) {
      throw new CustomException(error.mensagem, error.codigo);
    }
  }
  async deleteSubscription(endpoint: string) {
    try {
      await Notification.deleteOne({ "subscription.endpoint": endpoint });
    } catch (error: any) {
      throw new CustomException(error.mensagem, error.codigo);
    }
  }
  async newSubscription(opcoes: OpcoesNotificacao) {
    try {
      const notificacaoBuscada = await Notification.findOne({
        endpoint: opcoes.endpoint,
      });
      console.log("🚀 ~ file: notificationService.ts ~ line 62 ~ NotificationService ~ newSubscription ~ notificacaoBuscada", notificacaoBuscada);
      if (notificacaoBuscada === (undefined || null)) {
        await new Notification(opcoes).save();
      } else {
        await Notification.updateOne({ _id: notificacaoBuscada._id }, opcoes);
      }
    } catch (error: any) {
      throw new CustomException(error.mensagem, error.codigo);
    }
  }
}
export default new NotificationService();
