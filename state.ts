import { Reducer } from "redux";
import produce from "immer";
import exhaustivenessCheck from "./common/utils/exhaustivenessCheck";
import { ThunkAction } from "./store";

export interface LoginInfo {
  name: string;
  postcode: string;
}

// Retrieve all foodbanks nearby
export interface Foodbank {
  distance: number;
  image: string;
  lat: string;
  location: string;
  lon: string;
  name: string;
  needs: { found: string; needs: string; number: number };
  phone: string;
  priority: string;
  url: string;
}

interface LoginUpdate {
  type: "login/update";
  name: string;
  postcode: string;
}

interface FoodbankStarted {
  type: "foodbank/started";
}

interface FoodbankFinished {
  type: "foodbank/finished";
  foodbanks?: Foodbank[];
  error?: string;
}

export type FoodbankActions = FoodbankStarted | FoodbankFinished;
export type LoginActions = LoginUpdate;

interface FoodbankState {
  pending: boolean;
  foodbanks: Foodbank[] | null | undefined;
  error: string | null | undefined;
}

export const defaultFoodbankState: FoodbankState = {
  pending: false,
  foodbanks: null,
  error: null,
};

interface LoginState {
  name: string | "";
  postcode: string | "";
}

export const defaultLoginState: LoginState = {
  name: "",
  postcode: "",
};

// Reducers

export const foodbankReducer: Reducer<FoodbankState, FoodbankActions> = (
  state = defaultFoodbankState,
  action
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case "foodbank/started":
        draft.pending = true;
        return;

      case "foodbank/finished":
        draft.pending = false;
        draft.foodbanks = action.foodbanks;
        draft.error = action.error;
        return;

      default:
        exhaustivenessCheck(action);
    }
  });

export const loginReducer: Reducer<LoginState, LoginActions> = (
  state = defaultLoginState,
  action
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case "login/update":
        draft.name = action.name;
        draft.postcode = action.postcode;
        return;
    }
  });

// Thunk Actions

/**
 * Retrieves nearby foodbanks from API given postcode
 */
export const doGetFoodbanks = (postcode): ThunkAction<Promise<void>> => async (
  dispatch,
  getState,
  { api }
) => {
  dispatch({ type: "foodbank/started" });

  try {
    const response = await api.get<Foodbank[]>(
      "findfoodbanks?postcode=" + postcode
    );
    dispatch({ type: "foodbank/finished", foodbanks: response.data });
  } catch (e) {
    dispatch({
      type: "foodbank/finished",
      error: "Failed to retrieve foodbanks",
    });
  }
};
