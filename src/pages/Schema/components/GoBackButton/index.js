import React from 'react';
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  link: {
    marginBottom: 40,
    display: "flex",
    "& svg": {
      marginRight: 20
    },
    "& a": {
      fontSize: "32px",
      fontWeight: "600",
      lineHeight: "32px",
      letterSpacing: "0px",
      textAlign: "left",
      color: "#2F3333 !important",
      textDecoration: "none",
    }
  }
}));

const GoBackButton = ({name, to}) => {
  const classes = useStyles();
  return (
    <span className={classes.link}>
        <Link to={to}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5" stroke="#2F3333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 19L5 12L12 5" stroke="#2F3333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
         <span>
           {
             name.toUpperCase()
           }
         </span>
        </Link>
     </span>
  );
}

export default GoBackButton;