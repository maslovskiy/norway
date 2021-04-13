import React from 'react';
import Grid from "@material-ui/core/Grid";
import useStyles from "../styles";
import TextField from "@material-ui/core/TextField";
import {InputLabel} from "@material-ui/core";

export default function CapitalIncreaseStaticContent(props) {
    const classes = useStyles();
    return (
        <>
            {Object.keys(props.content).map(key => {
                let sharesInfoElement = props.content[key];
                return (
                    <Grid item xs={12} sm={2} key={key}>
                        <InputLabel>{sharesInfoElement.label}
                            <TextField
                                required
                                fullWidth
                                className={classes.textField}
                                disabled={true}
                                value={sharesInfoElement.val}
                            />
                        </InputLabel>
                    </Grid>
                )
            })}
            <Grid item xs={12} sm={4}/>
        </>
    )
}