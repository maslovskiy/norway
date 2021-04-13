import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import useStyles from "../styles";
import TextField from "@material-ui/core/TextField";
import {InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import CapitalIncreaseStaticContent from "./CapitalIncreaseStaticContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import cloneDeep from "lodash.clonedeep";

const tableHeaders = [
    'Aksjonær', 'Antall Eksisterende Aksjer', 'Antall Nye Aksjer',
    'Representert Ved', 'Andel Eksisterende Aksjer, %', 'Tegningsbeløp, NOK', 'Aksjon'
];

const shareholderInitialState = {
    name: {val: 'A', type: 'text', disabled: false},
    existingShares: {val: 10, type: 'number', disabled: false},
    addedShares: {val: 20, type: 'number', disabled: false},
    representedBy: {val: 'B', type: 'text', disabled: false},
    share: {val: 0, type: 'number', disabled: true},
    subscriptionAmount: {val: 0, type: 'number', disabled: true}
};

export default function CapitalIncreaseDistribution(props) {

    const classes = useStyles();
    const [newShareholder, setNewShareholder] = useState(shareholderInitialState);

    const [sharesMetadata, setSharesMetadata] = useState({
        sumSharesAfterIncrease: {label: 'Antall Aksjer Etter Forhøyelse', disabled: true, val: 0},
        sumExistingSharesCapital: {label: 'Sum Eksisterende Aksjekapital', disabled: true, val: 0},
        sumIncreasedSharesCapital: {label: 'Sum Økt Aksjekapital', disabled: true, val: 0},
        sumSharesCapital: {label: 'Sum Aksjekapital', disabled: true, val: 0},

        shareSubscriptionPrice: {label: 'Tegningskurs', disabled: false, val: 0},
        denomination: {label: 'Pålydende', disabled: false, val: 1},
        perMoneyValuation: {label: 'Sum Tegningsbeløp', disabled: false, val: 0},
    });

    return (
        <>
            <CapitalIncreaseStaticContent content={{
                sumSharesAfterIncrease: sharesMetadata.sumSharesAfterIncrease,
                sumExistingSharesCapital: sharesMetadata.sumExistingSharesCapital,
                sumIncreasedSharesCapital: sharesMetadata.sumIncreasedSharesCapital,
                sumSharesCapital: sharesMetadata.sumSharesCapital
            }}/>

            {Object.keys(sharesMetadata).filter(k => !sharesMetadata[k].disabled).map(key => {
                let sharesInfoElement = sharesMetadata[key];
                return (
                    <Grid item xs={12} sm={2} key={key}>
                        <InputLabel>{sharesInfoElement.label}
                            <TextField
                                fullWidth
                                className={classes.textField}
                                disabled={sharesInfoElement.disabled}
                                value={sharesInfoElement.val}
                                onChange={e => updateSharesMetadataProperty(key, e.target.valueAsNumber)}
                                type="number"
                            />
                        </InputLabel>
                    </Grid>
                )
            })}
            <Grid item xs={12} sm={6}/>

            {Object.keys(newShareholder).map((key, i) => {
                let newShareholderElement = newShareholder[key];
                return (
                    !newShareholderElement.disabled &&
                    <Grid item xs={12} sm={2} key={i}>
                        <TextField
                            label={tableHeaders[i]}
                            fullWidth
                            className={classes.textField}
                            value={newShareholderElement.val}
                            type={newShareholderElement.type}
                            onChange={(e) =>
                                newShareholderElement.type === 'number' ?
                                    updateNewShareHolder(e.target.valueAsNumber, key) :
                                    updateNewShareHolder(e.target.value, key)
                            }
                        />
                    </Grid>
                )
            })}
            <Grid item xs={12} sm={2}>
                <Button variant="contained"
                        color="primary"
                        onClick={addShareholder}
                        endIcon={<PersonAddIcon/>}>
                    Legg Til Ny Aksjeeier
                </Button>
            </Grid>
            <Grid item xs={12} sm={4}/>


            <Grid item xs={12}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {tableHeaders.map((v, i) => (
                                    <TableCell align={"left"} key={i}>
                                        <Typography component="h1" variant="h6">{v}</Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.capitalIncreaseDistribution.shareholders.map((sh, i) => (
                                <TableRow key={i}>
                                    {Object.keys(sh).map((key, j) => {
                                        let shv = sh[key];
                                        return (
                                            <TableCell align="right" key={"" + i + j}>
                                                <TextField
                                                    name={"shareHolderInfo" + i + j}
                                                    id={"shareHolderInfo" + i + j}
                                                    fullWidth
                                                    disabled={shv.disabled}
                                                    value={shv.val}
                                                    type={shv.type}
                                                    onChange={e => updateShareholder(i, key, e.target.value)}
                                                />
                                            </TableCell>
                                        )
                                    })}
                                    <TableCell align="left">
                                        <Button variant="contained"
                                                color="secondary"
                                                onClick={() => removeShareholder(i)}
                                                endIcon={<PersonAddDisabledIcon/>}>
                                            Fjern Aksjeeier
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </>
    );

    function updateSharesMetadataProperty(key, value) {
        const newSharesMetadata = {...sharesMetadata};
        newSharesMetadata[key].val = value;

        const shareholders = [...props.capitalIncreaseDistribution.shareholders];

        if (key === 'perMoneyValuation') {
            const sumOfAddedShares = calculateSumOfShares(shareholders, 'addedShares');
            if (sumOfAddedShares > 0) {
                newSharesMetadata.shareSubscriptionPrice.val = newSharesMetadata.perMoneyValuation.val / sumOfAddedShares;
            }
        }

        setSharesMetadata(newSharesMetadata);
        updateShareForAllShareholders(shareholders);
        updateSharesMetadata(shareholders);

        props.setCapitalIncreaseDistribution({
            shareholders,
            denomination: newSharesMetadata.denomination.val,
            shareSubscriptionPrice: newSharesMetadata.shareSubscriptionPrice.val,
            perMoneyValuation: newSharesMetadata.perMoneyValuation.val,
        });
    }

    function updateSharesMetadata(shareholders) {
        const sumExistingShares = calculateSumOfShares(shareholders, 'existingShares');
        const sumAddedShares = calculateSumOfShares(shareholders, 'addedShares');

        const sumSharesAfterIncrease = sumExistingShares + sumAddedShares;
        const sumExistingSharesCapital = sumExistingShares * sharesMetadata.denomination.val;
        const sumIncreasedSharesCapital = sumAddedShares * sharesMetadata.denomination.val;
        const sumSharesCapital = sumExistingSharesCapital + sumIncreasedSharesCapital;

        const perMoneyValuation = sumAddedShares * sharesMetadata.shareSubscriptionPrice.val;

        setSharesMetadata({
            ...sharesMetadata,
            ['sumSharesAfterIncrease']: {
                ...sharesMetadata['sumSharesAfterIncrease'],
                val: sumSharesAfterIncrease
            },
            ['sumExistingSharesCapital']: {
                ...sharesMetadata['sumExistingSharesCapital'],
                val: sumExistingSharesCapital
            },
            ['sumIncreasedSharesCapital']: {
                ...sharesMetadata['sumIncreasedSharesCapital'],
                val: sumIncreasedSharesCapital
            },
            ['sumSharesCapital']: {
                ...sharesMetadata['sumSharesCapital'],
                val: sumSharesCapital
            },
            ['perMoneyValuation']: {
                ...sharesMetadata['perMoneyValuation'],
                val: perMoneyValuation
            },
        })
    }

    function updateNewShareHolder(value, name) {
        setNewShareholder({...newShareholder, [name]: {...newShareholder[name], val: value}});
    }

    function addShareholder() {
        const sh = cloneDeep(newShareholder);
        let shareholders = [...props.capitalIncreaseDistribution.shareholders, sh];

        updateShareForAllShareholders(shareholders);
        updateSharesMetadata(shareholders);

        props.setCapitalIncreaseDistribution({...props.capitalIncreaseDistribution, shareholders});
        setNewShareholder(shareholderInitialState);
    }

    function removeShareholder(i) {
        const shareholders = [...props.capitalIncreaseDistribution.shareholders];
        shareholders.splice(i, 1);

        updateShareForAllShareholders(shareholders);
        updateSharesMetadata(shareholders);

        props.setCapitalIncreaseDistribution({...props.capitalIncreaseDistribution, shareholders});
    }

    function updateShareholder(idx, propName, propVal) {
        const shareholders = [...props.capitalIncreaseDistribution.shareholders];

        shareholders[idx][propName].val = shareholders[idx][propName].type === 'number' ? Number(propVal) : propVal;

        if (propName === 'existingShares' || propName === 'addedShares') {
            updateShareForAllShareholders(shareholders);
            updateSharesMetadata(shareholders);
        }

        props.setCapitalIncreaseDistribution({...props.capitalIncreaseDistribution, shareholders});
    }

    function updateShareForAllShareholders(shareholders) {
        const sumExistingShares = calculateSumOfShares(shareholders, 'existingShares');
        shareholders.forEach(v => {
            v.share.val = parseFloat((100 * v.existingShares.val / sumExistingShares).toFixed(2));
            v.subscriptionAmount.val = v.addedShares.val * sharesMetadata.shareSubscriptionPrice.val;
        });
    }

    function calculateSumOfShares(shareholders, sharesProp) {
        return shareholders
            .map(s => s[sharesProp].val)
            .reduce((a, b) => a + b, 0);
    }
}
