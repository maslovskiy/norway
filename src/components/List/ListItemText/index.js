import React from 'react';
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "30%",
    margin: 0
  },
  primary: {
    fontWeight: "600",
    fontSize: "18px",
    lineHeight: " 22px",
    color: "#2C2C2C",
  },
  secondary: {
    fontWeight: 300,
    fontSize: "14px",
    lineHeight: "17px",
    color: "#9F9F9F",
    marginTop: "6px"
  }
}));

export default ({primary, secondary}) => {
  const classes = useStyles();
  return (
    <ListItemText
      classes={classes} primary={primary} secondary={secondary}/>
  );
};
