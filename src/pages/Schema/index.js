import React from 'react';
import {Grid, Paper} from "@material-ui/core";
import {Form} from 'react-final-form';
import BoardMeeting from "./containers/BoardMeeting";
import Participants from "./containers/Participants";
import GeneralMeeting from "./containers/GeneralMeeting";
import ExtraordinaryGeneralMeeting from "./containers/ExtraordinaryGeneralMeeting";
import Download from "./containers/Download";
import {calculator} from "./calculation";
import {withRouter} from "react-router-dom";
import {useSchemas} from "../../providers/schemas/hooks";
import {useStyles} from "./styles";
import {
  egf_protokoll_kontantemisjon_conroller,
  innkalling_egf_kontantemisjon_controller,
  styreprotokoll_kontantemisjon_controller
} from "../../api";
import GoBackButton from "./components/GoBackButton";

const Schema = ({match}) => {

  const classes = useStyles();
  const {schemas} = useSchemas();
  const [tableValues, setTableValues] = React.useState([]);
  const [generalMeetingTableValues, setGeneralMeetingTableValues] = React.useState([
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
    },
    {
      shareholder: "Shahid Kenny",
      existing_shares: "",
      new_shares: 300,
      represented_with: "",
    },
    {
      shareholder: "Frederic Hurst",
      existing_shares: 800,
      new_shares: "",
      represented_with: "",
    },
    {
      shareholder: "Testing Tool AS",
      existing_shares: "",
      new_shares: 100,
      represented_with: "Aarav Fraser",
    },
    {
      shareholder: "Prover AS",
      existing_shares: "",
      new_shares: 600,
      represented_with: "Findlay Gilmore",
    },
    {
      shareholder: "ASM SA",
      existing_shares: 2000,
      new_shares: "",
      represented_with: "Kaiya Archer",
    },
  ]);

  const onSubmit = (values) => {
    console.log({values})
    switch (values.type) {
      case 1 :
        return styreprotokoll_kontantemisjon_controller({
          ...values,
          "users": tableValues,
          "generalMeeting": generalMeetingTableValues
        })
      case 2 :
        return innkalling_egf_kontantemisjon_controller({
          ...values,
          "users": tableValues,
          "generalMeeting": generalMeetingTableValues
        })
      case 3 :
        return egf_protokoll_kontantemisjon_conroller({
          ...values,
          "users": tableValues,
          "generalMeeting": generalMeetingTableValues
        })
    }
  }

  const onCreateRow = (values, change) => {
    const {navn, rolle, skalSignere} = values;
    setTableValues(prevValues => [...prevValues, {navn, rolle, skalSignere}]);
    change("navn", "");
    change("rolle", "");
    change("skalSignere", false);
  }
  const onCreateGeneralMeetingRow = (values, change) => {
    const {shareholder, existing_shares, new_shares, represented_with, generalMeetingTableValues = []} = values;
    setGeneralMeetingTableValues(prevValues => [...prevValues, {
      shareholder,
      existing_shares,
      new_shares,
      represented_with
    }]);
    change("generalMeetingTableValues", [
      ...generalMeetingTableValues,
      {
        shareholder,
        existing_shares,
        new_shares,
        represented_with
      }
    ]);
    change("shareholder", "");
    change("existing_shares", "");
    change("new_shares", "");
    change("represented_with", "");
  }

  const schema = schemas.find(schema => schema.id === parseInt(match.params.id));

  return (
    <Grid item xs={12}>
      {
        schema && <GoBackButton to="/" name={schema.name}/>
      }
      <Paper className={classes.root}>
        <Form
          onSubmit={onSubmit}
          decorators={[calculator]}
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
              <BoardMeeting/>
              <Participants
                onClick={() => onCreateRow(values, form.change)}
                data={tableValues}
                setTableValues={setTableValues}
              />
              <GeneralMeeting/>
              <ExtraordinaryGeneralMeeting
                values={values}
                change={form.change}
                onClick={() => onCreateGeneralMeetingRow(values, form.change)}
                data={generalMeetingTableValues}
                setTableValues={setGeneralMeetingTableValues}
              />
              <Download form={form}/>
            </form>
          )}
        />
      </Paper>
    </Grid>
  );
}

Schema.propTypes = {};

export default withRouter(Schema);