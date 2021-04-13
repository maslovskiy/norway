import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Tab, Tabs} from "@material-ui/core";
import {classnames} from "@material-ui/data-grid";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    margin: "0 -12px",
    display: "flex",
    flexWrap: "wrap",

  },
  flexContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start"
  },
  tab: {
    margin: "6px 12px",
    padding: "6px 16px",
    background: "#fff",
    border: "1px solid #49575E",
    borderRadius: "20px",
    minHeight: "auto",
    display: "inline-flex",
    fontFamily: "Open Sans",
    fontWeight: 600,
    fontSize: "16px",
    textTransform: "initial",
    minWidth: "auto !important",
    color: "#787A7A",
  },
  selected: {
    background: "#49575E",
    color: "#fff"
  }
}));

const RoundedTabs = ({value, onChange, children}) => {
  const {tab, selected, ...classes} = useStyles();
  return (
    <Tabs
      value={value}
      onChange={onChange}
      indicatorColor="primary"
      classes={classes}
    >
      {children}
    </Tabs>
  );
};

const RoundedTab = props => {
  const classes = useStyles();
  return <Tab {...props} className={classnames(classes.tab, props.selected && classes.selected)}/>
}

export {RoundedTabs as Tabs, RoundedTab as Tab};
