import {makeStyles} from "@material-ui/core/styles";
import {TextField as Field} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  field: {
    // margin: "0 15px"
  }
}));

const TextField = ({input, label}) => {
  const classes = useStyles();
  return <Field {...input} label={label} className={classes.field}/>
}

export default TextField;