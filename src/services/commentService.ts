import { CommentModel } from "../models";

class CommentService {
  async newComment(object: any) {
    try {
      const document = await new CommentModel(object).save();
      return {
        document: document,
        log: `New comment from ${object.name}`,
      };
    } catch (error) {}
  }
}
export default new CommentService();
