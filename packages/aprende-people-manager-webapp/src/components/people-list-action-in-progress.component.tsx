import React from "react";
import {
  Container,
  CircularProgress,
  Typography,
  makeStyles,
} from "@material-ui/core";

interface PeopleListActionInProgressProps {
  text: string;
}

const usePeopleListActionInProgressStyles = makeStyles({
  LoadingContainer: {
    display: "flex",
    width: "100%",
    height: "10rem",
    textAlign: "center",
    flexDirection: "column",
  },
  LoadingSpinner: {
    margin: "3rem auto",
  },
});

export const PeopleListActionInProgress: React.FC<PeopleListActionInProgressProps> = ({
  text,
}) => {
  const {
    LoadingContainer,
    LoadingSpinner,
  } = usePeopleListActionInProgressStyles();
  return (
    <Container className={LoadingContainer}>
      <CircularProgress className={LoadingSpinner} />
      <Typography variant="h6">{text}</Typography>
    </Container>
  );
};
