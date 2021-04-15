import React, {useEffect, useState} from 'react';
import {
  Box,
  Divider,
  Grid,
  IconButton,
  TextField as MaterialTextField
} from "@material-ui/core";
import {Field} from "react-final-form";
import {OnChange} from 'react-final-form-listeners'
import {makeStyles} from "@material-ui/core/styles";
import ReactTable from "../../../../components/ReactTable";
import User from "../../../../components/Icons/User";
import AddIcon from "@material-ui/icons/Add";
import FormSection from "../../components/FormSection";
import TextField from "../../components/Inputs/TextField";
import Radio from "../../components/Inputs/Radio";
import RadioGroupWrapper from "../../components/RadioGroupWrapper";
import DatePicker from "../../components/Inputs/DatePicker";

const useStyles = makeStyles(() => ({
  divider: {
    margin: "30px 0 40px"
  },
  subtitle: {
    fontWeight: "600",
    fontSize: "18px",
    lineHeight: "32px",
    marginBottom: 0
  },
  subSubmit: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    bottom: "-10px"
  },
  subSubmitBtn: {
    backgroundColor: "#49575E",
    color: "#F6F4F0",
    width: 32,
    height: 32,
    "&:hover": {
      backgroundColor: "rgba(73,87,94, 0.7)",
    },
    "& svg": {
      width: 20,
      height: 20
    }
  },
  mb25: {
    marginBottom: 25
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    height: "100%",
    "& button": {
      marginLeft: 40
    }
  },
  bottomAligned: {
    minHeight: "100%",
    display: "flex",
    alignItems: "flex-end"
  }
}));

const EditableCell = ({value: initialValue, row: {index}, column, updateMyData}) => {
  const [value, setValue] = React.useState(initialValue);
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue]);

  if (column.editable) {
    const onChange = e => updateMyData(index, column.id, e.target.value)
    switch (column.id) {
      default:
        return <MaterialTextField value={value} type={column.type || "text"} onChange={onChange}/>
    }
  } else {
    return <div>{initialValue}</div>
  }
}

const defaultColumn = {
  Cell: EditableCell,
}

const ExtraordinaryGeneralMeeting = ({onClick, data, setTableValues, values, change}) => {

  const columns = [
    {
      Header: 'Shareholder',
      accessor: 'shareholder',
      editable: true
    },
    {
      Header: '# existing shares',
      accessor: 'existing_shares',
      editable: true,
      type: "number"
    },
    {
      Header: '# new shares',
      accessor: 'new_shares',
      editable: true,
      type: "number"
    },
    {
      Header: 'represented with',
      accessor: 'represented_with',
      editable: true
    },
    {
      Header: '% shares',
      accessor: 'shares',
      type: "number"
    },
    {
      Header: 'subscription amount',
      accessor: 'subscription_amount',
      type: "number"
    },
    {
      Header: 'Action',
      accessor: 'action',
      editable: true,
      Cell: ({row, data}) => {
        return (
          <div onClick={() => {
            const filtered = data.filter((val, index) => index !== row.index)
            setTableValues(filtered)
          }}>
            <User/>
          </div>
        )
      }
    },

  ];

  const classes = useStyles();

  const [updatedData, setUpdatedData] = useState(data);

  useEffect(() => {

    const {number_of_shares_before_increase = 0, denomination, drawing_course} = values;


    const total_existing_share_capital = parseFloat(number_of_shares_before_increase) * parseFloat(denomination);

    const calculateShares = (existing_shares, number_of_shares_before_increase) => {
      const value = parseFloat(existing_shares) / parseFloat(number_of_shares_before_increase);
      return isNaN(value) ? "" : value.toFixed(2)
    }

    const calculateSubscriptionAmount = (new_shares, drawing_course) => {
      const value = parseFloat(new_shares) * parseFloat(drawing_course);
      return isNaN(value) ? "" : value.toFixed(2)
    }

    const number_of_new_shares = data.map(el => el.new_shares ? parseFloat(el.new_shares) : 0).reduce((acc, val) => acc + val);

    const updated = data.map(el => {
      return {
        ...el,
        "shares": calculateShares(el.existing_shares, number_of_shares_before_increase),
        "subscription_amount": calculateSubscriptionAmount(el.new_shares, drawing_course),
      }
    });

    change("number_of_new_shares", number_of_new_shares.toFixed(2));
    change("total_existing_share_capital", total_existing_share_capital.toFixed(2));
    console.log(updated)

    setUpdatedData(updated);
  }, [data])

  useEffect(() => {
    const {number_of_shares_before_increase = 0, drawing_course, denomination, number_of_new_shares} = values;

    const total_existing_share_capital = parseFloat(number_of_shares_before_increase) * parseFloat(denomination);
    const sum_increased_share_capital = parseFloat(number_of_new_shares) * parseFloat(denomination)

    const calculateShares = (existing_shares, number_of_shares_before_increase) => {
      const value = parseFloat(existing_shares) / parseFloat(number_of_shares_before_increase);
      return isNaN(value) ? "" : value.toFixed(2)
    }

    const calculateSubscriptionAmount = (new_shares, drawing_course) => {
      const value = parseFloat(new_shares) * parseFloat(drawing_course);
      return isNaN(value) ? "" : value.toFixed(2)
    }


    const updated = data.map(el => {
      return {
        ...el,
        "shares": calculateShares(el.existing_shares, number_of_shares_before_increase),
        "subscription_amount": calculateSubscriptionAmount(el.new_shares, drawing_course),
      }
    });

    change("total_existing_share_capital", total_existing_share_capital.toFixed(2));
    change("sum_increased_share_capital", sum_increased_share_capital.toFixed(2));

    setUpdatedData(updated);
  }, [values])

  return (
    <FormSection title={"Protokoll Ekstraordinær Generalforsamling"}>
      <Grid container spacing={3}>
        {/*<Grid item xs={12}>*/}
        {/*  <Grid container spacing={3}>*/}
        {/*    <Grid item xs={4}>*/}
        {/*      <Field*/}
        {/*        name="hvem_åpner_generalforsamling"*/}
        {/*        component={TextField}*/}
        {/*        type="text"*/}
        {/*        label="Hvem åpner generalforsamling"*/}
        {/*      />*/}
        {/*    </Grid>*/}
        {/*    <Grid item xs={4}>*/}
        {/*      <Field*/}
        {/*        name="møteleder"*/}
        {/*        component={TextField}*/}
        {/*        type="text"*/}
        {/*        label="Møteleder"*/}
        {/*      />*/}
        {/*    </Grid>*/}
        {/*    <Grid item xs={4}>*/}
        {/*      <Field*/}
        {/*        name="medundertegner"*/}
        {/*        component={TextField}*/}
        {/*        type="text"*/}
        {/*        label="Medundertegner"*/}
        {/*      />*/}
        {/*    </Grid>*/}
        {/*  </Grid>*/}
        {/*</Grid>*/}
        {/*<Grid item xs={12}>*/}
        {/*  <h2 className={classes.subtitle}>Kapitalforhøyelse</h2>*/}
        {/*</Grid>*/}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={5}>
              <Field
                name="number_of_shares_before_increase"
                component={TextField}
                type="number"
                label="Number of Shares Before Increase"
              />
            </Grid>
            <Grid item xs={5}>
              <Field
                name="total_existing_share_capital"
                component={TextField}
                type="text"
                label="Total Existing Share Capital"
                disabled
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={5}>
              <Field
                name="number_of_new_shares"
                component={TextField}
                type="text"
                label="Number of New Shares"
                disabled
              />
            </Grid>
            <Grid item xs={5}>
              <Field
                name="sum_increased_share_capital"
                component={TextField}
                type="text"
                label="sum increased share capital"
                disabled
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={5}>
              <Field
                name="Antall Aksjer Etter Forhøyelse"
                component={TextField}
                type="text"
                label="Antall Aksjer Etter Forhøyelse"
                disabled
              />
            </Grid>
            <Grid item xs={5}>
              <Field
                name="Sum Aksjekapital"
                component={TextField}
                type="text"
                label="Sum Aksjekapital"
                disabled
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Field
                name="drawing_course"
                component={TextField}
                type="text"
                label="Drawing course
"
              />
            </Grid>
            <Grid item xs={3}>
              <Field
                name="denomination"
                component={TextField}
                type="text"
                label="Denomination"
              />
            </Grid>
            <Grid item xs={3}>
              <Field
                name="Sum Tegningsbeløp"
                component={TextField}
                type="text"
                label="Sum Tegningsbeløp"
                disabled
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider className={classes.divider}/>
      <Grid item xs={12}>
        <Grid container spacing={3} className={classes.mb25}>
          <Grid item xs={2}>
            <Field
              name="aksjonær"
              component={TextField}
              type="text"
              label="Aksjonære"
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="eksisterende_aksjer"
              component={TextField}
              type="text"
              label="# Eksisterende Aksjer"
            />
          </Grid>
          <Grid item xs={2}>
            <Field
              name="nye_aksjer"
              component={TextField}
              type="text"
              label="# Nye Aksjer"
            />
          </Grid>
          <Grid item xs={4}>
            <Box className={classes.buttonWrapper}>
              <Field
                name="representert_ved"
                component={TextField}
                type="text"
                label="Representert Ved"
              />
              <IconButton className={classes.subSubmitBtn} onClick={onClick}>
                <AddIcon/>
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <ReactTable
          data={updatedData}
          columns={columns}
          defaultColumn={defaultColumn}
          setTableValues={setTableValues}
        />
      </Grid>
      {/*<Grid item xs={12} className={classes.mb25}>*/}
      {/*  <Grid container>*/}
      {/*    <Grid item xs={7}>*/}
      {/*      <RadioGroupWrapper title="Aksjene skal tegnes">*/}
      {/*        <Field*/}
      {/*          name="radio1"*/}
      {/*          component={Radio}*/}
      {/*          type="radio"*/}
      {/*          value="I protokollen fra generalforsamlingen"*/}
      {/*          label="I protokollen fra generalforsamlingen"*/}
      {/*        />*/}
      {/*        <Field*/}
      {/*          name="radio1"*/}
      {/*          component={Radio}*/}
      {/*          type="radio"*/}
      {/*          value="På et særskilt tegningsdokument med frist for tegning"*/}
      {/*          label="På et særskilt tegningsdokument med frist for tegning"*/}
      {/*        />*/}
      {/*      </RadioGroupWrapper>*/}
      {/*    </Grid>*/}
      {/*    <Grid item xs={5} className={classes.bottomAligned}>*/}
      {/*      <Field*/}
      {/*        name="Tegningsfrist"*/}
      {/*        component={DatePicker}*/}
      {/*        label="Tegningsfrist"*/}
      {/*      />*/}
      {/*    </Grid>*/}
      {/*  </Grid>*/}
      {/*</Grid>*/}

      {/*<Grid item xs={4}>*/}
      {/*  <Field*/}
      {/*    name="frist_for_betaling_dager"*/}
      {/*    component={TextField}*/}
      {/*    type="text"*/}
      {/*    label="Frist for betaling, dager"*/}
      {/*  />*/}
      {/*</Grid>*/}

      {/*<Grid item xs={12}>*/}
      {/*  <Grid container>*/}
      {/*    <Grid item xs={7}>*/}
      {/*      <RadioGroupWrapper title="Aksjene skal tegnes">*/}
      {/*        <Field*/}
      {/*          name="radio2"*/}
      {/*          component={Radio}*/}
      {/*          type="radio"*/}
      {/*          value="Særskilte emisjonskonto med kontonummer"*/}
      {/*          label="Særskilte emisjonskonto med kontonummer"*/}
      {/*        />*/}
      {/*        <Field*/}
      {/*          name="radio2"*/}
      {/*          component={Radio}*/}
      {/*          type="radio"*/}
      {/*          value="Bankkonto med kontonummer "*/}
      {/*          label="Bankkonto med kontonummer "*/}
      {/*        />*/}
      {/*      </RadioGroupWrapper>*/}
      {/*    </Grid>*/}
      {/*  </Grid>*/}
      {/*</Grid>*/}

      {/*<Grid item xs={12}>*/}
      {/*  <Grid item xs={4} className={classes.mb25}>*/}
      {/*    <Field*/}
      {/*      name="Kontonummer"*/}
      {/*      component={TextField}*/}
      {/*      type="text"*/}
      {/*      label="Kontonummer"*/}
      {/*    />*/}
      {/*  </Grid>*/}
      {/*  <Grid item xs={4} className={classes.mb25}>*/}
      {/*    <Field*/}
      {/*      name="Utgifter til kapitalforhøyelsen, NOK"*/}
      {/*      component={TextField}*/}
      {/*      type="text"*/}
      {/*      label="Utgifter til kapitalforhøyelsen, NOK"*/}
      {/*    />*/}
      {/*  </Grid>*/}
      {/*  <Grid item xs={4} className={classes.mb25}>*/}
      {/*    <Field*/}
      {/*      name="Vedtektsparagraf"*/}
      {/*      component={TextField}*/}
      {/*      type="text"*/}
      {/*      label="Vedtektsparagraf"*/}
      {/*    />*/}
      {/*  </Grid>*/}
      {/*  <Grid item xs={4} className={classes.mb25}>*/}
      {/*    <Field*/}
      {/*      name="Ny Vedtektsparagraf"*/}
      {/*      component={TextField}*/}
      {/*      type="text"*/}
      {/*      label="Ny Vedtektsparagraf"*/}
      {/*    />*/}
      {/*  </Grid>*/}
      {/*</Grid>*/}
    </FormSection>
  );
}

export default ExtraordinaryGeneralMeeting;