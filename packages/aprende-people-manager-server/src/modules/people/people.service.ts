import { Injectable } from "@nestjs/common";
import { Person } from '@prisma/client';
import { PrismaService } from "../prisma/prisma.service";
import { name, random } from 'faker';


@Injectable()
export class PeopleService {
  constructor(private readonly prismaService: PrismaService) { }

  async listPeople(): Promise<Person[]> {
    return this.prismaService.person.findMany({
      orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }],

    });
  }

  async addPerson(person: Omit<Person, "id" | "createdAt">) {
    return await this.prismaService.person.create({
      data: person,
    });
  }

  async updatePerson(id: string, person: Person) {
    return await this.prismaService.person.update({
      where: {
        id,
      },
      data: person,
    });
  }

  async deletePerson(id: string) {
    return await this.prismaService.person.delete({
      where: {
        id,
      },
    });
  }

  async generateStrangers(amount = 100) {
    for (let i = 0; i < amount; i++) {
      const gender = Number(random.boolean());
      const person = {
        firstName: name.firstName(gender),
        lastName: name.firstName(gender),
      };
      await this.prismaService.person.create({ data: person });
    }
  }
}
