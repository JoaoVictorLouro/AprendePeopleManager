import React, { createContext, useContext, useState } from "react";
import { Person } from "../models/person.model";

interface PeopleListContextType {
  people: Person[];
  setPeople(people: Person[]): void;

  selectedPerson: Person | null;
  selectPerson(person: Person | null): void;
}

export const PeopleListContext = createContext<PeopleListContextType>({
  people: [],
  setPeople: () => {},
  selectedPerson: null,
  selectPerson: () => {},
});

export const WithPeopleListState: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [selectedPerson, selectPerson] = useState<Person | null>(null);
  const stateValue: PeopleListContextType = {
    people,
    setPeople,
    selectedPerson,
    selectPerson,
  };
  return (
    <PeopleListContext.Provider value={stateValue}>
      {children}
    </PeopleListContext.Provider>
  );
};

export function usePeopleListState() {
  return useContext(PeopleListContext);
}
