import {makeStyles} from "@material-ui/core/styles";
import {TextField as Field} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  field: {
    // margin: "0 15px"
    minHeight: 128,
    "& .MuiInputBase-root": {
      minHeight: "128px",
    }
    // padding: "8px 16px",
    // border: "1px solid #DEDEDE"
  }
}));

const TextArea = ({input, label}) => {
  const classes = useStyles();
  return (
    <Field
      multiline
      rows={4}
      placeholder={input.placeholder}
      variant="outlined"
      type="textarea"
      {...input}
      label={label}
      className={classes.field}
    />
  )
}

export default TextArea;