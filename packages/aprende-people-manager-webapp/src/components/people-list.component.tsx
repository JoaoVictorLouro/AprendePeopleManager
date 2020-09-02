import React, { useEffect, useState, useCallback } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  makeStyles,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import { usePeopleListState } from "../state/people-list.state";
import { fetchPeople, deletePerson } from "../services/people.service";
import { Person } from "../models/person.model";
import { useSnackbar } from "notistack";
import { PeopleListActionInProgress } from "./people-list-action-in-progress.component";
import { PeopleListError } from "./people-list-error.component";
import { PeopleListEmpty } from "./people-list-empty.component";

const usePeopleListStyles = makeStyles((theme) => ({
  PeopleList: {
    marginBottom: theme.spacing(25),

    [theme.breakpoints.up("md")]: {
      display: "flex",
      flexWrap: "wrap",

      "& li": {
        width: "50%",
      },
    },
  },
}));

export const PeopleList: React.FC = () => {
  const { PeopleList } = usePeopleListStyles();
  const { enqueueSnackbar } = useSnackbar();

  const {
    setPeople,
    people,
    selectedPerson,
    selectPerson,
  } = usePeopleListState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
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

  useEffect(() => {
    if (selectedPerson === null) {
      refreshList();
    }
  }, [selectedPerson, refreshList]);

  const onDelete = async (person: Person) => {
    setIsDeleting(true);
    deletePerson(person)
      .then(() => {
        enqueueSnackbar("Removed successfully!", {
          variant: "success",
        });
        refreshList();
      })
      .catch((e) => {
        enqueueSnackbar("Failed to remove person, please try again shortly", {
          variant: "error",
        });
        console.error(e);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  if (isDeleting || isRefreshing) {
    return (
      <PeopleListActionInProgress
        text={isDeleting ? "Deleting..." : "Refreshing..."}
      />
    );
  } else if (errorRefreshing) {
    return <PeopleListError />;
  } else if (people.length === 0) {
    return <PeopleListEmpty />;
  }

  return (
    <List className={PeopleList}>
      {people.map((person) => {
        return (
          <ListItem key={person.id} button onClick={() => selectPerson(person)}>
            <ListItemText
              primary={`${person.firstName} ${person.lastName}`}
              secondary={new Date(person.createdAt as string).toLocaleString()}
            />
            <ListItemSecondaryAction>
              <IconButton onClick={() => onDelete(person)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};
