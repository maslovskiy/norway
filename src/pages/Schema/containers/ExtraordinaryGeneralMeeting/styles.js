import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  divider: {
    margin: "30px 0 40px"
  },
  subtitle: {
    fontWeight: "600",
    fontSize: "18px",
    lineHeight: "32px",
    marginBottom: 0
  },
  subSubmit: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    bottom: "-10px"
  },
  subSubmitBtn: {
    backgroundColor: "#49575E",
    color: "#F6F4F0",
    width: 32,
    height: 32,
    "&:hover": {
      backgroundColor: "rgba(73,87,94, 0.7)",
    },
    "& svg": {
      width: 20,
      height: 20
    }
  },
  mb25: {
    marginBottom: 25
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    height: "100%",
    "& button": {
      marginLeft: 40
    }
  },
  bottomAligned: {
    minHeight: "100%",
    display: "flex",
    alignItems: "flex-end"
  }
}));