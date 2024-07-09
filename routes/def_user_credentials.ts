import { Router } from "express";
import { def_user_credentialsController } from "../controllers/def_user_credentialsController";
const router = Router();
router.get("/", def_user_credentialsController.getUser_credentials);
router.get(
  "/user/:user_id",
  def_user_credentialsController.getUniqueUser_credential
);
router.post("/create", def_user_credentialsController.createUser_credential);
router.post("/upsert", def_user_credentialsController.upserUser_credentials);
router.put(
  "/user/:user_id/update",
  def_user_credentialsController.updateUser_credential
);
router.delete(
  "/delete/:user_id",
  def_user_credentialsController.deleteUser_credential
);
export default router;
