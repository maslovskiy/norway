import React from 'react';
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return ({
    root: {
      flexGrow: 1,
      width: "30%",
      margin: 0
    },
    primary: {
      fontWeight: "600",
      fontSize: "18px",
      lineHeight: " 22px",
      color: theme.palette.primary.darkGray,
    },
    secondary: {
      fontWeight: 300,
      fontSize: "14px",
      lineHeight: "17px",
      color: theme.palette.primary.secondary,
      marginTop: "6px"
    }
  })
});

export default ({primary, secondary}) => {
  const classes = useStyles();
  return (
    <ListItemText
      classes={classes} primary={primary} secondary={secondary}/>
  );
};
