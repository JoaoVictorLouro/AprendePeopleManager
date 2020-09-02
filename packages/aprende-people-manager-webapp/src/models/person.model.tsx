import { object, string } from "yup";

export interface Person {
  id?: string;
  createdAt?: string;
  firstName: string;
  lastName: string;
}
