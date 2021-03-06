export const ACTION_SUFFIXES = {
  SET_DATA: '_SET_DATA',
  SET_ERROR: '_SET_ERROR',
  SET_REQ_IN_PROGRESS: '_SET_REQ_IN_PROGRESS',
  SET_TOTAL_COUNT: '_SET_TOTAL_COUNT',
  UNSET_DATA: '_UNSET_DATA',
};

const generateCommonActions = ({prefix = ''}) => ({
  SET_DATA: `${prefix}_SET_DATA`,
  SET_ERROR: `${prefix}_SET_LAST_ERROR`,
  SET_REQ_IN_PROGRESS: `${prefix}_SET_REQ_IN_PROGRESS`,
  SET_TOTAL_COUNT: `${prefix}_SET_TOTAL_COUNT`,
  UNSET_DATA: `${prefix}_UNSET_DATA`
});

export const APP_ACTIONS = {
  SET_AUTH_TOKEN: 'APP_SET_AUTH_TOKEN',
  SET_IS_AUTHENTICATING: 'APP_SET_IS_AUTHENTICATING',
  SET_IS_FETCHING_PROFILE: 'APP_SET_IS_FETCHING_PROFILE',
  SET_LAST_ERROR: 'APP_SET_LAST_ERROR',
  SET_USER_PROFILE: 'APP_SET_USER_PROFILE',
  UNSET_DATA: 'APP_UNSET_DATA',
};

export const MENU_ITEM_ACTIONS = {
  ...generateCommonActions({prefix: 'MENU_ITEMS'}),
};

export const ORDER_ACTIONS = {
  ...generateCommonActions({prefix: 'ORDERS'}),
  SET_SELECTED_LOCATION: `ORDERS_SET_SELECTED_LOCATION`,
};

export const RESTAURANT_LOCATION_ACTIONS = {
  ...generateCommonActions({prefix: 'LOCATIONS'}),
};
