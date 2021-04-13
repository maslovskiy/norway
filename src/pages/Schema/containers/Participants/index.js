import React from 'react';
import {Box, Grid, IconButton, Checkbox as MaterialCheckbox, TextField as MaterialTextField} from "@material-ui/core";
import {Field} from "react-final-form";
import AddIcon from "@material-ui/icons/Add";
import ReactTable from "../../../../components/ReactTable";
import {makeStyles} from "@material-ui/core/styles";
import User from "../../../../components/Icons/User";
import FormSection from "../../components/FormSection";
import Checkbox from "../../components/Inputs/Checkbox";
import FinalFormSelect from "../../components/Inputs/Select";
import TextField from "../../components/Inputs/TextField";
import TextArea from "../../components/Inputs/TextArea";
import {roles} from "../../../../models/user";
import Select from "../../../../components/Select";

const useStyles = makeStyles(() => ({
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
  }
}));

const EditableCell = ({value: initialValue, row: {index}, column, updateMyData}) => {

  const defaultValue = roles.find(role => role.value === initialValue);

  const [value, setValue] = React.useState(initialValue);

  const onChange = e => {
    setValue(e.target.value)
  }

  const onChangeCheckbox = e => {
    setValue(e.target.checked)
  }

  const onBlur = () => {
    updateMyData(index, column.id, value)
  }

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue]);

  switch (column.id) {
    case "rolle":
      return <Select defaultValue={defaultValue} value={value} options={roles} onChange={onChange} onBlur={onBlur}/>
    case "skalSignere":
      return (
        <Box>
          <MaterialCheckbox checked={value} onChange={onChangeCheckbox} onBlur={onBlur}/>
          {value ? "Påkrevd" : "Ikke obligatorisk"}
        </Box>
      )
    default:
      return <MaterialTextField value={value} onChange={onChange} onBlur={onBlur}/>
  }
}

const defaultColumn = {
  Cell: EditableCell,
}

const Participants = ({onClick, data, setTableValues}) => {

  const classes = useStyles();

  const columns = [
    {
      Header: 'Navn',
      accessor: 'navn',
      width: 500
    },
    {
      Header: 'Rolle',
      accessor: 'rolle',
      width: 500
    },
    {
      Header: 'Skal Signere',
      accessor: 'skalSignere',
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

  return (
    <FormSection title={"Legg til Deltakere"}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Field
            name="navn"
            component={TextField}
            type="text"
            label="Navn"
          />
        </Grid>
        <Grid item xs={4}>
          <Field
            name="rolle"
            component={FinalFormSelect}
            type="select"
            label="Rolle"
          />
        </Grid>
        <Grid item xs={4}>
          <Box className={classes.subSubmit}>
            <Field
              name="skalSignere"
              component={Checkbox}
              type="checkbox"
              label="Skal signere"
            />
            <IconButton className={classes.subSubmitBtn} onClick={onClick}>
              <AddIcon/>
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <ReactTable
            data={data}
            columns={columns}
            defaultColumn={defaultColumn}
            setTableValues={setTableValues}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="bakgrunn_for_kapitalforhøyelsen"
            component={TextArea}
            type="textarea"
            label="Bakgrunn for Kapitalforhøyelsen"
            placeholder="Begynn å skrive"
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="beslutninger"
            component={TextArea}
            type="textarea"
            label="Beslutninger"
            placeholder="Alle beslutninger var enstemmige"
          />
        </Grid>
      </Grid>
    </FormSection>
  );
}

export default Participants;