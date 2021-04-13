import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Box, Checkbox as Field, FormControlLabel} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "flex-center",
    minHeight: "100%",
    "& > label": {
      alignItems: "flex-center",
    },
  },
  field: {
    "& > span": {
      fontWeight: 300,
      fontSize: "14px",
    },
  }
}));

const Checkbox = ({input, label}) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <FormControlLabel
        className={classes.field}
        control={<Field {...input} />}
        label={label}
      />
    </Box>
  )
}

export default Checkbox;