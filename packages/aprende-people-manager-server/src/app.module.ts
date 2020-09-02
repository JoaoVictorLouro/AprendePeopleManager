import { Module } from '@nestjs/common';
import { PeopleModule } from './modules/people/people.module';

@Module({
  imports: [PeopleModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
