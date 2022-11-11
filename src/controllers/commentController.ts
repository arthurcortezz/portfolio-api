import { Request, Response, NextFunction } from "express";
import { CommentModel } from "../models";

export class CommentController {
  async newComment(request: Request, response: Response, next: NextFunction) {
    try {
      const comment: any = {
        message: request.body.message,
        name: request.body.message,
        reason: request.body.message,
      };
      const document = await new CommentModel(comment).save();
      response.locals.message = {
        response: document,
        log: `New comment from ${comment.name}`,
      };
      response.locals.code = 200;
      next();
    } catch (error: any) {
      if (error.code) return response.status(error.code).json(error.message);
      return response.status(500).json(error);
    }
  }
}
export default new CommentController();
