import { generateCommonState } from '../helpers/helpers';
import { ORDER_ACTIONS as OA } from '../constants';

const INITIAL_STATE = {
  ...generateCommonState(),
  selectedRestaurantId: undefined,
};

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state = INITIAL_STATE, action) => {
  const {type: actionType, payload} = action;
  switch (actionType) {
    case OA.SET_DATA:
      return {...state, data: Array.isArray(payload) ? payload : []};
    case OA.SET_ERROR:
      return {...state, error: payload};
    case OA.SET_REQ_IN_PROGRESS:
      return {...state, requestInProgress: payload};
    case OA.SET_SELECTED_LOCATION:
      return {...state, selectedRestaurantId: payload};
    case OA.SET_TOTAL_COUNT:
      return {...state, totalCount: parseInt(payload)};
    case OA.UNSET_DATA:
      return INITIAL_STATE;
    default:
      return state;
  }
};
