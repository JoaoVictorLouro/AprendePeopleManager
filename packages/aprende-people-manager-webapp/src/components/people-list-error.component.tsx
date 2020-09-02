import React from "react";
import { Container, Typography, makeStyles } from "@material-ui/core";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";

const usePeopleListErrorStyles = makeStyles({
  ErrorContainer: {
    display: "flex",
    width: "100%",
    height: "10rem",
    textAlign: "center",
    flexDirection: "column",
  },
  SadFaceIcon: {
    margin: "3rem auto",
    fontSize: "5rem",
  },
});

export const PeopleListError: React.FC = () => {
  const { ErrorContainer, SadFaceIcon } = usePeopleListErrorStyles();
  return (
    <Container className={ErrorContainer}>
      <SentimentDissatisfiedIcon className={SadFaceIcon} />
      <Typography variant="h6">
        Looks like there was an error, please try again shortly...
      </Typography>
    </Container>
  );
};
