// import { formValueSelector } from "redux-form";
// import { createSelector } from "reselect";
//
// import {
//   DELIVERIES_SEARCH_FILTER_FORM,
//   FilterFields,
// } from "../../constants/forms";
//
// export const getData = state => state.app.references;
//
// export const getProducts = createSelector(getData, ({ products }) => products);
//
// export const getCountries = createSelector(
//   getData,
//   ({ countries }) => countries
// );
//
// export const getDepot = createSelector(getData, ({ depots }) => depots);
//
// export const getServices = createSelector(getData, ({ services }) => services);
//
// export const getPickedAccount = state =>
//   formValueSelector(DELIVERIES_SEARCH_FILTER_FORM)(
//     state,
//     FilterFields.ACCOUNT_CODE
//   );
//
// export const getRanges = createSelector(getData, ({ ranges }) => ranges);
//
// export const getRange = createSelector(
//   getRanges,
//   getPickedAccount,
//   (ranges, account) => ranges[account]
// );
//
// export const getException = state => state.app.references.exception;
