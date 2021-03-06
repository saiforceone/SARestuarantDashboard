import { APP_ACTIONS } from "../constants";

const INITIAL_STATE = {
  authToken: '',
  isAuthenticating: false,
  isFetchingProfile: false,
  lastError: '',
  userProfile: undefined,
};

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state = INITIAL_STATE, action) => {
  const {type: actionType, payload} = action;
  switch (actionType) {
    case APP_ACTIONS.SET_AUTH_TOKEN:
      return {...state, authToken: payload};
    case APP_ACTIONS.SET_IS_AUTHENTICATING:
      return {...state, isAuthenticating: payload};
    case APP_ACTIONS.SET_IS_FETCHING_PROFILE:
      return {...state, isFetchingProfile: payload};
    case APP_ACTIONS.SET_LAST_ERROR:
      return {...state, lastError: payload};
    case APP_ACTIONS.SET_USER_PROFILE:
      return {...state, userProfile: payload};
    case APP_ACTIONS.UNSET_DATA:
      return INITIAL_STATE;
    default:
      return state;
  }
};
