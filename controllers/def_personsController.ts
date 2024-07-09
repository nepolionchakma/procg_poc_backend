import { Request, Response } from "express";
import prisma from "../prisma";

interface Person {
  user_id: number;
  user_name: String;
  first_name: String;
  middle_name: String;
  last_name: String;
  job_title: String;
}
export const def_personsController = {
  //Get Users
  async getPersons(req: Request, res: Response) {
    const result = await prisma.def_persons.findMany();
    return res.json(result);
  },
  //Create User
  async createPerson(req: Request, res: Response) {
    const person = req.body as Person;
    const result = await prisma.def_persons.create({
      data: {
        user_id: person.user_id,
        user_name: person.user_name,
        first_name: person.first_name,
        middle_name: person.middle_name,
        last_name: person.last_name,
        job_title: person.job_title,
      },
    });
    return res.json({ Person: result });
  },

  //Get Unique User
  async getUniquePerson(req: Request, res: Response) {
    const user_id = req.params.user_id;
    const result = await prisma.def_persons.findUnique({
      where: {
        user_id: Number(user_id),
      },
    });
    return res.json({ Person: result });
  },
  //Update User
  async updatePerson(req: Request, res: Response) {
    const user_id = req.params.user_id;
    const person = req.body as Person;
    const result = await prisma.def_persons.update({
      where: {
        user_id: Number(user_id),
      },
      data: {
        user_name: person.user_name,
        first_name: person.first_name,
        middle_name: person.middle_name,
        last_name: person.last_name,
        job_title: person.job_title,
      },
    });
    return res.json({ updated: result, status: "success" });
  },
  //Upser many user
  async upserPerson(req: Request, res: Response) {
    const persons: Person[] = req.body;
    const upsertResults = [];
    for (const person of persons) {
      const result = await prisma.def_persons.upsert({
        where: { user_id: person.user_id },
        update: {
          user_name: person.user_name,
          first_name: person.first_name,
          middle_name: person.middle_name,
          last_name: person.last_name,
          job_title: person.job_title,
        },
        create: {
          user_id: person.user_id,
          user_name: person.user_name,
          first_name: person.first_name,
          middle_name: person.middle_name,
          last_name: person.last_name,
          job_title: person.job_title,
        },
      });
      upsertResults.push(result);
    }
    return res.json({ upsert_persons: upsertResults, status: "success" });
  },
  async deletePerson(req: Request, res: Response) {
    const user_id = req.params.user_id;
    const result = await prisma.def_persons.delete({
      where: {
        user_id: Number(user_id),
      },
    });
    return res.json({ deleted: result, status: "success" });
  },
};
