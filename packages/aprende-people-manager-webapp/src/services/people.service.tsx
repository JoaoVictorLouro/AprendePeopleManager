import { Person } from "../models/person.model";
import axios from "axios";

export async function fetchPeople(): Promise<Person[]> {
  const r = await axios
    .get<Person[]>(`${process.env.REACT_APP_SERVER_ADDRESS}/people`)
    .then((r) => r.data);
  return r;
}

export async function createPerson(person: Person): Promise<Person> {
  const r = await axios
    .post<Person>(`${process.env.REACT_APP_SERVER_ADDRESS}/people`, person)
    .then((r) => r.data);
  return r;
}

export async function updatePerson(person: Person): Promise<Person> {
  const r = await axios
    .put<Person>(
      `${process.env.REACT_APP_SERVER_ADDRESS}/people/${person.id}`,
      person
    )
    .then((r) => r.data);
  return r;
}

export async function deletePerson(person: Person) {
  await axios.delete<Person>(
    `${process.env.REACT_APP_SERVER_ADDRESS}/people/${person.id}`
  );
}

export async function generateStrangers() {
  await axios.post(
    `${process.env.REACT_APP_SERVER_ADDRESS}/people/generate_strangers`
  );
}
