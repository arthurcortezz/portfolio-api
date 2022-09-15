import { Router } from "express";
import { CommentController } from "../controllers";

const router = Router();
const ROUTER_BASE = "/comment";
router.post(`${ROUTER_BASE}/createComment`, CommentController.newComment);
