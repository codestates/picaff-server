import express from "express";
import { userController } from "@controllers/index";
const router = express.Router();

router.post("/email", userController.mail);
router.get("/", userController.get);
export default router;
