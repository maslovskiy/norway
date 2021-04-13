import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import Main from "../pages/Main";
import Schema from "../pages/Schema";
import {Grid} from "@material-ui/core";

const Routes = () => {
    return (
        <Grid item xs={12}>
            <Switch>
                <Route exact path="/">
                    <Main/>
                </Route>
                <Route path="/schema">
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