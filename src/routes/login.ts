import { Router } from "express";
import { Cryptography, validate } from "../middleware";
import { LoginController } from "../controllers";

const router = Router();
const ROUTER_BASE = "/login";
const encrypt = new Cryptography();

router.post(`${ROUTER_BASE}/login`, LoginController.makeLogin, encrypt.crypt);
router.post(`${ROUTER_BASE}/register`, LoginController.makeRegister, encrypt.crypt);

export default router;
