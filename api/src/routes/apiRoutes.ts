import { Router } from "express";
import authController from "../controllers/auth.controller";
import userController from "../controllers/user.controller";
import adminController from "../controllers/admin.controller";
import {verifyToken} from "../middleware/auth.middleware";

const router = Router();

router.get("/test", (req, res) => {
  res.send("Auth Route Working 🔥");
});
router.post("/login", authController.login);

router.post("/register", userController.register);
router.get("/admin/getAllEmployees", verifyToken, adminController.getAllEmployee);
router.get("/user/getProfile", verifyToken, userController.getDetail)


export default router;