import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import Button from "@material-ui/core/Button";
import useStyles from "./styles";
import SendIcon from '@material-ui/icons/Send';
import BoardMeeting from "./BoardMeeting/BoardMeeting";
import InvitationToExtraordinaryMeeting from "./InvitationToExtraordinaryMeeting/InvitationToExtraordinaryMeeting";
import ExtraordinaryMeeting from "./ExtraordinaryMeeting/ExtraordinaryMeeting";
import axios from "axios";
import {BOARD_MEMBER_ROLES} from "./BoardMeeting/BoardMember";
import {format} from 'date-fns';

export const sharesSubscriptionDocuments = Object.freeze({
    PROTOCOL: {
        key: 'PROTOCOL',
        val: 'I protokollen fra generalforsamlingen'
    },
    OTHER_DOCUMENT: {
        key: 'OTHER_DOCUMENT',
        val: 'På et særskilt tegningsdokument med frist for tegning'
    },
});

export const sharesPaymentAccountTypes = Object.freeze({
    ISSUE_ACCOUNT: {
        key: 'ISSUE_ACCOUNT',
        val: 'Særskilte emisjonskonto med kontonummer'
    },
    BANK_ACCOUNT: {
        key: 'BANK_ACCOUNT',
        val: 'Bankkonto med kontonummer'
    },
});

export const DATE_FORMAT = "dd.MM.yyyy";
export const TIME_FORMAT = "HH:mm";


export default function CapitalIncrease() {
    const classes = useStyles();

    const [companyName, setCompanyName] = useState('');

    const [boardMeeting, setBoardMeeting] = useState({
        date: new Date(),
        place: '',
        boardMembers: [],
        reasonForCapitalIncrease: '',
        decisions: 'Alle beslutninger var enstemmige',
    });

    const [extraordinaryMeetingInvitation, setExtraordinaryMeetingInvitation] = useState({
        date: new Date(),
        time: new Date(),
        place: '',
        dateForSendingInvitation: new Date(),
        boardHead: '',
    });

    const [extraordinaryMeeting, setExtraordinaryMeeting] = useState({
        whoOpensMeeting: '',
        meetingManager: '',
        coSigner: '',
        sharesSubscriptionDocument: sharesSubscriptionDocuments.PROTOCOL.key,
        sharesSubscriptionDeadline: new Date(),
        paymentDeadline: 0,
        sharesPaymentAccountType: sharesPaymentAccountTypes.ISSUE_ACCOUNT.key,
        sharesPaymentAccountNumber: '',
        capitalIncreaseExpenses: 0,
        paragraphInStatute: '',
        newParagraphInStatute: '',
        capitalIncreaseDistribution: {
            shareSubscriptionPrice: 0,
            denomination: 1,
            perMoneyValuation: 0,
            shareholders: [],
        },
    });

    function prepareResolutionPart() {
        const shareholders = extraordinaryMeeting.capitalIncreaseDistribution.shareholders;
        const sumOfAddedShares = calcSumByProp(shareholders, "addedShares");
        return {
            sumOktAksjekapital: sumOfAddedShares * extraordinaryMeeting.capitalIncreaseDistribution.denomination,
            sumAntallNyeAkser: sumOfAddedShares,
            palydende: extraordinaryMeeting.capitalIncreaseDistribution.denomination,
            sumAksjeinnskudd: extraordinaryMeeting.capitalIncreaseDistribution.perMoneyValuation,
            tegningskurs: extraordinaryMeeting.capitalIncreaseDistribution.shareSubscriptionPrice,
            navn: calcBeneficiaries(extraordinaryMeeting.capitalIncreaseDistribution),
            tegningsfrist: calcSharesSubscriptionDocument(extraordinaryMeeting),
            antallDager: extraordinaryMeeting.paymentDeadline,
            ktoNr: calcSharesPaymentAccountType(extraordinaryMeeting),
            utgifterTilKapitalforhoyelsen: extraordinaryMeeting.capitalIncreaseExpenses,
            vedtektsparagraf: extraordinaryMeeting.paragraphInStatute,
            nyVedtektsbestemmelse: extraordinaryMeeting.newParagraphInStatute,
        }
    }

    function downloadProtocolFromBoardMeeting() {
        const request = {
            selskapsnavn: companyName,
            stedForStyremote: boardMeeting.place,
            datoForStyremote: format(boardMeeting.date, DATE_FORMAT),
            participantsList: calcMeetingParticipants(boardMeeting),

            navngiToStyremedlemmer: ifLessThan4PersonsAttended(boardMeeting),
            angiBeskrivelse: boardMeeting.reasonForCapitalIncrease,

            ...prepareResolutionPart(),

            alleBeslutninger: boardMeeting.decisions,
            participantDtos: calcSigningMembers(boardMeeting),
            vedlegg1Table: calcCapitalIncrease(extraordinaryMeeting),
        }

        axios.post(`/document/styreprotokoll-kontantemisjon/doc`, request,
            {responseType: 'blob'})
            .then(response => {
                const type = response.headers['content-type']
                const blob = new Blob([response.data], {type: type, encoding: 'UTF-8'})
                const link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = "Protokoll Fra Styremøte.docx"
                link.click()
            });
    }

    function downloadInvitationToExtraordinaryMeeting() {
        const request = {
            selskapsnavn: companyName,
            datoForGeneralforsamling: format(extraordinaryMeetingInvitation.date, DATE_FORMAT),
            klokkeslettForGeneralforsamling: format(extraordinaryMeetingInvitation.time, TIME_FORMAT),
            stedForGeneralforsamling: extraordinaryMeetingInvitation.place,
            angiBeskrivelse: boardMeeting.reasonForCapitalIncrease,

            ...prepareResolutionPart(),

            datoForUtsendelse: format(extraordinaryMeetingInvitation.dateForSendingInvitation, DATE_FORMAT),
            navnPaStyreleder: extraordinaryMeetingInvitation.boardHead,
        }

        axios.post(`/document/innkalling-egf-kontantemisjon/doc`, request,
            {responseType: 'blob'})
            .then(response => {
                const type = response.headers['content-type']
                const blob = new Blob([response.data], {type: type, encoding: 'UTF-8'})
                const link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = "Innkalling Til Ekstraordinær Generalforsamling.docx"
                link.click()
            });
    }

    function downloadProtocolForExtraordinaryMeeting() {
        const request = {
            selskapsnavn: companyName,
            stedForGeneralforsamling: extraordinaryMeetingInvitation.place,
            datoForGeneralforsamling: format(extraordinaryMeetingInvitation.date, DATE_FORMAT),
            andel: calcSumByProp(extraordinaryMeeting.capitalIncreaseDistribution.shareholders, "share"),
            navnPaStyreleder: extraordinaryMeeting.whoOpensMeeting,
            moteleder: extraordinaryMeeting.meetingManager,
            medundertegner: extraordinaryMeeting.coSigner,

            ...prepareResolutionPart(),

            sted: extraordinaryMeetingInvitation.place,
            dato: format(extraordinaryMeetingInvitation.date, DATE_FORMAT),
            navnMoteleder: extraordinaryMeeting.meetingManager,
            navnPaMedundertegner: extraordinaryMeeting.coSigner,

            vedlegg1Table: calcExistingShareholders(extraordinaryMeeting),
            vedlegg2Table: calcCapitalIncrease(extraordinaryMeeting),
        }

        axios.post(`/document/egf-protokoll-kontantemisjon/doc`, request,
            {responseType: 'blob'})
            .then(response => {
                const type = response.headers['content-type']
                const blob = new Blob([response.data], {type: type, encoding: 'UTF-8'})
                const link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = "Protokoll Fra Ekstraordinær Generalforsamling.docx"
                link.click()
            });
    }

    function ifLessThan4PersonsAttended(meeting) {
        if (meeting.boardMembers.length > 4) {
            const membersWithSignatureRight = meeting.boardMembers.filter(m => m.willSign).map(m => m.name).join(", ");
            return `Styret besluttet at ${membersWithSignatureRight} skal signere protokollen fra styremøtet`
        }
        return "";
    }

    function calcSigningMembers(meeting) {
        const sorted = meeting.boardMembers
            .sort((a, b) => {
                return BOARD_MEMBER_ROLES.indexOf(a.role) - BOARD_MEMBER_ROLES.indexOf(b.role)
            })
        const membersWithSignatureRight = sorted.length > 4 ? sorted.filter(m => m.willSign) : sorted;
        return membersWithSignatureRight.map(m => ({role: m.role, fullName: m.name}));
    }

    function calcSumByProp(shareholders, prop) {
        return shareholders
            .map(s => s[prop].val)
            .reduce((a, b) => a + b, 0);
    }

    function calcBeneficiaries(capitalIncreaseDistribution) {
        const shareholdersWithNewShares = capitalIncreaseDistribution.shareholders.filter(s => s.addedShares > 0);
        return shareholdersWithNewShares.length === 1
            ?
            shareholdersWithNewShares[0].name.val
            :
            " de personer, og med den fordeling som fremkommer av Vedlegg 2 til generalforsamlingsprotokollen";
    }

    function calcSharesSubscriptionDocument(meeting) {
        return meeting.sharesSubscriptionDocument === sharesSubscriptionDocuments.PROTOCOL.key
            ?
            sharesSubscriptionDocuments.PROTOCOL.val
            :
            sharesSubscriptionDocuments.OTHER_DOCUMENT.val + meeting.sharesSubscriptionDeadline;
    }

    function calcSharesPaymentAccountType(meeting) {
        const accountType = meeting.sharesPaymentAccountType === sharesPaymentAccountTypes.ISSUE_ACCOUNT.key
            ?
            sharesPaymentAccountTypes.ISSUE_ACCOUNT.val
            :
            sharesPaymentAccountTypes.BANK_ACCOUNT.val;
        return accountType + " " + meeting.sharesPaymentAccountNumber;
    }

    function calcMeetingParticipants(meeting) {
        return meeting.boardMembers
            .sort((a, b) => {
                return BOARD_MEMBER_ROLES.indexOf(a.role) - BOARD_MEMBER_ROLES.indexOf(b.role)
            })
            .map(m => `${m.name} (${m.role})`)
    }

    function calcCapitalIncrease(meeting) {
        const shareholders = meeting.capitalIncreaseDistribution.shareholders;
        const sumOfAddedShares = calcSumByProp(shareholders, "addedShares");

        const members = shareholders
            .filter(s => s.addedShares.val > 0)
            .map(s => ({
                aksjetegnere: s.name.val,
                nyeAksjer: s.addedShares.val,
                tegningsbelop: s.addedShares.val * meeting.capitalIncreaseDistribution.shareSubscriptionPrice
            }))
        members.push({
            aksjetegnere: "SUM",
            nyeAksjer: sumOfAddedShares,
            tegningsbelop: sumOfAddedShares * meeting.capitalIncreaseDistribution.shareSubscriptionPrice
        })
        return members
    }

    function calcExistingShareholders(meeting) {
        const shareholders = meeting.capitalIncreaseDistribution.shareholders;
        const sumOfExistingShares = calcSumByProp(shareholders, "existingShares");
        debugger
        const sumOfRepresentedShare = calcSumByProp(shareholders, "share");

        const members = shareholders
            .filter(s => s.existingShares.val > 0)
            .map(s => ({
                aksjonar: s.name.val,
                antallAksjer: s.existingShares.val,
                andel: s.share.val,
                representertVed: s.representedBy.val
            }))
        members.push({
            aksjonar: "SUM",
            antallAksjer: sumOfExistingShares,
            andel: sumOfRepresentedShare,
            representertVed: "",
        })
        return members
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>

            <Grid container spacing={4}>

                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        label="Selskapsnavn"
                        className={classes.textField}
                        value={companyName}
                        onChange={e => setCompanyName(e.target.value)}
                    />
                </Grid>

                <BoardMeeting boardMeeting={boardMeeting} setBoardMeeting={setBoardMeeting}/>

                <InvitationToExtraordinaryMeeting
                    extraordinaryMeetingInvitation={extraordinaryMeetingInvitation}
                    setExtraordinaryMeetingInvitation={setExtraordinaryMeetingInvitation}/>

                <ExtraordinaryMeeting
                    extraordinaryMeeting={extraordinaryMeeting}
                    setExtraordinaryMeeting={setExtraordinaryMeeting}
                />

            </Grid>

            <Button variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<SendIcon/>}
                    onClick={downloadProtocolFromBoardMeeting}>
                Hent Protokoll Fra Styremøte
            </Button>

            <Button variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<SendIcon/>}
                    onClick={downloadInvitationToExtraordinaryMeeting}>
                Hent Innkalling Til Ekstraordinær Generalforsamling
            </Button>

            <Button variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<SendIcon/>}
                    onClick={downloadProtocolForExtraordinaryMeeting}>
                Hent Protokoll Fra Ekstraordinær Generalforsamling
            </Button>
        </MuiPickersUtilsProvider>
    );
}
