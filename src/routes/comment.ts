import { Router } from "express";
import { Cryptography, validate } from "../middleware";
import { CommentController } from "../controllers";
import { commentSchema } from "../schemas";

const router = Router();
const ROUTER_BASE = "/comment";
const crypt = new Cryptography();

router.post(
  `${ROUTER_BASE}/newComment`,
  validate(commentSchema),
  CommentController.newComment,
  crypt.crypt
);

export default router;
