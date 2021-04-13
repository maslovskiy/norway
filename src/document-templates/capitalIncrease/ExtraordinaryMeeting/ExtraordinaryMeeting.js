import React from 'react';
import Grid from "@material-ui/core/Grid";
import useStyles from "../styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@material-ui/core";
import {sharesPaymentAccountTypes, sharesSubscriptionDocuments} from "../CapitalIncrease";
import {KeyboardDatePicker} from "@material-ui/pickers";
import CapitalIncreaseDistribution from "./CapitalIncreaseDistribution";

export default function ExtraordinaryMeeting(props) {

    const classes = useStyles();

    function handleChange(key, value) {
        props.setExtraordinaryMeeting({...props.extraordinaryMeeting, [key]: value});
    }

    function setCapitalIncreaseDistribution(value) {
        handleChange('capitalIncreaseDistribution', value);
    }

    return (
        <>
            <Grid item xs={12}>
                <Typography component="h2" variant="h5" align="center">
                    PROTOKOLL FRA EKSTRAORDINÆR GENERALFORSAMLING
                </Typography>
            </Grid>

            <Grid item xs={12} sm={2}>
                <TextField
                    label="Hvem Åpner Generalforsamling"
                    fullWidth
                    className={classes.textField}
                    value={props.extraordinaryMeeting.whoOpensMeeting}
                    onChange={e => handleChange('whoOpensMeeting', e.target.value)}
                />
            </Grid>

            <Grid item xs={12} sm={2}>
                <TextField
                    label="Møteleder"
                    fullWidth
                    className={classes.textField}
                    value={props.extraordinaryMeeting.meetingManager}
                    onChange={e => handleChange('meetingManager', e.target.value)}
                />
            </Grid>

            <Grid item xs={12} sm={2}>
                <TextField
                    label="Medundertegner"
                    fullWidth
                    className={classes.textField}
                    value={props.extraordinaryMeeting.coSigner}
                    onChange={e => handleChange('coSigner', e.target.value)}
                />
            </Grid>

            <Grid item xs={12} sm={6}/>

            <CapitalIncreaseDistribution
                capitalIncreaseDistribution={props.extraordinaryMeeting.capitalIncreaseDistribution}
                setCapitalIncreaseDistribution={setCapitalIncreaseDistribution}
            />

            <Grid item xs={12} sm={4}>
                <FormControl component="fieldset">
                    <FormLabel>Aksjene skal tegnes</FormLabel>
                    <RadioGroup aria-label="Aksjene skal tegnes"
                                value={props.extraordinaryMeeting.sharesSubscriptionDocument}
                                onChange={(e) => handleChange('sharesSubscriptionDocument', e.target.value)}>
                        <FormControlLabel value={sharesSubscriptionDocuments.PROTOCOL.key}
                                          control={<Radio/>}
                                          label={sharesSubscriptionDocuments.PROTOCOL.val}/>
                        <FormControlLabel value={sharesSubscriptionDocuments.OTHER_DOCUMENT.key}
                                          control={<Radio/>}
                                          label={sharesSubscriptionDocuments.OTHER_DOCUMENT.val}/>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            label="Tegningsfrist"
                            className={classes.datePicker}
                            value={props.extraordinaryMeeting.sharesSubscriptionDeadline}
                            onChange={val => handleChange('sharesSubscriptionDeadline', val)}
                            KeyboardButtonProps={{
                                'aria-label': 'Tegningsfrist',
                            }}
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={8}/>

            <Grid item xs={12} sm={2}>
                <TextField
                    label="Frist For Betaling, dager"
                    type={"number"}
                    fullWidth
                    className={classes.textField}
                    value={props.extraordinaryMeeting.paymentDeadline}
                    onChange={e => handleChange('paymentDeadline', e.target.value)}
                />
            </Grid>
            <Grid item xs={12} sm={10}/>

            <Grid item xs={12} sm={4}>
                <FormControl component="fieldset">
                    <FormLabel>Betaling skal skje til selskapets</FormLabel>
                    <RadioGroup aria-label="Aksjene skal tegnes"
                                value={props.extraordinaryMeeting.sharesPaymentAccountType}
                                onChange={(e) => handleChange('sharesPaymentAccountType', e.target.value)}>
                        <FormControlLabel value={sharesPaymentAccountTypes.ISSUE_ACCOUNT.key}
                                          control={<Radio/>}
                                          label={sharesPaymentAccountTypes.ISSUE_ACCOUNT.val}/>
                        <FormControlLabel value={sharesPaymentAccountTypes.BANK_ACCOUNT.key}
                                          control={<Radio/>}
                                          label={sharesPaymentAccountTypes.BANK_ACCOUNT.val}/>
                        <TextField
                            label="Kontonummer"
                            fullWidth
                            className={classes.textField}
                            value={props.extraordinaryMeeting.sharesPaymentAccountNumber}
                            onChange={e => handleChange('sharesPaymentAccountNumber', e.target.value)}
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={8}/>

            <Grid item xs={12} sm={2}>
                <TextField
                    label="Utgifter til kapitalforhøyelsen, NOK"
                    fullWidth
                    type={"number"}
                    className={classes.textField}
                    value={props.extraordinaryMeeting.capitalIncreaseExpenses}
                    onChange={e => handleChange('capitalIncreaseExpenses', e.target.value)}
                />
            </Grid>
            <Grid item xs={12} sm={2}>
                <TextField
                    label="Vedtektsparagraf"
                    fullWidth
                    className={classes.textField}
                    value={props.extraordinaryMeeting.paragraphInStatute}
                    onChange={e => handleChange('paragraphInStatute', e.target.value)}
                />
            </Grid>
            <Grid item xs={12} sm={8}>
                <TextField
                    label="Ny Vedtektsbestemmelse"
                    fullWidth
                    multiline={true}
                    className={classes.textField}
                    value={props.extraordinaryMeeting.newParagraphInStatute}
                    onChange={e => handleChange('newParagraphInStatute', e.target.value)}
                />
            </Grid>


        </>
    )
}
