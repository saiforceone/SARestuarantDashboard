import React, {useCallback, useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router';
import { Form } from 'react-bootstrap';
import { CheckCircleFill as SaveIcon } from 'react-bootstrap-icons';
import { API_ENDPOINTS } from '../../constants';
import APIUtils from '../../utils/APIUtils';
import { FIELD_TYPES, RestaurantStructure } from '../../utils/FormUtils';
import PageHeader from '../../components/PageHeader/PageHeader';

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
    let formControl;
    if (field.fieldType === FIELD_TYPES.TEXT_ID) {
      formControl = (
        <Form.Control
          className='mb-3'
          key={`form-field-${index}`}
          value={restaurantData[field.valueKey]}
          {...field.fieldProps}
        />
      );
    }
    if (field.fieldType === FIELD_TYPES.TEXT) {
      formControl = (
        <Form.Control
          className='mb-3'
          key={`form-field-${index}`}
          onChange={e => onEditFormData({key: field.valueKey, value: e.target.value})}
          value={restaurantData[field.valueKey]}
        />
      );
    }
    if (field.fieldType === FIELD_TYPES.TEXT_ARRAY) {
      formControl = (
        <Form.Control
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
        let innerFormControl;
        if (innerField.fieldType === FIELD_TYPES.TEXT) {
          let actualValue;

          if(restaurantData[field.parentValueKey]) {
            if (restaurantData[field.parentValueKey][innerField.valueKey]) {
              actualValue = restaurantData[field.parentValueKey][innerField.valueKey]
            }
          }

          innerFormControl = (
            <Form.Control
              className='mb-2'
              key={`form-field-${index}-grouped-${innerFieldIndex}`}
              onChange={e => onEditFormData({
                key: `${field.parentValueKey}.${innerField.valueKey}`,
                value: e.target.value,
                isMultipartKey: true,
              })}
              value={actualValue}
            />
          );
        }

        return (
          <Form.Group key={`form-group-inner-${innerField.valueKey}`}>
            <Form.Label
              className='text-decoration-underline'
              key={`form-label-${innerField.valueKey}`}
            >
              {innerField.label}
            </Form.Label>
            {innerFormControl}
          </Form.Group>
        );
      });

      return (
        <div key={`inner-container-${index}`}>
          <Form.Label
            key={`inner-label-${index}`}
          >
            <strong>{field.label}</strong>
          </Form.Label>
          {groupedFields}
        </div>
      );
    }
    if (field.fieldType === FIELD_TYPES.SELECT) {
      formControl = (
        <Form.Select
          className='mb-3'
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
        </Form.Select>
      )
    }

    return (
      <Form.Group className='mb-4' key={`field-group-${index}`}>
        <Form.Label><strong>{field.label}</strong></Form.Label>
        {formControl}
      </Form.Group>
    );
  });

  return (
    <Form onSubmit={e => e.preventDefault()}>
      {formToRender}
    </Form>
  );
};

/**
 * @function RestaurantLocationEditPage
 * @returns {JSX.Element}
 * @description Renders an edit form for creating a new or editing an existing restautant location
 */
const RestaurantlocationEditPage = () => {

  const [resourceId, setResourceId] = useState(undefined);
  const [restaurantData, setRestaurantData] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      setResourceId(params.id);
    }
    
    const {state} = location;

    if (state) {
      const {location: restaurantLocation} = state;
      if (restaurantLocation) {
        setRestaurantData(restaurantLocation);
        if(!resourceId) setResourceId(restaurantLocation._id);
      } else {
        alert('Something went wrong with loading restaurant data');
      }
    } else {
      setRestaurantData(RestaurantStructure().emptyData);
    }
  }, [location, params, resourceId]);

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
      if (keyParts.length === 2) {
        // Note: maybe destructure the object here using key parts?
        if (dataCopy[keyParts[0]]) {
          dataCopy[keyParts[0]][keyParts[1]] = value; // TODO: find a better to do this :'(
        } else {
          dataCopy[keyParts[0]] = {
            [keyParts[1]]: value
          };
        }
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

      alert(
        response.success 
          ? 'Successfully saved the restaurant location. You will be redirected to the listing automatically.'
          : 'Well sh*t. That didn\'t work :('
      );
      
      if (response.success) {
        navigate('/restaurant-locations', {
          replace: true,
        });
      }
    }).catch(error => {
      alert(`There was an unexpected error. ${error}`);
    });
  }, [restaurantData, resourceId]);

  return (
    <div className='p-2'>
      <PageHeader
        heading={`${resourceId ? 'Edit Restaurant' : 'Add New Restaurant'}`}
        subheading={`Resturant Name: ${restaurantData ? restaurantData.locationName : '[Name Not Set]'}`}
        backButtonAction={() => navigate(-1)}
        actionsContainer={
          <React.Fragment>
            <button
              className='btn btn-primary'
              onClick={onSaveAction}
            >
              <SaveIcon className='me-2' />
              Save Restaurant
            </button>
          </React.Fragment>
        }
      />
      {renderEditForm({restaurantData, onEditFormData, onSaveAction})}
    </div>
  );
};

export default RestaurantlocationEditPage;
