import React from 'react';
import {Grid} from "@material-ui/core";
import {Field} from "react-final-form";
import FormSection from "../../components/FormSection";
import DatePicker from "../../components/Inputs/DatePicker";
import TextField from "../../components/Inputs/TextField";

const GeneralMeeting = () => {
  return (
    <FormSection title={"Innkalling Til Ekstraordinær Generalforsamling"}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Field
                name="dato_for_generalforsamling"
                component={DatePicker}
                label="Dato for Generalforsamling"
              />
            </Grid>
            <Grid item xs={4}>
              <Field
                name="klokkeslett_for_generalforsamling"
                component={DatePicker}
                label="Klokkeslett for Generalforsamling"
              />
            </Grid>
            <Grid item xs={4}>
              <Field
                name="sted_for_generalforsamling"
                component={TextField}
                type="text"
                label="Sted for Generalforsamling"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Field
                name="dato_for_utsendelse_av_innkalling"
                component={DatePicker}
                label="Dato For Utsendelse Av Innkalling"
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                name="styreleder"
                component={TextField}
                type="text"
                label="Styreleder"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </FormSection>
  );
}

export default GeneralMeeting;