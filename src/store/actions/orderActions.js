import { API_ENDPOINTS } from '../../constants';
import { fetchAction } from './helpers';

/**
 * @function fetchLocations
 * @returns {Function}
 * @description Fetches restaurant locations and updates the reducer as required
 */
export const fetchOrders = ({queryObject}) => fetchAction({
  endpoint: API_ENDPOINTS.ORDERS,
  queryObject,
  reducerPrefix: 'ORDERS',
  requiresAuth: true,
});
