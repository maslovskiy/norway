import React from 'react';
import {Radio as Field, FormControlLabel} from "@material-ui/core";

const Radio = ({input, label}) => {
  return (
    <FormControlLabel control={<Field {...input}/>} label={label}/>
  );
}

export default Radio;