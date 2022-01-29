import { generateCommonState } from '../helpers/helpers';
import { MENU_ITEM_ACTIONS as MIA } from '../constants';

const INITIAL_STATE = {
  ...generateCommonState(),
};

export default (state = INITIAL_STATE, action) => {
  const {type: actionType, payload} = action;
  switch (actionType) {
    case MIA.SET_DATA:
      return {...state, data: Array.isArray(payload) ? payload : []};
    case MIA.SET_ERROR:
      return {...state, lastError: payload};
    case MIA.SET_REQ_IN_PROGRESS:
      return {...state, requestInProgress: payload};
    case MIA.SET_TOTAL_COUNT:
      return {...state, totalCount: parseInt(payload)};
    case MIA.UNSET_DATA:
      return INITIAL_STATE;
    default:
      return state;
  }
};
