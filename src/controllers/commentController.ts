import { Request, Response, NextFunction } from "express";
import { CommentService } from "../services";

export class CommentController {
  async newComment(request: Request, response: Response, next: NextFunction) {
    try {
      const comment: any = {
        _id: request.body._id,
        message: request.body.message,
      };
      const result: any = await CommentService.newComment(comment);
      response.locals.message = {
        res: result,
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
