import { ActionTypes } from "./actions";

export const initialState = {
  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    // case ActionTypes.FILTER: {
    //   return {
    //     ...state,
    //     filtered: action.payload.filtered
    //   };
    // }
    default:
      return state;
  }
};
