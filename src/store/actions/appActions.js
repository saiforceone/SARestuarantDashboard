import axios from 'axios';
import {
  APP_ACTIONS,
  MENU_ITEM_ACTIONS,
  RESTAURANT_LOCATION_ACTIONS,
  ORDER_ACTIONS
} from '../constants';
import { API_ENDPOINTS } from '../../constants';
import ActionCreatorUtils from '../utils/ActionCreatorUtils';
import StorageUtils, {STORAGE_CONSTANTS} from '../../utils/StorageUtils';

import { ERROR_STRINGS, ERROR_VALUES } from './actionConstants';

/**
 * @function loginUserAction
 * @param {String} username
 * @param {String} password
 * @param {Object} navigate React router navigate hook to navigate the user to the dashboard page
 * @returns {Function}
 * @description Attempts to log the user in with the supplied username and password
 */
export const loginUserAction = ({username, password, navigate}) => {
  return async dispatch => {
    dispatch(ActionCreatorUtils.buildAction(
      APP_ACTIONS.SET_IS_AUTHENTICATING,
      false,
    ));
    dispatch(ActionCreatorUtils.buildAction(
      APP_ACTIONS.SET_LAST_ERROR,
      '',
    ));
    
    try {
      const url = `${API_ENDPOINTS.BASE}${API_ENDPOINTS.LOGIN}`;

      dispatch(ActionCreatorUtils.buildAction(
        APP_ACTIONS.SET_IS_AUTHENTICATING,
        true,
      ));

      const {data: responseData} = await axios.post(url, {username, password});

      dispatch(ActionCreatorUtils.buildAction(
        APP_ACTIONS.SET_IS_AUTHENTICATING,
        false,
      ));

      const {token} = responseData;

      if (!token) {
        return dispatch(ActionCreatorUtils.buildAction(
          APP_ACTIONS.SET_LAST_ERROR,
          `${ERROR_STRINGS.FAILED_WITH_ERROR} ${ERROR_VALUES.AUTH_FAILED}`,
        ));
      }

      dispatch(ActionCreatorUtils.buildAction(
        APP_ACTIONS.SET_AUTH_TOKEN,
        token,
      ));

      StorageUtils.setValueForKey({
        key: STORAGE_CONSTANTS.KEY_AUTH_TOKEN,
        value: token,
      });

      navigate('/menu-items', {replace: true});
    } catch (e) {
      dispatch(ActionCreatorUtils.buildAction(
        APP_ACTIONS.SET_LAST_ERROR,
        e.toString(),
      ));
      dispatch(ActionCreatorUtils.buildAction(
        APP_ACTIONS.SET_IS_AUTHENTICATING,
        false,
      ));
    }
  }
};

/**
 * @function checkSession
 * @description Helper function that checks the user's current auth status for the nav header
 * @returns {Function}
 */
export const checkSession = () => {
  return async dispatch => {
    try {
      const currentTokenData = StorageUtils.getValueFromStorage({
        key: STORAGE_CONSTANTS.KEY_AUTH_TOKEN,
      });
      
      if (!currentTokenData.data) {
        return false;
      }

      const headers = {
        authorization: currentTokenData.data,
      };

      const url = `${API_ENDPOINTS.BASE}${API_ENDPOINTS.USER_CHECK}`;

      const {data: responseData} = await axios.get(url, {headers});

      if (!responseData.success) {
        return false;
      }

      dispatch(ActionCreatorUtils.buildAction(
        APP_ACTIONS.SET_USER_PROFILE,
        responseData.data
      ));

      return true;
    } catch (e) {
      return false;
    }
  }
}

/**
 * @function logoutAction
 * @param {Function} navigate
 * @returns {Function}
 * @description Logs the user out. Can be modified to redirect the user to login page.
 */
export const logoutAction = ({navigate}) => {
  return dispatch => {
    dispatch(ActionCreatorUtils.buildAction(
      APP_ACTIONS.UNSET_DATA,
    ));
    dispatch(ActionCreatorUtils.buildAction(
      MENU_ITEM_ACTIONS.UNSET_DATA,
    ));
    dispatch(ActionCreatorUtils.buildAction(
      RESTAURANT_LOCATION_ACTIONS.UNSET_DATA
    ));
    dispatch(ActionCreatorUtils.buildAction(
      ORDER_ACTIONS.UNSET_DATA,
    ));
    StorageUtils.deleteValueUsingKey({
      key: STORAGE_CONSTANTS.KEY_AUTH_TOKEN,
    });
    if (typeof navigate === 'function') {
      navigate('/', {replace: true});
    }
  }
};
