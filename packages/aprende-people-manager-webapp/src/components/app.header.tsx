import React from "react";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";

const useAppHeaderStyles = makeStyles((theme) => ({
  AppHeaderIcon: {
    marginRight: theme.spacing(2),
  },
}));

export const AppHeader: React.FC = () => {
  const { AppHeaderIcon } = useAppHeaderStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <PeopleIcon className={AppHeaderIcon} />
        <Typography variant="h6"> Aprende People Manager</Typography>
      </Toolbar>
    </AppBar>
  );
};
