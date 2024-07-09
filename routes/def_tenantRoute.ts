import { Router } from "express";
import { def_tenantController } from "../controllers/def_tenantController";
import {
  validateTenantData,
  validateTenantsData,
} from "../controllers/def_tenantValidation";
const router = Router();
router.get("/", def_tenantController.getTenants);
router.get("/find/:id", def_tenantController.getUniqueTenant);
router.post("/create", validateTenantData, def_tenantController.createTenant);
router.post("/upsert", validateTenantsData, def_tenantController.upsertTenant);
router.put("/update/:tenant_id", def_tenantController.updateTenant);
router.delete("/delete/:id", def_tenantController.deleteTenant);

export default router;

///test work

// const express = require("express");
// const router = express.Router();

// const { createTenant } = require("../controllers/userController");

// router.route("/create-tenant").post(createTenant);

// module.exports = router;
