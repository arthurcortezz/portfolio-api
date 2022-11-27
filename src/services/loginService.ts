import { CustomException } from "../exceptions";
import { LoginModel } from "../models";

class CommentService {
  async verifyUser(object: any) {
    try {
      let document;
      const userAuthentication = await LoginModel.findOne({ user: object.user });
      if (userAuthentication) {
        if (object.user === userAuthentication.user && object.pass === userAuthentication.pass) {
          return {
            code: 200,
            message: "Successful login!",
          };
        } else {
          return {
            code: 500,
            message: "Wrong Password.",
          };
        }
      } else {
        return {
          code: 404,
          message: "User not registred.",
        };
      }
    } catch (error) {
      throw new CustomException(error.message, error.codigo);
    }
  }
  async register(object: any) {
    try {
      const userAuthenticationMail = await LoginModel.findOne({ email: object.email });
      const userAuthenticationUser = await LoginModel.findOne({ user: object.user, email: object.email });
      if (userAuthenticationMail || userAuthenticationUser) {
        return {
          code: 500,
          message: "User already registred.",
        };
      } else {
        const document = await new LoginModel(object).save();
        if (document) {
          return {
            code: 200,
            message: `User registred successful, make login now!`,
          };
        }
      }
      return {
        document: document,
        log: `New comment from ${object.user}`,
      };
    } catch (error) {}
  }
}
export default new CommentService();
