import { ActionTypes } from "./actions";

export const initialState = {
  findByTotal: 0,
  parcels: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH.SUCCESS: {
      const { findByTotal, findByCode, parcels } = action.payload.data;
      return {
        ...state,
        findByTotal,
        findByCode,
        parcels,
      };
    }
    case ActionTypes.CLEAR: {
      return initialState;
    }
    default:
      return state;
  }
};
