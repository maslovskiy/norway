import React from 'react';
import {Grid, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Form} from 'react-final-form';
import BoardMeeting from "./containers/BoardMeeting";
import Participants from "./containers/Participants";
import GeneralMeeting from "./containers/GeneralMeeting";
import ExtraordinaryGeneralMeeting from "./containers/ExtraordinaryGeneralMeeting";
import Download from "./containers/Download";

const useStyles = makeStyles(() => ({
  root: {
    padding: "0px 110px 110px",
    backgroundColor: "rgba(255,255,255, 0.5)"
  },
  flexContainer: {
    display: "flex",
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
  }
}));

const Schema = () => {

  const classes = useStyles();

  const [tableValues, setTableValues] = React.useState([]);
  const [generalMeetingTableValues, setGeneralMeetingTableValues] = React.useState(
    [
      {
        shareholder: "Roisin Long",
        existing_shares: 100,
        new_shares: "",
        represented_with: "",
      },
      {
        shareholder: "Jon Simmonds Person",
        existing_shares: 500,
        new_shares: 200,
        represented_with: "Jameson Howard",
      }
    ]
  );

  const onSubmit = async (values) => {
    console.log({
      ...values,
      "users": tableValues,
      "generalMeeting": generalMeetingTableValues
    })
  }

  const onCreateRow = (values, change) => {
    const {navn, rolle, skalSignere} = values;
    setTableValues(prevValues => [...prevValues, {navn, rolle, skalSignere}]);
    change("navn", "");
    change("rolle", "");
    change("skalSignere", false);
  }
  const onCreateGeneralMeetingRow = (values, change) => {
    const {aksjonær, eksisterende_aksjer, nye_aksjer, representert_ved} = values;
    setGeneralMeetingTableValues(prevValues => [...prevValues, {
      aksjonær,
      eksisterende_aksjer,
      nye_aksjer,
      representert_ved
    }]);
    change("aksjonær", "");
    change("eksisterende_aksjer", "");
    change("nye_aksjer", "");
    change("representert_ved", "");
  }

  return (
    <Grid item xs={12}>
      <Paper className={classes.root}>
        {/*<Form*/}
        {/*  onSubmit={onSubmit}*/}
        {/*  initialValues={{}}*/}
        {/*  render={({handleSubmit, form, values}) => (*/}
        {/*    <form onSubmit={handleSubmit}>*/}
        {/*      <BoardMeeting/>*/}
        {/*      <Participants*/}
        {/*        onClick={() => onCreateRow(values, form.change)}*/}
        {/*        data={tableValues}*/}
        {/*        setTableValues={setTableValues}*/}
        {/*      />*/}
        {/*      <GeneralMeeting/>*/}
        {/*    </form>*/}
        {/*  )}*/}
        {/*/>*/}
        <Form
          onSubmit={onSubmit}
          initialValues={{
            shareholder: "",
            number_of_shares_before_increase: 10000,
            existing_shares: "",
            denomination: 1.1,
            drawing_course: 25.54,
            new_shares: "",
            represented_with: "",
          }}
          render={({handleSubmit, form, values}) => (
            <form onSubmit={handleSubmit}>
              <ExtraordinaryGeneralMeeting
                values={values}
                change={form.change}
                onClick={() => onCreateGeneralMeetingRow(values, form.change)}
                data={generalMeetingTableValues}
                setTableValues={setGeneralMeetingTableValues}
              />
            </form>
          )}
        />
        {/*<Download/>*/}
      </Paper>
    </Grid>
  );
}

Schema.propTypes = {};

export default Schema;