import {createMuiTheme} from "@material-ui/core";
import palette from "./palette";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: palette.accent,
      secondary: palette.secondary,
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

        // fontSize: "16px",
        // border: "1px solid #DEDEDE",
        "&$focused": {
          color: "#000",
          // fontSize: "20px",
          lineHeight: " 24px"
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
        overflow: "hidden"
      },
    },

    MuiFormControl1: {
      root: {
        " & label[data-shrink='false']": {
          top: "-10px",
          color: palette.typography.black.solid,
          transform: `translate(10px, 20px) scale(1)`,
        },
      },
    },
    MuiFormLabel1: {
      root: {
        fontSize: "0.875rem",
      },
    },
    MuiOutlinedInput1: {
      input: {
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
        letterSpacing: "0.0025rem",
        padding: "0.3125rem 0.625rem",
        height: "1.25rem",
        "&::-webkit-input-placeholder": {
          color: palette.typography.black.solid,
          opacity: `1 !important`,
        },
      },
      notchedOutline: {
        fontSize: "0.875rem",
      },
    },
    MuiFormHelperText1: {
      root: {
        fontSize: "0.625rem",
        textAlign: "right",
      },
      contained: {
        marginRight: 0,
        marginTop: 0,
      },
    },
    MuiCheckbox1: {
      root: {
        padding: 3,
        "& svg": {
          fontSize: "1rem",
        },
      },
    },
    MuiFormControlLabel1: {
      root: {
        fontSize: "0.75rem",
        lineHeight: "1rem",
        marginRight: 0,
      },
    },
    MuiButton1: {
      root: {
        height: "2rem",
      },
      label: {
        fontSize: "0.875rem",
        lineHeight: "1rem",
        fontWeight: "normal",
        textTransform: "capitalize",
      },
    },
    MuiSvgIcon1: {
      colorSecondary: {
        color: palette.typography.white.inactive,
      },
    },
    MuiTextField1: {
      root: {
        marginTop: 0,
      },
    },
    MuiSnackbar1: {
      anchorOriginTopCenter: {
        top: "50% !important",
      },
    },
    MuiPickersDay1: {
      daySelected: {
        border: 0,
      },
      current: {
        border: "0.063rem solid #DC0032",
      },
    },
    MuiTab1: {
      "root": {
        background: "#000",
        "&$selected": {
          background: "#49575E",
          border: "1px solid #49575E",
          color: "#fff"
        },
      },
    }
  },
});

export default theme;