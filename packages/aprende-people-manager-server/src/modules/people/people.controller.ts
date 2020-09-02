import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { PeopleService } from './people.service';

import { Person } from '@prisma/client';

@Controller("people")
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) { }

  @Get()
  async listPeople(): Promise<Person[]> {
    return await this.peopleService.listPeople();
  }

  @Post()
  async addPerson(@Body() person: Person): Promise<Person> {
    return await this.peopleService.addPerson(person);
  }

  @Post("generate_strangers")
  async generateStrangers() {
    await this.peopleService.generateStrangers();
  }

  @Put(":id")
  async updatePerson(@Param() param: { id: string }, @Body() person: Person): Promise<Person> {
    return await this.peopleService.updatePerson(param.id, person);
  }

  @Delete(":id")
  async deletePerson(@Param() params: { id: string }): Promise<Person> {
    return await this.peopleService.deletePerson(params.id);
  }
}
