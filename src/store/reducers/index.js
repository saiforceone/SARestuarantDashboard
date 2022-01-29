import { combineReducers } from 'redux';

import appReducer from './appReducer';
import menuItemReducer from './menuItemReducer';
import ordersReducer from './ordersReducer';
import restaurantsReducer from './restaurantsReducer';

export default combineReducers({
  app: appReducer,
  menu: menuItemReducer,
  orders: ordersReducer,
  restaurants: restaurantsReducer,
});
