import React, { useCallback, useEffect, useState } from 'react';
import {useLocation, useParams} from 'react-router';
import { useNavigate } from 'react-router';
import { API_ENDPOINTS } from '../../constants';
import APIUtils from '../../utils/APIUtils';
import { MenuItemStructure, FIELD_TYPES } from '../../utils/FormUtils';

/**
 * @function renderForm
 * @param {object} menuItemData
 * @param {Function} editDataAction
 * @returns {JSX.Element}
 * @description Renders the edit form
 */
const renderForm = ({menuItemData, editDataAction}) => {

  if (!menuItemData) {
    return (
      <div>
        <p>Oops. Form not ready</p>
      </div>
    )
  }

  const content = MenuItemStructure().formFieldDefs.map(field => {
    if (field.fieldType === FIELD_TYPES.TEXT_ID) {
      return (
        <input
          disabled
          readOnly
          value={menuItemData[field.valueKey]}
        />
      );
    }
    if (field.fieldType === FIELD_TYPES.TEXT) {
      const actualValue = (val) => {
        return field.fieldType === 'number' 
          ? parseFloat(val)
          : val
      }
      
      return (
        <input
          placeholder={field.label}
          onChange={e => editDataAction({key: field.valueKey, value: actualValue(e.target.value)})}
          value={menuItemData[field.valueKey]}
        />
      );
    }

    return (
      <div/>
    );
  });

  return (
    <div>
      {content}
    </div>
  );
};

/**
 * @function MenuitemEditPage
 * @returns {JSX.Element}
 * @description Renders the page and form to edit a menu item
 */
export default function MenuItemEditPage() {

  const [menuItemData, setMenuItemData] = useState();
  const [resourceId, setResourceId] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    console.log('params: ', params);
    console.log('location: ', location);
    if (params.id) {
      setResourceId(params.id);
    }

    const {state} = location;
    if (state) {
      const {menuItem} = state;
      if (menuItem) {
        setMenuItemData(menuItem);
      }
    } else {
      setMenuItemData(MenuItemStructure().emptyData);
    }
  }, [location, params]);

  /**
   * @function editData
   * @param {String} key
   * @param {String|Number} value
   * @description Handles editing form data and state updates
   */
  const editDataAction = useCallback(({key, value}) => {
    try {
      const dataCopy = {...menuItemData};
      dataCopy[key] = value;
      setMenuItemData(dataCopy);
    } catch(e) {
      console.error('failed to update menu item data: ', e.toString());
    }
  }, [menuItemData]);

  /**
   * @function saveAction
   * @returns {void}
   * @description Attempts to save the menu item
   */
  const saveAction = useCallback(() => {
    APIUtils.saveOrUpdateResource({
      endpoint: MenuItemStructure().targetEndpoint,
      id: resourceId,
      data: {data: menuItemData}
    }).then(result => {
      if (result.success) {
        return navigate(`${API_ENDPOINTS.MENU_ITEMS}`);
      }
      console.error('Failed to save menu item with result: ', result);
    }).catch(e => {
      console.error('Failed to save menu item with error: ', e);
    })
  }, [menuItemData, resourceId, navigate]);

  return (
    <div>
      {renderForm({menuItemData, editDataAction})}
      <button onClick={saveAction}>Save Menu Item</button>
    </div>
  );
}
