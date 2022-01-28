import { combineReducers } from 'redux';

import appReducer from './appReducer';
import ordersReducer from './ordersReducer';

export default combineReducers({
  app: appReducer,
  orders: ordersReducer,
});
