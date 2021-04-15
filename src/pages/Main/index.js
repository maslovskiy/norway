import React, {useEffect} from 'react';
import {Box, Grid} from "@material-ui/core";
import SearchField from "../../components/SearchField";

import {makeStyles} from '@material-ui/core/styles';
import User from "../../components/User";
import Filter from "../../components/Filter";
import SchemaList from "../../components/List";
import {getSchemas, getSchemaTypes, getUser} from "../../api";
import {useSchemas} from "../../providers/schemas/hooks";
import {useUser} from "../../providers/user/hooks";

const useStyles = makeStyles(() => ({
  container: {
    marginBottom: "40px"
  }
}));

const Main = () => {
  const classes = useStyles();
  const {setSchemas, setSchemasTypes} = useSchemas();
  const {setUser} = useUser();

  useEffect(() => {
    getSchemas()
      .then(({data}) => setSchemas(data));
    getSchemaTypes()
      .then(({data}) => setSchemasTypes(data));
    getUser()
      .then(({data}) => setUser(data));
  }, []);

  return (
    <Box>
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={6} md={8}>
          <SearchField/>
        </Grid>
        <Grid item xs={6} md={4}>
          <User/>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}><Filter/></Grid>
        <Grid item xs={12}><SchemaList/></Grid>
      </Grid>
    </Box>
  );
}

Main.propTypes = {};

export default Main;