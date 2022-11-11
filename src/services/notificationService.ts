import { CustomException } from "../exceptions";
import { NotificationModel } from "../models";
const TextMessageService = require("comtele-sdk").TextMessageService;

const webpush = require("web-push");

interface OpcoesNotificacao {
  subscription: Subscription;
  user: any;
}
interface Subscription {
  endpoint: string;
  expirationTime: string;
  keys: Keys;
}
interface Keys {
  auth: string;
  p256dh: string;
}
class NotificacaoService {
  async notificacaoPush() {
    try {
      const subscriptions = await NotificationModel.find();
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
      subscriptions.forEach((e: any) => {
        const pushSubscription = {
          endpoint: e.endpoint,
          keys: {
            p256dh: e.keys.p256dh,
            auth: e.keys.auth,
          },
        };
        // const solicitacao: TipoStatusSolicitacao = Solicitacao.find({ idOwner: e.user });
        // if (solicitacao) {
        webpush.sendNotification(pushSubscription, payloadJson, options).catch((error: any) => {
          if (error.statusCode === 410) {
            this.deleteSubscription(error.endpoint);
          }
        });
        // }
      });
    } catch (error: any) {
      throw new CustomException(error.mensagem, error.codigo);
    }
  }
  async deleteSubscription(endpoint: string) {
    try {
      await NotificationModel.deleteOne({ "subscription.endpoint": endpoint });
    } catch (error: any) {
      throw new CustomException(error.mensagem, error.codigo);
    }
  }
  async newSubscription(opcoes: Subscription) {
    try {
      const notificacaoBuscada = await NotificationModel.findOne({
        endpoint: opcoes.endpoint,
      });
      if (notificacaoBuscada) {
        await NotificationModel.updateOne({ _id: notificacaoBuscada._id }, opcoes);
      } else {
        await new NotificationModel(opcoes).save();
      }
    } catch (error: any) {
      throw new CustomException(error.mensagem, error.codigo);
    }
  }
}

export default new NotificacaoService();
