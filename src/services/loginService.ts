import { LoginModel } from "../models";

class CommentService {
  async verifyUser(object: any) {
    try {
      let document;
      const userAuthentication = await LoginModel.findOne({ user: object.user });
      if (userAuthentication) {
        if (object.user === userAuthentication.user && object.pass === userAuthentication.pass) {
          return {
            teste: "Senha correta",
          };
        } else {
          return {
            teste: "Senha incorreta",
          };
        }
      } else {
        // document = await new LoginModel(object).save();
      }
      return {
        document: document,
        log: `New comment from ${object.user}`,
      };
    } catch (error) {}
  }
  async register(object: any) {
    try {
      let document;
      const userAuthentication = await LoginModel.findOne({ user: object.user });
      if (userAuthentication) {
        return {
          return: "User already registred!",
        };
      } else {
        document = await new LoginModel(object).save();
      }
      return {
        document: document,
        log: `New comment from ${object.user}`,
      };
    } catch (error) {}
  }
}
export default new CommentService();
