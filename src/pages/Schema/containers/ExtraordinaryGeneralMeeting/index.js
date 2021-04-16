import React, {useEffect, useState} from 'react';
import {
  Box,
  Divider,
  Grid,
  IconButton,
} from "@material-ui/core";
import {Field} from "react-final-form";
import ReactTable from "../../../../components/ReactTable";
import User from "../../../../components/Icons/User";
import AddIcon from "@material-ui/icons/Add";
import FormSection from "../../components/FormSection";
import TextField from "../../components/Inputs/TextField";
import Radio from "../../components/Inputs/Radio";
import RadioGroupWrapper from "../../components/RadioGroupWrapper";
import DatePicker from "../../components/Inputs/DatePicker";
import {calculateShares, calculateSubscriptionAmount} from "../../calculation";
import {columns} from "./columns";
import {useStyles} from "./styles";
import {EditableCell} from "./cell";
import {debounce} from "../../../../utils";

const ExtraordinaryGeneralMeeting = ({onClick, data, setTableValues, values, change}) => {

  const classes = useStyles();

  const [updatedData, setUpdatedData] = useState(data);

  const updateTableData = data => {
    const {number_of_shares_before_increase = 0, drawing_course} = values;
    return data.map(el => ({
      ...el,
      "shares": calculateShares(el.existing_shares, number_of_shares_before_increase),
      "subscription_amount": calculateSubscriptionAmount(el.new_shares, drawing_course),
    }));
  }

  useEffect(() => {
    const updated = updateTableData(data);
    setUpdatedData(updated);
    change("generalMeetingTableValues", updated);
  }, [data]);

  useEffect(() => {
    const updated = updateTableData(updatedData);
    debounce(() => {
      setUpdatedData(updated);
      change("generalMeetingTableValues", updated);
    })()
  }, [values.number_of_shares_before_increase, values.drawing_course])


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
                label="Number of New Shares"
                disabled
              />
            </Grid>
            <Grid item xs={5}>
              <Field
                name="sum_increased_share_capital"
                component={TextField}
                label="sum increased share capital"
                disabled
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={5}>
              <Field
                name="number_of_shares_after_increase"
                component={TextField}
                label="Number of Shares After Increase"
                disabled
              />
            </Grid>
            <Grid item xs={5}>
              <Field
                name="total_share_capital"
                component={TextField}
                label="Total Share Capital"
                disabled
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Field
                name="drawing_course"
                component={TextField}
                label="Drawing course"
              />
            </Grid>
            <Grid item xs={3}>
              <Field
                name="denomination"
                component={TextField}
                label="Denomination"
              />
            </Grid>
            <Grid item xs={3}>
              <Field
                name="total_subscription_amount"
                component={TextField}
                label="Total Subscription Amount"
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
              name="shareholder"
              component={TextField}
              type="text"
              label="Aksjonære"
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="existing_shares"
              component={TextField}
              type="text"
              label="# Eksisterende Aksjer"
            />
          </Grid>
          <Grid item xs={2}>
            <Field
              name="new_shares"
              component={TextField}
              type="text"
              label="# Nye Aksjer"
            />
          </Grid>
          <Grid item xs={4}>
            <Box className={classes.buttonWrapper}>
              <Field
                name="represented_with"
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
          columns={[
            ...columns,
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
          ]}
          defaultColumn={{
            Cell: EditableCell,
          }}
          setTableValues={setTableValues}
        />
      </Grid>
      <Grid item xs={12} className={classes.mb25}>
        <Grid container>
          <Grid item xs={7}>
            <RadioGroupWrapper title="Aksjene skal tegnes">
              <Field
                name="radio1"
                component={Radio}
                type="radio"
                value="I protokollen fra generalforsamlingen"
                label="I protokollen fra generalforsamlingen"
              />
              <Field
                name="radio1"
                component={Radio}
                type="radio"
                value="På et særskilt tegningsdokument med frist for tegning"
                label="På et særskilt tegningsdokument med frist for tegning"
              />
            </RadioGroupWrapper>
          </Grid>
          <Grid item xs={5} className={classes.bottomAligned}>
            <Field
              name="Tegningsfrist"
              component={DatePicker}
              label="Tegningsfrist"
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={4}>
        <Field
          name="frist_for_betaling_dager"
          component={TextField}
          type="text"
          label="Frist for betaling, dager"
        />
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={7}>
            <RadioGroupWrapper title="Aksjene skal tegnes">
              <Field
                name="radio2"
                component={Radio}
                type="radio"
                value="Særskilte emisjonskonto med kontonummer"
                label="Særskilte emisjonskonto med kontonummer"
              />
              <Field
                name="radio2"
                component={Radio}
                type="radio"
                value="Bankkonto med kontonummer "
                label="Bankkonto med kontonummer "
              />
            </RadioGroupWrapper>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid item xs={4} className={classes.mb25}>
          <Field
            name="Kontonummer"
            component={TextField}
            type="text"
            label="Kontonummer"
          />
        </Grid>
        <Grid item xs={4} className={classes.mb25}>
          <Field
            name="Utgifter til kapitalforhøyelsen, NOK"
            component={TextField}
            type="text"
            label="Utgifter til kapitalforhøyelsen, NOK"
          />
        </Grid>
        <Grid item xs={4} className={classes.mb25}>
          <Field
            name="Vedtektsparagraf"
            component={TextField}
            type="text"
            label="Vedtektsparagraf"
          />
        </Grid>
        <Grid item xs={4} className={classes.mb25}>
          <Field
            name="Ny Vedtektsparagraf"
            component={TextField}
            type="text"
            label="Ny Vedtektsparagraf"
          />
        </Grid>
      </Grid>
    </FormSection>
  );
}

export default ExtraordinaryGeneralMeeting;