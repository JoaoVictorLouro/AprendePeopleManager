export interface Person {
  id?: string;
  createdAt?: string;
  firstName: string;
  lastName: string;
}

export function makeNewPerson(): Person {
  return {
    firstName: "",
    lastName: "",
  };
}
