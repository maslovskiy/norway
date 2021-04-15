import React from 'react';
import FormSection from "../../components/FormSection";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Typography} from "@material-ui/core";

const documentSrc = "/images/document_big.png";

const useStyles = makeStyles(() => ({
  root: {
    border: "none",
    padding: 0
  },
  section: {
    padding: 0,
    marginBottom: 15
  },
  button: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    backgroundColor: "transparent",
    border: "none !important",
    outline: "none !important",
    padding: 0,
    margin: 0,
    cursor: "pointer",
    "& img" : {
      marginRight: "25px"
    }
  },
  name: {
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "32px",
    letterSpacing: "0px",
    color: "#4E5252",
    textAlign: "left"
  },
  infoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 5
  },
  info: {
    fontSize: "12px",
    fontWeight: "400",
    lineHeight: "24px",
    letterSpacing: "0px",
    color: "#787A7A",
  }
}));

const Download = (props) => {
  const classes = useStyles();
  return (
    <FormSection title={"Laste Ned Dokumenter"} innerClassName={classes.root}>
      <FormSection className={classes.section}>
        <button type="submit" className={classes.button}>
          <Box>
            <img src={documentSrc}/>
          </Box>
          <Box>
            <Typography variant={"h6"} className={classes.name}>
              PROTOKOLL FRA EKSTRAORDINÆR GENERALFORSAMLING
            </Typography>
            <Box className={classes.infoContainer}>
              <Typography variant={"subtitle2"} className={classes.info}>Created by: Bjørn Nordmann</Typography>
              <Typography variant={"subtitle2"} className={classes.info}>Creating Date: Mar 30, 2021</Typography>
            </Box>
          </Box>
        </button>
      </FormSection>
      <FormSection className={classes.section}>
        <button type="submit" className={classes.button}>
          <Box>
            <img src={documentSrc}/>
          </Box>
          <Box>
            <Typography variant={"h6"} className={classes.name}>
              PROTOKOLL FRA STYREMØTE
            </Typography>
            <Box className={classes.infoContainer}>
              <Typography variant={"subtitle2"} className={classes.info}>Created by: Bjørn Nordmann</Typography>
              <Typography variant={"subtitle2"} className={classes.info}>Creating Date: Mar 30, 2021</Typography>
            </Box>
          </Box>
        </button>
      </FormSection>
      <FormSection className={classes.section}>
        <button type="submit" className={classes.button}>
          <Box>
            <img src={documentSrc}/>
          </Box>
          <Box>
            <Typography variant={"h6"} className={classes.name}>
              INNKALLING TIL EKSTRAORDINÆR GENERALFORSAMLING
            </Typography>
            <Box className={classes.infoContainer}>
              <Typography variant={"subtitle2"} className={classes.info}>Created by: Bjørn Nordmann</Typography>
              <Typography variant={"subtitle2"} className={classes.info}>Creating Date: Mar 30, 2021</Typography>
            </Box>
          </Box>
        </button>
      </FormSection>
    </FormSection>
  );
}

export default Download;