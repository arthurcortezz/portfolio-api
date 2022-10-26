import { Request, Response, NextFunction } from "express";
import { CommentService } from "../services";
import { Comment } from "../models";

export class CommentController {
  async newComment(request: Request, response: Response, next: NextFunction) {
    try {
      const comment = {
        name: request.body.name,
        reason: request.body.reason,
        message: request.body.message,
      };
      await Comment.create(comment);
      response.status(202).json(comment);
    } catch (error) {
      response.status(500).json(error);
    }

    try {
      const comment: any = {
        _id: request.body._id,
        message: request.body.message,
      };
      const result = await CommentService.newComment(comment);
      response.locals.message = {
        res: result,
      };
      response.locals.code = 200;
      next();
    } catch (error) {
      if (error.code) return response.status(error.code).json(error.message);
      return response.status(500).json(error);
    }
  }
}
export default new CommentController();
