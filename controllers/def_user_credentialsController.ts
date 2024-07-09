import { Request, Response } from "express";
import prisma from "../prisma";

interface IUserCredential {
  user_id: number;
  password: String;
}
export const def_user_credentialsController = {
  //Get Users
  async getUser_credentials(req: Request, res: Response) {
    const result = await prisma.def_user_credentials.findMany();
    return res.json(result);
  },
  //Create User
  async createUser_credential(req: Request, res: Response) {
    const user = req.body as IUserCredential;
    const result = await prisma.def_user_credentials.create({
      data: {
        user_id: user.user_id,
        password: user.password,
      },
    });
    return res.json({ User: result });
  },

  //Get Unique User
  async getUniqueUser_credential(req: Request, res: Response) {
    const user_id = req.params.user_id;
    const result = await prisma.def_user_credentials.findUnique({
      where: {
        user_id: Number(user_id),
      },
    });
    return res.json({ User: result });
  },
  //Update User
  async updateUser_credential(req: Request, res: Response) {
    const user_id = req.params.user_id;
    const user = req.body as IUserCredential;
    const result = await prisma.def_user_credentials.update({
      where: {
        user_id: Number(user_id),
      },
      data: {
        password: user.password,
      },
    });
    return res.json({ updated: result, status: "success" });
  },
  //Upser many user
  async upserUser_credentials(req: Request, res: Response) {
    const users: IUserCredential[] = req.body;
    const upsertResults = [];
    for (const user of users) {
      const result = await prisma.def_user_credentials.upsert({
        where: { user_id: user.user_id },
        update: {
          password: user.password,
        },
        create: {
          user_id: user.user_id,
        },
      });
      upsertResults.push(result);
    }
    return res.json({ upsert_users: upsertResults, status: "success" });
  },
  async deleteUser_credential(req: Request, res: Response) {
    const user_id = req.params.user_id;
    const result = await prisma.def_user_credentials.delete({
      where: {
        user_id: Number(user_id),
      },
    });
    return res.json({ deleted: result, status: "success" });
  },
};
