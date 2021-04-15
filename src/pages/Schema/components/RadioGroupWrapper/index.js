import React from 'react';
import {Box, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "40px"
  },
  container: {},
  title: {
    fontSize: "18px",
    fontWeight: "400",
    lineHeight: "32px",
    letterSpacing: "0px",
    textAlign: "left",
  }
}));

const RadioGroupWrapper = ({title, children}) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography variant={"h5"} className={classes.title}>{title}</Typography>
      <Box className={classes.container}>
        {children}
      </Box>
    </Box>
  );
}

export default RadioGroupWrapper;