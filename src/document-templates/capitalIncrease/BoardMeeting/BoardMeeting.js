import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {KeyboardDatePicker} from '@material-ui/pickers';
import useStyles from "../styles";
import BoardMembers from "./BoardMembers";
import Typography from "@material-ui/core/Typography";


export default function BoardMeeting(props) {
    const classes = useStyles();

    function handleChange(key, value) {
        props.setBoardMeeting({...props.boardMeeting, [key]: value});
    }

    function setBoardMembers(newBoardMembers) {
        handleChange('boardMembers', newBoardMembers);
    }

    return (
        <>
            <Grid item xs={12}>
                <Typography component="h2" variant="h5" align="center">
                    PROTOKOLL FRA STYREMØTE
                </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    label="Dato For Styremøte"
                    className={classes.datePicker}
                    value={props.boardMeeting.date}
                    onChange={val => handleChange('date', val)}
                    KeyboardButtonProps={{
                        'aria-label': 'Dato For Styremøte',
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={10}>
                <TextField
                    id="boardMeetingPlace"
                    name="boardMeetingPlace"
                    label="Sted For Styremøte"
                    fullWidth
                    className={classes.textField}
                    value={props.boardMeeting.place}
                    onChange={e => handleChange('place', e.target.value)}
                />
            </Grid>

            <BoardMembers boardMembers={props.boardMeeting.boardMembers} setBoardMembers={setBoardMembers}/>

            <Grid item xs={12}>
                <TextField
                    id="reasonForCapitalIncrease"
                    name="reasonForCapitalIncrease"
                    label="Bakgrunn For Kapitalforhøyelse"
                    fullWidth
                    multiline={true}
                    className={classes.textField}
                    value={props.boardMeeting.reasonForCapitalIncrease}
                    onChange={e => handleChange('reasonForCapitalIncrease', e.target.value)}
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    id="decisions"
                    name="decisions"
                    label="Beslutninger"
                    fullWidth
                    multiline={true}
                    className={classes.textField}
                    value={props.boardMeeting.decisions}
                    onChange={e => handleChange('decisions', e.target.value)}
                />
            </Grid>
        </>
    )
}
