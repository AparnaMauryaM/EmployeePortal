import { Router } from "express";
import authController from "../controllers/auth.controller";
import userController from "../controllers/user.controller";
//import adminController from "../controllers/admin.controller.js";

const router = Router();


console.log("AUTH CONTROLLER:", authController);



router.post("/login", authController.login);
router.get("/test", (req, res) => {
  res.send("Auth Route Working 🔥");
});
router.post("/register", userController.register);
//router.get("/user/dashboard", userController.dashboard);
//router.get("/admin/dashboard", adminController.dashboard);

export default router;