import React, {useCallback, useEffect, useState} from 'react';
import {useLocation, useParams} from 'react-router';
import { API_ENDPOINTS } from '../../constants';
import APIUtils from '../../utils/APIUtils';
import { FIELD_TYPES, RestaurantStructure } from '../../utils/FormUtils';

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
  );

  const formToRender = RestaurantStructure().formFieldDefs.map((field, index) => {
    if (field.fieldType === FIELD_TYPES.TEXT_ID) {
      return (
        <input
          key={`form-field-${index}`}
          value={restaurantData[field.valueKey]}
          {...field.fieldProps}
        />
      );
    }
    if (field.fieldType === FIELD_TYPES.TEXT) {
      return (
        <input 
          key={`form-field-${index}`}
          onChange={e => onEditFormData({key: field.valueKey, value: e.target.value})}
          value={restaurantData[field.valueKey]}
        />
      );
    }
    if (field.fieldType === FIELD_TYPES.TEXT_ARRAY) {
      return (
        <input
          key={`form-field-${index}`}
          onChange={e => {
            onEditFormData({
              key: field.valueKey,
              value: e.target.value.split(','),
            });
          }}
          value={restaurantData[field.valueKey]}
        />
      )
    }
    if (field.fieldType === FIELD_TYPES.FIELD_GROUP) {
      const groupedFields = field.fields.map((innerField, innerFieldIndex) => {
        if (innerField.fieldType === FIELD_TYPES.TEXT) {
          return (
            <input
              key={`form-field-${index}-grouped-${innerFieldIndex}`}
              onChange={e => onEditFormData({
                key: `${field.parentValueKey}.${innerField.valueKey}`,
                value: e.target.value,
                isMultipartKey: true,
              })}
              value={restaurantData[field.parentValueKey][innerField.valueKey]}
            />
          );
        }
      });

      return (
        <div>
          <p>{field.label}</p>
          {groupedFields}
        </div>
      );
    }
    if (field.fieldType === FIELD_TYPES.SELECT) {
      return (
        <select
          key={`form-field-${index}`}
          onChange={e => onEditFormData({key: field.valueKey, value: e.target.value})}
          value={restaurantData[field.valueKey]}
        >
          <option value=''>Select a Value</option>
          {Array.isArray(field.selectValues) ? field.selectValues.map((optionField, optIndex) => (
            <option key={`field-${index}-opt-${optIndex}`} value={optionField.value}>
              {optionField.label}
            </option>
          )) : undefined }
        </select>
      )
    }
  });

  return (
    <form onSubmit={e => e.preventDefault()}>
      {formToRender}
      <button
        onClick={onSaveAction}
      >
        save
      </button>
    </form>
  );
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
   * @param {string} key The key that should be updated with the given value
   * @param {*} value The value that should be set for the given key
   * @param {boolean} isMultipartKey Indicates if the key should treated as a multi part key
   * @description Handles editing form data
   */
  const onEditFormData = useCallback(({key, value, isMultipartKey = false}) => {
    const dataCopy = {...restaurantData};
    
    if (isMultipartKey) {
      // assume that keys split on '.'
      const keyParts = key.split('.');
      if (keyParts.length == 2) {
        dataCopy[keyParts[0]][keyParts[1]] = value; // TODO: find a better to do this :'(
      }
    } else {
      dataCopy[key] = value;
    }

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
