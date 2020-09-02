import React, { createContext, useContext, useState, useCallback } from "react";
import { Person } from "../models/person.model";
import { fetchPeople } from "../services/people.service";
import { useSnackbar } from "notistack";

interface PeopleListContextType {
  people: Person[];
  isRefreshing: boolean;
  errorRefreshing: boolean;
  setPeople(people: Person[]): void;

  selectedPerson: Person | null;
  selectPerson(person: Person | null): void;
  refreshList(): void;
}

export const PeopleListContext = createContext<PeopleListContextType>({
  people: [],
  setPeople: () => {},
  selectedPerson: null,
  selectPerson: () => {},
  isRefreshing: false,
  errorRefreshing: false,
  refreshList: () => {},
});

export const WithPeopleListState: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [people, setPeople] = useState<Person[]>([]);
  const [selectedPerson, selectPerson] = useState<Person | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorRefreshing, setErrorRefreshing] = useState(false);

  const refreshList = useCallback(() => {
    setIsRefreshing(true);
    setErrorRefreshing(false);
    fetchPeople()
      .then((people) => {
        setPeople(people);
      })
      .catch((e) => {
        enqueueSnackbar(
          "Looks like there was an error fetching the people list, please try again later...",
          {
            variant: "error",
          }
        );
        console.error(e);
        setErrorRefreshing(true);
        setTimeout(refreshList, 10000);
      })
      .finally(() => {
        setIsRefreshing(false);
      });
  }, [setPeople, setIsRefreshing, enqueueSnackbar]);

  const stateValue: PeopleListContextType = {
    people,
    setPeople,
    selectedPerson,
    selectPerson,
    isRefreshing,
    errorRefreshing,
    refreshList,
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
