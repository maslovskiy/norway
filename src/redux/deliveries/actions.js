import {
  createActionTypes,
  createAsyncAction,
  createAsyncActionTypes,
} from "@dpdgroupuk/redux-action-creator";
import { reset } from "redux-form";

import { deliveriesApi } from "../../apis";
import { DELIVERIES_SEARCH_FILTER_FORM } from "../../constants/forms";
import { transformQuery } from "../../utils/query";
import { pageToStartPos } from "../../models/parcel";

export const resetFilters = () => reset(DELIVERIES_SEARCH_FILTER_FORM);

export const ActionTypes = createActionTypes("DELIVERIES", {
  FETCH: createAsyncActionTypes("FETCH"),
  FILTER: createAsyncActionTypes("FILTER"),
  SEARCH: createAsyncActionTypes("SEARCH"), // search from header quick search
  FIND: createAsyncActionTypes("FIND"), // search from form
  SEARCH_BY_TYPE: createAsyncActionTypes("SEARCH_BY_TYPE"),
  CLEAR: "CLEAR",
});

export const clearFindByCodeCache = () => ({
  type: ActionTypes.CLEAR,
});

export const fetchParcels = createAsyncAction(
  (findByCode, { page, pageSize }, fetchOptions) =>
    deliveriesApi.getParcelsPage(
      {
        findByCode,
        startPos: pageToStartPos(page, pageSize),
        endPos: page * pageSize,
      },
      fetchOptions
    ),
  ActionTypes.FETCH
);

export const filterParcels = createAsyncAction(
  (findByCode, values = {}, fetchOptions) =>
    deliveriesApi
      .filterParcels(transformQuery(findByCode, values), fetchOptions)
      .then(({ data }) => data),
  ActionTypes.FILTER
);

export const searchParcels = createAsyncAction((query, _, fetchOptions) => {
  return deliveriesApi
    .searchParcels(query, fetchOptions)
    .then(({ data }) => data);
}, ActionTypes.SEARCH);

export const findParcels = createAsyncAction((query, _, fetchOptions) => {
  return query.searchParam
    ? deliveriesApi.searchParcels(query, fetchOptions).then(({ data }) => data)
    : deliveriesApi.findParcels(query, fetchOptions).then(({ data }) => data);
}, ActionTypes.FIND);

export const searchParcelsByType = createAsyncAction(
  (values = {}, deliveryType, fetchOptions) => {
    return deliveriesApi
      .getParcelsFindByCodeByType(deliveryType, values, fetchOptions)
      .then(({ data }) => data);
  },
  ActionTypes.SEARCH_BY_TYPE
);
