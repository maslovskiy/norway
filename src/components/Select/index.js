import {MenuItem, Select as MaterialSelect} from "@material-ui/core";
import React from "react";

const Select = ({defaultValue = {}, value, options, ...rest}) => {

  return (
    <MaterialSelect
      defaultValue={defaultValue.value}
      value={value}
      {...rest}
    >
      {
        options.map(({value, label}) => <MenuItem key={value} value={value}>{label}</MenuItem>)
      }
    </MaterialSelect>
  )
}

export default Select;