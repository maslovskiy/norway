import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Grid} from "@material-ui/core";

import Main from "../pages/Main";
import Schema from "../pages/Schema";

const Routes = () => {
  return (
    <Grid item xs={12}>
      <Switch>
        <Route exact path="/">
          <Main/>
        </Route>
        <Route path="/schema/:id">
          <Schema/>
        </Route>
        <Route path="/">
          <Redirect to="/"/>
        </Route>
      </Switch>
    </Grid>
  );
}

export default Routes;