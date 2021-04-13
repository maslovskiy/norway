import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import React from "react";
import useStyles from "../document-templates/capitalIncrease/styles";
import logo from '../logo.png';

export default function TopMenu() {
    const classes = useStyles();
    return (
        <AppBar position="absolute" color="default" className={classes.appBar}>
            <Toolbar>
                <img src={logo} alt="logo" className={classes.logo}/>
            </Toolbar>
        </AppBar>
    );
}
