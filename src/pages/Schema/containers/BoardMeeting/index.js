import React from 'react';
import {Grid} from "@material-ui/core";
import {Field} from "react-final-form";
import TextField from "../../components/Inputs/TextField";
import DatePicker from "../../components/Inputs/DatePicker";
import FormSection from "../../components/FormSection";

const BoardMeeting = () => {
  return (
    <FormSection title={"Pprotokoll Fra Styremøte"}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Field
            name="selskapsnavn"
            component={TextField}
            type="text"
            label="Selskapsnavn"
          />
        </Grid>
        <Grid item xs={6}>
          <Field
            name="dato_for_styremøte"
            component={DatePicker}
            label="Dato for Styremøte"
          />
        </Grid>
        <Grid item xs={6}>
          <Field
            name="sted_for_styremøte"
            component={TextField}
            type="text"
            label="Sted for Styremøte"
          />
        </Grid>
      </Grid>
    </FormSection>
  );
}

export default BoardMeeting;