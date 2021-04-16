import {createMuiTheme} from "@material-ui/core";
import palette from "./palette";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: palette.accent,
      secondary: palette.secondary,
      lightGray: palette.lightGray,
      darkGray: palette.darkGray,
    },
  },
  typography: {
    fontFamily: [
      'Inter'
    ].join(','),
  },
  overrides: {
    // fix empty text field label position

    MuiFormLabel: {
      root: {
        whiteSpace: "nowrap",
        color: "#000",
        fontSize: "0.9rem",
        "&$focused": {
          color: "#000",
        },
      },
    },
    MuiInput: {
      root: {
        fontFamily: "Inter",
      },
      underline: {
        "&::before": {
          borderColor: "#DEDEDE",
        },
        "&::hover": {
          "&::before": {
            borderColor: "#DEDEDE !important",
          },
        }
      },
    },
    MuiFormControl: {
      root: {
        width: "100%",
      },
    },
  },
});

export default theme;