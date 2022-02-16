import React, {useEffect} from 'react';
import { Route, Routes } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import MenuItemListPage from '../../pages/MenuItem/MenuItemListPage';
import MenuItemEditPage from '../../pages/MenuItem/MenuItemEditPage';
import OrderListPage from '../../pages/Order/OrderListPage';
import OrderDetailsPage from '../../pages/Order/OrderDetailsPage';
import RestaurantLocationListPage from '../../pages/RestaurantLocation/RestaurantLocationListPage';
import RestaurantlocationEditPage from '../../pages/RestaurantLocation/RestaurantLocationEditPage';
import StorageUtils, { STORAGE_CONSTANTS } from '../../utils/StorageUtils';
import { checkSession } from '../../store/actions/appActions';


/**
 * @function NavRoutes
 * @description Renders navigation routes based on user profile availability
 * @returns {JSX.Element}
 */
const NavRoutes = () => {

  const appStore = useSelector(state => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    const localTokenData = StorageUtils.getValueFromStorage({
      key: STORAGE_CONSTANTS.KEY_AUTH_TOKEN
    });
    if (localTokenData.data) {
      if (!appStore.userProfile) {
        dispatch(checkSession());
      }
    }
  }, [dispatch]);

  return (
    <Routes>
      {
        appStore.userProfile ? (
          <React.Fragment>
            <Route path='/menu-items' element={<MenuItemListPage />} />
            <Route path='/menu-items/:id' element={<MenuItemEditPage />} />
            <Route path='/menu-items/new' element={<MenuItemEditPage />} />
            <Route path='/orders' element={<OrderListPage />} />
            <Route path='/orders/:id' element={<OrderDetailsPage />} />
            <Route path='/restaurant-locations' element={<RestaurantLocationListPage />} />
            <Route path='/restaurant-locations/:id' element={<RestaurantlocationEditPage />} />
            <Route path='/restaurant-locations/new' element={<RestaurantlocationEditPage />} />
          </React.Fragment>
        ) : <Route path='*' element={<div>Nope</div>} />
      }
    </Routes>
  );
  
}

export default NavRoutes;
