import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
export interface Tenant {
  tenant_id: number;
  tenant_name: string;
}

export const validateTenantData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { tenant_id, tenant_name } = req.body as Tenant;

  // Check if tenant_id and tenant_name are provided
  if (!tenant_id || !tenant_name) {
    return res
      .status(400)
      .json({ error: "tenant_id and tenant_name are required" });
  }

  // Check if tenant_id is unique
  const existingTenant = await prisma.def_tenants.findUnique({
    where: { tenant_id },
  });
  if (existingTenant) {
    return res.status(400).json({ error: "tenant_id already exists" });
  }

  // Check if tenant_name is unique
  const existingTenantByName = await prisma.def_tenants.findFirst({
    where: { tenant_name: tenant_name },
  });
  if (existingTenantByName) {
    return res.status(400).json({ error: "tenant_name already exists" });
  }

  next();
};

// upsert tenant
const validateTenant = (tenant: Tenant): string | null => {
  if (!tenant.tenant_id || typeof tenant.tenant_id !== "number") {
    return "Invalid tenant_id";
  }
  if (!tenant.tenant_name || typeof tenant.tenant_name !== "string") {
    return "Invalid tenant_name";
  }
  // No validation error
  return null;
};

export const validateTenantsData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tenants: Tenant[] = req.body;

  for (const tenant of tenants) {
    const validationError = validateTenant(tenant);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }
  }

  next();
};
