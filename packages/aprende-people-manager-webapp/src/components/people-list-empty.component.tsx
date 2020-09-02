import React from "react";
import { Container, Typography, makeStyles, Button } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { usePeopleListState } from "../state/people-list.state";
import { makeNewPerson } from "../models/person.model";

const usePeopleListEmptyStyles = makeStyles((theme) => ({
  EmptyListContainer: {
    display: "flex",
    width: "100%",
    height: "10rem",
    textAlign: "center",
    flexDirection: "column",
  },
  AddMoreIcon: {
    margin: "3rem auto",
    fontSize: "5rem",
  },
  AddButton: {
    marginTop: theme.spacing(2),
  },
}));

export const PeopleListEmpty: React.FC = () => {
  const {
    EmptyListContainer,
    AddMoreIcon,
    AddButton,
  } = usePeopleListEmptyStyles();
  const { selectPerson } = usePeopleListState();

  const addNewPerson = () => {
    selectPerson(makeNewPerson());
  };

  return (
    <Container className={EmptyListContainer}>
      <PersonAddIcon className={AddMoreIcon} />
      <div>
        <Typography variant="h6">
          Looks like we don't have any people to show...why don't you try adding
          some?
        </Typography>
        <Button
          className={AddButton}
          variant="outlined"
          color="secondary"
          onClick={addNewPerson}
        >
          Add
        </Button>
      </div>
    </Container>
  );
};
