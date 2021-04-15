import React from 'react';
import {Box, Grid} from "@material-ui/core";

import Filter from "../../components/Filter";
import SchemaList from "../../components/List";

const Main = () => (
  <Box>
    <Grid container>
      <Grid item xs={12}><Filter/></Grid>
      <Grid item xs={12}><SchemaList/></Grid>
    </Grid>
  </Box>
);

Main.propTypes = {};

export default Main;