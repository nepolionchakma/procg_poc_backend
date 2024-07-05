import { Request, Response } from "express";
import prisma from "../prisma";

interface Tenant {
  tenant_id: number;
  tenant_name: string;
}

export const usersController = {
  //Get Tenants
  async getTenants(req: Request, res: Response) {
    const result = await prisma.def_tenants.findMany();
    return res.json(result);
  },

  //Create Tenant
  async createTenant(req: Request, res: Response) {
    const tenant = req.body as Tenant;
    const result = await prisma.def_tenants.create({
      data: {
        tenant_id: req.body.tenant_id,
        tenant_name: req.body.tenant_name,
      },
    });
    return res.json({ tenant: result });
  },

  //Get Unique Tenant
  async getUniqueTenant(req: Request, res: Response) {
    const paramId = req.params.id;
    const result = await prisma.def_tenants.findUnique({
      where: {
        tenant_id: Number(paramId),
      },
    });
    return res.json(result);
  },

  // Update Tenant
  async updateTenant(req: Request, res: Response) {
    const { tenant_name } = req.body as Tenant;
    const paramId = req.params.tenant_id;
    try {
      // Check if tenant with given ID exists
      const existingTenant = await prisma.def_tenants.findUnique({
        where: { tenant_id: Number(paramId) },
      });

      if (!existingTenant) {
        return res
          .status(404)
          .json({ error: `Tenant with ID '${Number(paramId)}' not found` });
      }

      // Check if the new tenant_name already exists for another tenant
      const otherTenantWithSameName = await prisma.def_tenants.findFirst({
        where: {
          tenant_id: { not: Number(paramId) }, // Exclude the current tenant from the check
          tenant_name: tenant_name,
        },
      });

      if (otherTenantWithSameName) {
        return res.status(400).json({
          error: `Tenant with name '${tenant_name}' already exists`,
        });
      }

      // Update the tenant
      const result = await prisma.def_tenants.update({
        where: {
          tenant_id: Number(paramId),
        },
        data: {
          tenant_name: req.body.tenant_name,
        },
      });
      return res.json({ update: result });
    } catch (error) {
      console.error("Error updating tenant:", error);
      return res.status(500).json({ error: "Failed to update tenant" });
    }
  },

  //Upsert Tenant
  async upsertTenant(req: Request, res: Response) {
    const tenants: Tenant[] = req.body;
    try {
      const upsertResults = [];
      for (const tenant of tenants) {
        const result = await prisma.def_tenants.upsert({
          where: { tenant_id: tenant.tenant_id },
          update: {
            tenant_name: tenant.tenant_name,
          },
          create: {
            tenant_id: tenant.tenant_id,
            tenant_name: tenant.tenant_name,
          },
        });
        upsertResults.push(result);
      }

      return res.json({ tenants: upsertResults });
    } catch (error) {
      return res.status(500).json({ error: "Failed to upsert tenants" });
    }
  },

  //Delete Tenant
  async deleteTenant(req: Request, res: Response) {
    const paramId = req.params.id;
    const result = await prisma.def_tenants.delete({
      where: {
        tenant_id: Number(paramId),
      },
    });
    return res.json({ result: "Tenant Delete Success ." });
  },
};

///test work

// import { Request, Response } from "express";

// const prisma = require("../prisma/index");
// exports.createTenant = async (req: Request, res: Response) => {
//   try {
//     const result = await prisma.def_tenants.create({
//       data: {

//       },
//     });
//     return res.json(result);
//   } catch (error) {
//     throw new Error("error");
//   }
// };

// /
