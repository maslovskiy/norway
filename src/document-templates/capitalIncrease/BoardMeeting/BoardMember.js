import React from 'react';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import {Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select} from "@material-ui/core";
import useStyles from "../styles";

export const BOARD_MEMBER_ROLES = ['Styreleder', 'Styremedlem', 'Varamedlem'];

export default function BoardMember(props) {

    const classes = useStyles();

    return (
        <>
            <Grid item xs={12} sm={3}>
                <TextField
                    label="Styremedlem"
                    fullWidth
                    value={props.member.name}
                    onChange={(e) => props.handleChange(e.target.value, 'name', props.idx)}
                />
            </Grid>

            <Grid item xs={12} sm={1}>
                <FormControl>
                    <InputLabel shrink>
                        Rolle
                    </InputLabel>
                    <Select
                        value={props.member.role}
                        fullWidth
                        className={classes.textField}
                        onChange={(e) => props.handleChange(e.target.value, 'role', props.idx)}
                    >
                        {BOARD_MEMBER_ROLES.map(role => (
                            <MenuItem value={role} key={role}>{role}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
                <FormControlLabel
                    className={classes.textField}
                    control={
                        <Checkbox
                            checked={props.member.willSign}
                            onChange={(e) => props.handleChange(e.target.checked, 'willSign', props.idx)}
                            color="primary"
                        />
                    }
                    label="Skal signere"
                />

                {props.button}

            </Grid>

            <Grid item xs={12} sm={4}/>
        </>
    )
}
