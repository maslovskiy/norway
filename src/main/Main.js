import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import CapitalIncrease from '../document-templates/capitalIncrease/CapitalIncrease';
import useStyles from "../document-templates/capitalIncrease/styles";
import Copyright from "./Copyright";

export default function Main() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline/>
            {/*<TopMenu/>*/}
            <main className={classes.layout}>
                <Typography component="h1" variant="h4" align="center">
                    KAPITALFORHØYELSE SCHEMA
                </Typography>
                <CapitalIncrease/>
                <Copyright/>
            </main>
        </React.Fragment>
    );
}
