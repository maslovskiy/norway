import thunk from "redux-thunk";
import { applyMiddleware, compose, createStore } from "redux";

import rootReducer from "./reducers";

const middlewares = [thunk];

if (process.env.NODE_ENV !== "production") {
  // middlewares.push(require("redux-logger").logger);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);
