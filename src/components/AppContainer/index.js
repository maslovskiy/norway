import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Grid} from "@material-ui/core";
import {getSchemas, getSchemaTypes, getUser} from "../../api";
import {useUser} from "../../providers/user/hooks";
import {useSchemas} from "../../providers/schemas/hooks";
import SearchField from "../SearchField";
import User from "../User";
import {withRouter} from "react-router-dom";

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
    },
    inner: {
      marginBottom: "40px",
      minHeight: "75px",
    }
  })
});

const AppContainer = ({children, location}) => {
  const classes = useStyles();
  const {setSchemas, setSchemasTypes} = useSchemas();
  const {setUser} = useUser();

  useEffect(() => {
    Promise.all([
      getSchemas(),
      getSchemaTypes(),
      getUser()
    ]).then(([schemas, types, user]) => {
        setSchemas(schemas.data);
        setSchemasTypes(types.data);
        setUser(user.data)
      }
    )
  }, []);

  return (
    <Box component={"main"} className={classes.root}>
      <Box className={classes.container}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container spacing={3} className={classes.inner}>
              <Grid item xs={6} md={8}>
                {location.pathname === "/" && (
                  <SearchField/>
                )}
              </Grid>
              <Grid item xs={6} md={4}>
                <User/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
};

export default withRouter(AppContainer);