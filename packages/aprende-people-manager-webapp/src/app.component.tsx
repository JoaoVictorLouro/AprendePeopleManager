import React from "react";
import { PeoplePage } from "./pages/people.page";
import { AppHeader } from "./components/app.header";
import { HelmetProvider } from "react-helmet-async";
import { MuiThemeProvider, makeStyles } from "@material-ui/core";
import { AprendeTheme } from "./theme/aprende.theme";
import clsx from "clsx";
import { SnackbarProvider } from "notistack";

const useAppContentStyles = makeStyles({
  App: {
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
  },
});

export const AppContent: React.FC = () => {
  const { App } = useAppContentStyles();
  return (
    <div className={clsx("App", App)}>
      <AppHeader />
      <PeoplePage />
    </div>
  );
};

export const DecorateApp: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <MuiThemeProvider theme={AprendeTheme}>
      <HelmetProvider>
        <SnackbarProvider
          anchorOrigin={{
            horizontal: "left",
            vertical: "bottom",
          }}
          maxSnack={3}
        >
          {children}
        </SnackbarProvider>
      </HelmetProvider>
    </MuiThemeProvider>
  );
};

export const App: React.FC = () => {
  return (
    <DecorateApp>
      <AppContent />
    </DecorateApp>
  );
};
