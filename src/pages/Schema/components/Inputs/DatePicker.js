import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const DatePicker = ({input, ...rest}) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        {...input}
        format="MM/dd/yyyy"
        label="Date picker inline"
        value={input.value === "" ? null : input.value}
        {...rest}
      />
    </MuiPickersUtilsProvider>
  );
}

export default DatePicker;