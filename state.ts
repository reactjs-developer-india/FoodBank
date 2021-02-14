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

export interface Donation {
  donationid: string;
  info: {
    additional: string;
    dateTime: string;
    image: string;
    name: string;
    priority: string;
  };
  postcode: string;
  start_lat: number;
  start_lon: number;
  status: string;
  username: string;
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

interface FoodbankSelected {
  type: "foodbank/selected";
  selectedFoodbank: Foodbank;
}

interface DonationListStarted {
  type: "donation_list/started";
}

interface DonationListFinished {
  type: "donation_list/finished";
  donations?: Donation[];
  image?: string;
  error?: string;
}

interface AllDonationStarted {
  type: "all_donation/started";
}

interface AllDonationFinished {
  type: "all_donation/finished";
  donations?: Donation[];
  error?: string;
}

export type FoodbankActions =
  | FoodbankStarted
  | FoodbankFinished
  | FoodbankSelected;
export type LoginActions = LoginUpdate;
export type DonationListActions = DonationListStarted | DonationListFinished;
export type AllDonationActions = AllDonationStarted | AllDonationFinished;

interface FoodbankState {
  pending: boolean;
  foodbanks: Foodbank[] | null | undefined;
  selectedFoodbank: Foodbank | null | undefined;
  error: string | null | undefined;
}

export const defaultFoodbankState: FoodbankState = {
  pending: false,
  foodbanks: null,
  selectedFoodbank: null,
  error: null,
};

interface DonationListState {
  pending: boolean;
  donations: Donation[] | null | undefined;
  image: string | null | undefined;
  error: string | null | undefined;
}

export const defaultAllDonationState: AllDonationState = {
  pending: false,
  donations: null,
  error: null,
};

interface AllDonationState {
  pending: boolean;
  donations: Donation[] | null | undefined;
  error: string | null | undefined;
}

export const defaultDonateListState: DonationListState = {
  pending: false,
  donations: null,
  image: null,
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

      case "foodbank/selected":
        draft.selectedFoodbank = action.selectedFoodbank;
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

export const donationListReducer: Reducer<
  DonationListState,
  DonationListActions
> = (state = defaultDonateListState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case "donation_list/started":
        draft.pending = true;
        return;

      case "donation_list/finished":
        draft.pending = false;
        draft.donations = action.donations;
        draft.image = action.image;
        draft.error = action.error;
        return;

      default:
        exhaustivenessCheck(action);
    }
  });

export const allDonationReducer: Reducer<
  AllDonationState,
  AllDonationActions
> = (state = defaultAllDonationState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case "all_donation/started":
        draft.pending = true;
        return;

      case "all_donation/finished":
        draft.pending = false;
        draft.donations = action.donations;
        draft.error = action.error;
        return;

      default:
        exhaustivenessCheck(action);
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

interface DonationResponse {
  data: { donations: Donation[] };
  image: string;
}

/**
 * Retrieves nearby foodbanks from API given postcode
 */
export const doGetPastDonations = (): ThunkAction<Promise<void>> => async (
  dispatch,
  getState,
  { api }
) => {
  dispatch({ type: "donation_list/started" });
  const { name } = getState().login;

  try {
    fetch(
      "https://foodbank--backend.herokuapp.com/userdonations?username=" +
        name.trim()
    )
      .then((res) => res.json())
      .then((e) => {
        dispatch({
          type: "donation_list/finished",
          donations: e.data.donations,
          image: e.data.image,
        });
      });
  } catch (e) {
    dispatch({
      type: "donation_list/finished",
      error: "Failed to retrieve donations",
    });
  }
};

/**
 * Retrieves nearby foodbanks from API given postcode
 */
export const doGetAllDonations = (): ThunkAction<Promise<void>> => async (
  dispatch,
  getState,
  { api }
) => {
  dispatch({ type: "all_donation/started" });

  try {
    const response = await api.get("getalldonations");
    dispatch({ type: "all_donation/finished", donations: response.data.data });
  } catch (e) {
    dispatch({
      type: "all_donation/finished",
      error: "Failed to retrieve donations",
    });
  }
};
