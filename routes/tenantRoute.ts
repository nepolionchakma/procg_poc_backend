import { Router } from "express";
import { usersController } from "../controllers/tenantController";
import {
  validateTenantData,
  validateTenantsData,
} from "../controllers/tenantValidation";
const router = Router();
router.get("/", usersController.getTenants);
router.post("/create", validateTenantData, usersController.createTenant);
router.post("/upsert", validateTenantsData, usersController.upsertTenant);
router.put("/update/:tenant_id", usersController.updateTenant);
router.get("/find/:id", usersController.getUniqueTenant);
router.delete("/delete/:id", usersController.deleteTenant);

export default router;

///test work

// const express = require("express");
// const router = express.Router();

// const { createTenant } = require("../controllers/userController");

// router.route("/create-tenant").post(createTenant);

// module.exports = router;
