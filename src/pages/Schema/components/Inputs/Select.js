import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Box, Select as Field, FormControl, InputLabel, MenuItem} from "@material-ui/core";
import {roles} from "../../../../models/user";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "flex-end",
    minHeight: "100%",
    "& > label": {
      alignItems: "flex-end",
    },
  },
  field: {
    "& > span": {
      paddingBottom: 0
    },
  }
}));


const Select = ({input, label}) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <FormControl>
        <InputLabel>{label}</InputLabel>
        <Field {...input} >
          {
            roles.map(({value, label}) => (
              <MenuItem key={value} value={value}>{label}</MenuItem>
            ))
          }
        </Field>
      </FormControl>
    </Box>
  )
}

export default Select;