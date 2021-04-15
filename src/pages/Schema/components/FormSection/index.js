import React from 'react';
import {Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {classnames} from "@material-ui/data-grid";

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: "50px"
  },
  inner: {
    border: "1px solid #DEDEDE",
    padding: "24px 32px 24px 32px",
    borderRadius: "8px",
  },
  title: {
    fontWeight: "600",
    fontSize: "20px",
    lineHeight: "32px",
    display: "flex",
    alignItems: "center",
    color: " #2F3333"
  }
}));

const FormSection = ({children, title, className, innerClassName}) => {
  const classes = useStyles();
  return (
    <Box component={"section"} className={classnames(classes.root, className)}>
      {
        title &&  <h2 className={classes.title}>{title}</h2>
      }
      <Box className={classnames(classes.inner, innerClassName)}>
        {children}
      </Box>
    </Box>
  );
}

FormSection.propTypes = {};

export default FormSection;