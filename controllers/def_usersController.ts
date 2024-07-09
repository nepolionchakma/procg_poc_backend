import { Request, Response } from "express";
import prisma from "../prisma";

interface User {
  user_id: number;
  user_name: String;
  user_type: String;
  email_addresses: string[];
  created_by: number;
  created_on: String;
  last_updated_by: number;
  last_updated_on: String;
  tenant_id: number;
}
export const def_usersController = {
  //Get Users
  async getUsers(req: Request, res: Response) {
    const result = await prisma.def_users.findMany();
    return res.json(result);
  },
  //Create User
  async createUser(req: Request, res: Response) {
    const user = req.body as User;
    const result = await prisma.def_users.create({
      data: {
        user_id: user.user_id,
        user_name: user.user_name,
        user_type: user.user_type,
        email_addresses: user.email_addresses,
        created_by: user.created_by,
        created_on: user.created_on,
        last_updated_by: user.last_updated_by,
        last_updated_on: user.last_updated_on,
        tenant_id: user.tenant_id,
      },
    });
    return res.json({ User: result });
  },

  //Get Unique User
  async getUniqueUser(req: Request, res: Response) {
    const user_id = req.params.user_id;
    const result = await prisma.def_users.findUnique({
      where: {
        user_id: Number(user_id),
      },
    });
    return res.json({ User: result });
  },
  //Update User
  async updateUser(req: Request, res: Response) {
    const user_id = req.params.user_id;
    const user = req.body as User;
    const result = await prisma.def_users.update({
      where: {
        user_id: Number(user_id),
      },
      data: {
        user_name: user.user_name,
        user_type: user.user_type,
        email_addresses: user.email_addresses,
        created_by: user.created_by,
        created_on: user.created_on,
        last_updated_by: user.last_updated_by,
        last_updated_on: user.last_updated_on,
        tenant_id: user.tenant_id,
      },
    });
    return res.json({ updated: result, status: "success" });
  },
  //Upser many user
  async upserUsers(req: Request, res: Response) {
    const users: User[] = req.body;
    const upsertResults = [];
    for (const user of users) {
      const result = await prisma.def_users.upsert({
        where: { user_id: user.user_id },
        update: {
          user_name: user.user_name,
          user_type: user.user_type,
          email_addresses: user.email_addresses,
          created_by: user.created_by,
          created_on: user.created_on,
          last_updated_by: user.last_updated_by,
          last_updated_on: user.last_updated_on,
          tenant_id: user.tenant_id,
        },
        create: {
          user_id: user.user_id,
          user_name: user.user_name,
          user_type: user.user_type,
          email_addresses: user.email_addresses,
          created_by: user.created_by,
          created_on: user.created_on,
          last_updated_by: user.last_updated_by,
          last_updated_on: user.last_updated_on,
          tenant_id: user.tenant_id,
        },
      });
      upsertResults.push(result);
    }
    return res.json({ upsert_users: upsertResults, status: "success" });
  },
  async deleteUser(req: Request, res: Response) {
    const user_id = req.params.user_id;
    const result = await prisma.def_users.delete({
      where: {
        user_id: Number(user_id),
      },
    });
    return res.json({ deleted: result, status: "success" });
  },
};
