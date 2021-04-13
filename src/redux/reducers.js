import { combineReducers } from "redux";
// import { reducer as form } from "redux-form";

// import { uiReducers } from "../pages";
// import { AuthReducer } from "../containers/Auth";
// import { DeliveriesReducer } from "./deliveries";
import { FilterReducer } from "./references";

export default combineReducers({
  // form,
  filter: FilterReducer,
  // app: combineReducers({
  //   references: ReferenceReducer,
  //   auth: AuthReducer,
  // }),
  // ui: uiReducers,
});
