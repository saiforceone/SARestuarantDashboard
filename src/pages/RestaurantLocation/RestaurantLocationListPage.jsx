import React, {useCallback, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { fetchLocations } from '../../store/actions/restaurantLocationActions';
import { API_ENDPOINTS } from '../../constants';

/**
 * @function renderRestaurants
 * @param {Array} restaurantLocations
 * @param {Function} onClickAction
 * @description Helper function to render restaurant locations
 */
const renderRestaurants = ({restaurantLocations = [], onClickAction}) => {
  // TODO: replace returned component with custom component
  return restaurantLocations.map(loc => (
    <div
      key={loc._id}
      style={{backgroundColor: '#f4f4f4', padding: 10, marginBottom: 10}}
    >
      <p><strong>{loc.locationName}</strong></p>
      <p>{loc.address.address1}</p>
      <button onClick={() => onClickAction({location: loc})}>
        Edit
      </button>
    </div>
  ));
};

/**
 * @function RestaurantLocationListPage
 * @returns {JSX.Element}
 * @description Lists restaurant locations
 */
const RestaurantLocationListPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const restaurantStore = useSelector(state => state.restaurants);

  const getRestaurants = useCallback(() => {
    dispatch(fetchLocations());
  }, []);

  useEffect(() => {
    getRestaurants();
  }, []);

  /**
   * @function onEditLocation
   * @param {object} location - the location to be edited
   * @description Handles editing a location
   */
  const onEditLocation = useCallback(({location}) => {
    if (!location) return;
    navigate(`${API_ENDPOINTS.LOCATIONS}${location._id}`, {
      state: {
        location,
      },
    });
  }, []);

  return (
    <div>
      <h1>Restaurant Locations List Page</h1>
      <button>Add New Location</button>
      <button onClick={getRestaurants}>Refresh</button>
      {renderRestaurants({
        restaurantLocations: restaurantStore.data,
        onClickAction: onEditLocation
      })}
    </div>
  );
};

export default RestaurantLocationListPage;
