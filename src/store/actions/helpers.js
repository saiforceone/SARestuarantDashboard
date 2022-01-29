import { ERROR_STRINGS, ERROR_VALUES } from './actionConstants';
import ActionCreatorUtils from '../utils/ActionCreatorUtils';
import { ACTION_SUFFIXES } from '../constants';
import APIUtils from '../../utils/APIUtils';

/**
 * @function fetchAction
 * @param {String} endpoint Specifies the api endpoint to fetch from
 * @param {String} queryObject Specifies the query string parameters for the request
 * @param {String} reducerPrefix Specifies the reducer that should be targeted for updates to its state
 * @param {Boolean} requiresAuth Indicates if the action should use authentication
 * @returns {Function}
 * @description Generic fetch function that retrieves data and sets the reducer based on given reducer prefix
 */
export const fetchAction = ({
  endpoint = '',
  queryObject = {},
  reducerPrefix = '',
  requiresAuth = false,
}) => {
  return async dispatch => {

    dispatch(ActionCreatorUtils.buildAction(
      `${reducerPrefix}${ACTION_SUFFIXES.SET_ERROR}`,
      '',
    ));

    dispatch(ActionCreatorUtils.buildAction(
      `${reducerPrefix}${ACTION_SUFFIXES.SET_REQ_IN_PROGRESS}`,
      false,
    ));

    try {

      dispatch(ActionCreatorUtils.buildAction(
        `${reducerPrefix}${ACTION_SUFFIXES.SET_REQ_IN_PROGRESS}`,
        true,
      ));

      const {
        data,
        error,
        success,
      } = await APIUtils.getDataFromAPI({
        endpoint,
        queryObject,
        requiresAuth,
      });

      dispatch(ActionCreatorUtils.buildAction(
        `${reducerPrefix}${ACTION_SUFFIXES.SET_REQ_IN_PROGRESS}`,
        false,
      ));

      if (!success) {
        dispatch(ActionCreatorUtils.buildAction(
          `${reducerPrefix}${ACTION_SUFFIXES.SET_ERROR}`,
          `${ERROR_STRINGS.FAILED_WITH_ERROR}${ERROR_VALUES.INVALID_REQUEST} ${error}`,
        ));
      }

      dispatch(ActionCreatorUtils.buildAction(
        `${reducerPrefix}${ACTION_SUFFIXES.SET_TOTAL_COUNT}`,
        Array.isArray(data) ? data.length : [],
      ));

      dispatch(ActionCreatorUtils.buildAction(
        `${reducerPrefix}${ACTION_SUFFIXES.SET_DATA}`,
        data,
      ));

    } catch (e) {
      dispatch(ActionCreatorUtils.buildAction(
        `${reducerPrefix}${ACTION_SUFFIXES.SET_ERROR}`,
        e.toString(),
      ));
      dispatch(ActionCreatorUtils.buildAction(
        `${reducerPrefix}${ACTION_SUFFIXES.SET_REQ_IN_PROGRESS}`,
        false,
      ));
    }
  };
};
