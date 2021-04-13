import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Grid} from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return ({
    root: {
      display: "flex",
      justifyContent: "center",
      backgroundColor: theme.palette.primary.main,
      minHeight: "100vh",
      minWidth: "100%",
      padding: "32px 15px"
    },
    container: {
      maxWidth: 1120,
      display: "flex",
      flexGrow: 1,
    }
  })
});

const AppContainer = ({children}) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Grid container>
          {children}
        </Grid>
      </Box>
    </Box>
  )
};

export default AppContainer;