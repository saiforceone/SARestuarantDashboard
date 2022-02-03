import React, {useCallback, useEffect, useState} from 'react';
import {useLocation, useParams} from 'react-router';
import { API_ENDPOINTS } from '../../constants';
import APIUtils from '../../utils/APIUtils';

/**
 * @function renderEditForm
 * @param {object} restaurantData 
 * @param {Function} onEditFormData
 * @param {Function} onSaveAction
 * @description Renders the edit form
 */
const renderEditForm = ({restaurantData, onEditFormData, onSaveAction}) => {
  if (!restaurantData) return (
    <div>
      <p>Form unavailable</p>
    </div>
  )
  return (
    <form onSubmit={e => e.preventDefault()}>
      <input disabled value={restaurantData._id} />
      <input 
        onChange={e => onEditFormData({key: 'locationName', value: e.target.value})}
        value={restaurantData.locationName}
      />
      <input
        onChange={e => onEditFormData({key: 'seatingCapacity', value: parseInt(e.target.value)})}
        type='number'
        value={restaurantData.seatingCapacity}
      />
      <button
        onClick={onSaveAction}
      >
        save
      </button>
    </form>
  )
};

/**
 * @function RestaurantLocationEditPage
 * @returns {JSX.Element}
 * @description Renders an edit form for creating a new or editing an existing restautant location
 */
const RestaurantlocationEditPage = () => {

  const [isNew, setIsNew] = useState(true);
  const [resourceId, setResourceId] = useState(undefined);
  const [restaurantData, setRestaurantData] = useState();
  const [isSaving, setIsSaving] = useState(false);
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      setResourceId(params.id);
    }
    
    const {state: {location: restaurantLocation}} = location;
    if (restaurantLocation) {
      setRestaurantData(restaurantLocation);
      if(!resourceId) setResourceId(restaurantLocation._id);
    } else {
      console.log('oops no location data');
    }
  }, []);

  /**
   * @function onEditFormData
   * @param {string} key
   * @param {*} value
   * @description Handles editing form data
   */
  const onEditFormData = useCallback(({key, value}) => {
    const dataCopy = {...restaurantData};
    // TODO: Implement better functionality to update based on form data structure and field defs
    dataCopy[key] = value;

    setRestaurantData(dataCopy);
  }, [restaurantData]);

  /**
   * @function onSaveAction
   * @description attempts to save the restaurant location
   */
  const onSaveAction = useCallback(() => {
    if (!restaurantData || !Object.keys(restaurantData).length) {
      return alert('Unable to save data');
    }
    APIUtils.saveOrUpdateResource({
      endpoint: API_ENDPOINTS.LOCATIONS,
      id: resourceId,
      data: {data: restaurantData},
    }).then(response => {
      console.log('save restaraunt response: ', response);
    }).catch(error => {
      console.log('save error: ', error);
    })
  }, [restaurantData]);

  return (
    <div>
      {renderEditForm({restaurantData, onEditFormData, onSaveAction})}
    </div>
  );
};

export default RestaurantlocationEditPage;
