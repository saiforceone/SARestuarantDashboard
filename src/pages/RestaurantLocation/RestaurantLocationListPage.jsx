import React, {useCallback, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  PencilSquare as PencilIcon,
  ArrowClockwise as RefreshIcon,
} from 'react-bootstrap-icons';
import { fetchLocations } from '../../store/actions/restaurantLocationActions';
import { API_ENDPOINTS } from '../../constants';
import PageHeader from '../../components/PageHeader/PageHeader';
import { ItemCard } from '../../components/ItemCard/ItemCard';

/**
 * @function renderRestaurants
 * @param {Array} restaurantLocations
 * @param {Function} onClickAction
 * @description Helper function to render restaurant locations
 */
const renderRestaurants = ({restaurantLocations = [], onClickAction}) => {
  return restaurantLocations.map(loc => (
    <ItemCard
      key={`loc-${loc._id}`}
      title={loc.locationName}
      subtitle={loc.address.address1 ? loc.address.address1 : 'No Address Entered'}
      cardActions={
        <React.Fragment>
          <button
            className='btn btn-primary'
            onClick={() => onClickAction({location: loc})}
          >
            <PencilIcon className='me-2' />
            Edit
          </button>
        </React.Fragment>
      }
    />
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
  }, [dispatch]);

  useEffect(() => {
    getRestaurants();
  }, [getRestaurants]);

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
  }, [navigate]);

  return (
    <div>
      <PageHeader
        heading='Restaurants'
        subheading={
          `Restaurant Locations Found: ${restaurantStore.data.length}`
        }
        actionsContainer={
          <React.Fragment>
            <button
              className='btn btn-primary'
            >
              Add New Location
            </button>
            <button
              className='btn btn-primary ms-2'
              onClick={getRestaurants}
            >
              <RefreshIcon className='me-2' />
              Refresh
            </button>
          </React.Fragment>
        }
      />
      
      {renderRestaurants({
        restaurantLocations: restaurantStore.data,
        onClickAction: onEditLocation
      })}
    </div>
  );
};

export default RestaurantLocationListPage;
