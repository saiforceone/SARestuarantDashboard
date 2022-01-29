import { API_ENDPOINTS } from '../../constants';
import { fetchAction } from './helpers';

/**
 * @function fetchMenuItems
 * @returns {Function}
 * @description Fetches menu items and updates the reducer as required
 */
export const fetchMenuItems = () => fetchAction({
  endpoint: API_ENDPOINTS.MENU_ITEMS,
  reducerPrefix: 'MENU_ITEMS',
});
