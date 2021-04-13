import React from "react";
import {Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {classnames} from "@material-ui/data-grid";
import {useSchemas} from "../../providers/schemas/hooks";

const useStyles = makeStyles(() => ({
  tag: {
    display: "flex",
    alignItems: 'center',
    margin: "0 4px",
  },
  tagValue: {
    lineHeight: 1,
    padding: "5.5px 12px",
    backgroundColor: "#FCEEEC",
    color: "#FC5569",
    borderRadius: "4px",
  },
  BANK_OG_FINANS: {
    background: "#F6F4F0",
    color: "#49575E",
  },
  ENTERPRISE: {
    background: "#F2F9F3",
    color: "#62C26D",
  },
}));

const Tags = ({tags}) => {
  const classes = useStyles();
  const {types} = useSchemas();
  return Object.entries(tags).map(([key, value], index) => (
    <Box className={classes.tag} key={index}>
      <Box className={classnames(classes.tagValue, classes[key])}>
        {types[key]}
      </Box>
    </Box>
  ));
}

export default Tags;