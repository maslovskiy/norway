import React from 'react';
import {
  Box,
  Checkbox as MaterialCheckbox,
  Divider,
  Grid,
  IconButton,
  TextField as MaterialTextField
} from "@material-ui/core";
import {Field} from "react-final-form";
import {makeStyles} from "@material-ui/core/styles";
import ReactTable from "../../../../components/ReactTable";
import User from "../../../../components/Icons/User";
import AddIcon from "@material-ui/icons/Add";
import FormSection from "../../components/FormSection";
import TextField from "../../components/Inputs/TextField";

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
  form: {
    marginBottom: 25
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    height: "100%",
    "& button" : {
      marginLeft: 40
    }
  }
}));

const EditableCell = ({value: initialValue, row: {index}, column, updateMyData}) => {

  const [value, setValue] = React.useState(initialValue);

  const onChange = e => setValue(e.target.value)

  const onBlur = () => updateMyData(index, column.id, value)

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue]);

  switch (column.id) {
    default:
      return <MaterialTextField value={value} onChange={onChange} onBlur={onBlur}/>
  }
}

const defaultColumn = {
  Cell: EditableCell,
}

const ExtraordinaryGeneralMeeting = ({onClick, data, setTableValues}) => {

  const columns = [
    {
      Header: 'Aksjonær',
      accessor: 'aksjonær',
    },
    {
      Header: '# eksisterende aksjer',
      accessor: 'eksisterende_aksjer',
    },
    {
      Header: '# nye aksjer',
      accessor: 'nye_aksjer',
    },
    {
      Header: 'representert ved',
      accessor: 'representert_ved',
    },
    {
      Header: '% Akksjer',
      accessor: 'akksjer',
    },
    {
      Header: 'Tegningbeløp',
      accessor: 'tegningbeløp',
    },
    {
      Header: 'Action',
      accessor: 'action',
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

  return (
    <FormSection title={"Protokoll Ekstraordinær Generalforsamling"}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Field
                name="hvem_åpner_generalforsamling"
                component={TextField}
                type="text"
                label="Hvem åpner generalforsamling"
              />
            </Grid>
            <Grid item xs={4}>
              <Field
                name="møteleder"
                component={TextField}
                type="text"
                label="Møteleder"
              />
            </Grid>
            <Grid item xs={4}>
              <Field
                name="medundertegner"
                component={TextField}
                type="text"
                label="Medundertegner"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <h2 className={classes.subtitle}>Kapitalforhøyelse</h2>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Field
                name="antall_aksjer_etter_forhøyelse"
                component={TextField}
                type="text"
                label="Antall Aksjer Etter Forhøyelse"
              />
            </Grid>
            <Grid item xs={3}>
              <Field
                name="sum_eksisterende_aksjekapital"
                component={TextField}
                type="text"
                label="Sum Eksisterende Aksjekapital"
              />
            </Grid>
            <Grid item xs={3}>
              <Field
                name="sum_økt_aksjekapital"
                component={TextField}
                type="text"
                label="Sum Økt Aksjekapital"
              />
            </Grid>
            <Grid item xs={3}>
              <Field
                name="sum_aksjekapital"
                component={TextField}
                type="text"
                label="Sum Aksjekapital"
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Field
                name="tegningskurs"
                component={TextField}
                type="text"
                label="Tegningskurs"
              />
            </Grid>
            <Grid item xs={3}>
              <Field
                name="pålydende"
                component={TextField}
                type="text"
                label="Pålydende"
              />
            </Grid>
            <Grid item xs={3}>
              <Field
                name="sum_tegningsbeløp"
                component={TextField}
                type="text"
                label="Sum Tegningsbeløp"
              />
            </Grid>
            <Grid item xs={3}>
              <Field
                name="antal_aksjer?"
                component={TextField}
                type="text"
                label="Antal Aksjer?"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider className={classes.divider}/>
      <Grid item xs={12}>
        <Grid container spacing={3} className={classes.form}>
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
          data={data}
          columns={columns}
          defaultColumn={defaultColumn}
          setTableValues={setTableValues}
        />
      </Grid>
    </FormSection>
  );
}

export default ExtraordinaryGeneralMeeting;