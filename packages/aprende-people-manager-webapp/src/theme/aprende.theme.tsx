import { createMuiTheme } from "@material-ui/core";
import { pink, indigo } from "@material-ui/core/colors";

export const AprendeTheme = createMuiTheme({
  palette: {
    primary: {
      main: indigo[700],
    },
    secondary: {
      main: pink[500],
    },
  },
});
