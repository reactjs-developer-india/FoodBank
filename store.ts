import * as Redux from "redux";
import axios from "axios";
import thunkMiddleware, { ThunkAction as BaseThunkAction } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  foodbankReducer,
  FoodbankActions,
  loginReducer,
  LoginActions,
  DonationListActions,
  donationListReducer,
} from "./state";

export const api = axios.create({
  baseURL: "https://foodbank--backend.herokuapp.com/",
});

const rootReducer = Redux.combineReducers({
  foodbanks: foodbankReducer,
  login: loginReducer,
  donationList: donationListReducer,
});

/**
 * The whole shape of our application state
 */
export type RootState = ReturnType<typeof rootReducer>;

/**
 * Union of all supported application actions
 */
export type PlainActions = FoodbankActions | LoginActions | DonationListActions; // add other actions as union

interface ThunkExtra {
  /** Axios instance bound to the API. */
  api: typeof api;
}

/**
 * A thunk returned by a thunk-creator.
 */
export type ThunkAction<R> = BaseThunkAction<
  R | Promise<R>,
  RootState,
  ThunkExtra /* this is the extra argument again */,
  PlainActions
>;

/**
 * Redux store
 */
export const store = Redux.createStore(
  rootReducer,
  composeWithDevTools(
    Redux.applyMiddleware(thunkMiddleware.withExtraArgument({ api }))
  )
);

export default store;
