import { Router } from "express";
import { Cryptography, validate } from "../middleware";
import { LoginController } from "../controllers";

const router = Router();
const ROUTER_BASE = "/account";
const encrypt = new Cryptography();

router.post(`${ROUTER_BASE}/login`, LoginController.makeLogin);
router.post(`${ROUTER_BASE}/register`, LoginController.makeRegister);

export default router;
