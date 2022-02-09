import { generateCommonState } from '../helpers/helpers';
import { RESTAURANT_LOCATION_ACTIONS as RLA } from '../constants';

const INITIAL_STATE = {
  ...generateCommonState(),
};

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state = INITIAL_STATE, action) => {
  const {type: actionType, payload} = action;
  switch (actionType) {
    case RLA.SET_DATA:
      return{...state, data: Array.isArray(payload) ? payload : []};
    case RLA.SET_ERROR:
      return {...state, lastError: payload};
    case RLA.SET_REQ_IN_PROGRESS:
      return {...state, requestInProgres: payload};
    case RLA.SET_TOTAL_COUNT:
      return {...state, totalCount: parseInt(payload)}
    case RLA.UNSET_DATA:
      return INITIAL_STATE;
    default:
      return state;
  }
};
