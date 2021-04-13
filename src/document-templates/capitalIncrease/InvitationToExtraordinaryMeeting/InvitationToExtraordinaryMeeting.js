import React from 'react';
import Grid from "@material-ui/core/Grid";
import useStyles from "../styles";
import Typography from "@material-ui/core/Typography";
import {KeyboardDatePicker, KeyboardTimePicker} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";

export default function InvitationToExtraordinaryMeeting(props) {

    const classes = useStyles();

    function handleChange(key, value) {
        props.setExtraordinaryMeetingInvitation({...props.extraordinaryMeetingInvitation, [key]: value});
    }

    return (
        <>
            <Grid item xs={12}>
                <Typography component="h2" variant="h5" align="center">
                    INNKALLING TIL EKSTRAORDINÆR GENERALFORSAMLING
                </Typography>
            </Grid>

            <Grid item xs={12} sm={2}>
                <KeyboardDatePicker
                    disableToolbar
                    fullWidth
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    label="Dato For Generalforsamling"
                    className={classes.datePicker}
                    value={props.extraordinaryMeetingInvitation.date}
                    onChange={val => handleChange('date', val)}
                    KeyboardButtonProps={{
                        'aria-label': 'Dato For Generalforsamling',
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={2}>
                <KeyboardTimePicker
                    fullWidth
                    ampm={false}
                    variant="inline"
                    label="Klokkeslett For Generalforsamling"
                    className={classes.textField}
                    value={props.extraordinaryMeetingInvitation.time}
                    onChange={val => handleChange('time', val)}
                />
            </Grid>

            <Grid item xs={12} sm={8}>
                <TextField
                    label="Sted For Generalforsamling"
                    fullWidth
                    className={classes.textField}
                    value={props.extraordinaryMeetingInvitation.place}
                    onChange={e => handleChange('place', e.target.value)}
                />
            </Grid>

            <Grid item xs={12} sm={2}>
                <KeyboardDatePicker
                    disableToolbar
                    fullWidth
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    label="Dato For Utsendelse Av Innkalling"
                    className={classes.datePicker}
                    value={props.extraordinaryMeetingInvitation.dateForSendingInvitation}
                    onChange={val => handleChange('dateForSendingInvitation', val)}
                    KeyboardButtonProps={{
                        'aria-label': 'Dato For Utsendelse Av Innkalling',
                    }}
                />
            </Grid>

            <Grid item xs={12} sm={2}>
                <TextField
                    label="Styreleder"
                    fullWidth
                    className={classes.textField}
                    value={props.extraordinaryMeetingInvitation.boardHead}
                    onChange={e => handleChange('boardHead', e.target.value)}
                />
            </Grid>

            <Grid item xs={12} sm={8}>
            </Grid>

        </>
    )
}
