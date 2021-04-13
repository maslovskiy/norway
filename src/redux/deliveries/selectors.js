import { createSelector } from "reselect";

export const getData = state => state.deliveries;

export const getViewParcels = createSelector(getData, ({ parcels }) => parcels);

export const getTotalParcelsCount = createSelector(
  getData,
  ({ findByTotal }) => findByTotal
);

export const getFindByCode = createSelector(
  getData,
  ({ findByCode }) => findByCode
);
