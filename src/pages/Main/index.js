import React, {useEffect} from 'react';
import {Box, Grid} from "@material-ui/core";
import SearchField from "../../components/SearchField";

import {makeStyles} from '@material-ui/core/styles';
import User from "../../components/User";
import Filter from "../../components/Filter";
import SchemaList from "../../components/List";
import {getSchemas, getSchemaTypes} from "../../api";
import {useSchemas} from "../../providers/schemas/hooks";

const useStyles = makeStyles(() => ({
  container: {
    marginBottom: "40px"
  }
}));

const Main = () => {
  const classes = useStyles();
  const {setSchemas, setSchemasTypes} = useSchemas();

  useEffect(() => {
    getSchemas()
      .then(({data}) => setSchemas(data));
    getSchemaTypes()
      .then(({data}) => setSchemasTypes(data));
  }, [])

  return (
    <Box>
      <Grid container className={classes.container}>
        <Grid item xs={8}>
          <SearchField/>
        </Grid>
        <Grid item xs={4}>
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