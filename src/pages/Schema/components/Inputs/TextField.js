import {makeStyles} from "@material-ui/core/styles";
import {TextField as Field} from "@material-ui/core";

const TextField = ({input, disabled, label}) => (
  <Field {...input} label={label} disabled={disabled}/>
)

export default TextField;