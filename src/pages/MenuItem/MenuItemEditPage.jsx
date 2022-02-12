import React, { useCallback, useEffect, useState } from 'react';
import {useLocation, useParams} from 'react-router';
import { useNavigate } from 'react-router';
import {Button, Form as BootstrapForm} from 'react-bootstrap';
import {CheckCircleFill as CheckCircleFillIcon} from 'react-bootstrap-icons';
import {Container, Modal} from 'rsuite';

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
    );
  }

  /**
   * <Form.Group controlId="name-1">
      <Form.ControlLabel>Username</Form.ControlLabel>
      <Form.Control name="name" />
      <Form.HelpText>Required</Form.HelpText>
    </Form.Group>
   */

  const content = MenuItemStructure().formFieldDefs.map(field => {
    let formField;
    if (field.fieldType === FIELD_TYPES.TEXT_ID) {
      formField = (
        <BootstrapForm.Control
          disabled
          name={field.valueKey}
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
      
      formField = (
        <BootstrapForm.Control
          name={field.valueKey}
          placeholder={field.label}
          onChange={formVal => editDataAction({key: field.valueKey, value: actualValue(formVal)})}
          value={menuItemData[field.valueKey]}
        />
      );
    }

    return (
      <BootstrapForm.Group className='mb-3'>
        {field.valueKey === 'mainImage' ? (
          <div>
            <img
              className='img-fluid mb-3'
              style={{objectFit: 'cover', height: 400, width: '100%'}}
              src={menuItemData[field.valueKey]}
            />
          </div>
        ) : (
          <div className='d-flex'>
            <p>No image URL has been specified. Paste one below.</p>
          </div>
        )}
        <BootstrapForm.Label>{field.label}</BootstrapForm.Label>
        {formField}
      </BootstrapForm.Group>
    );
  });

  return (
    <BootstrapForm fluid>
      {content}
    </BootstrapForm>
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
  const [isShowingResultModal, setIsShowingResultModal] = useState(false);
  const [resultModalTitle, setResultModalTitle] = useState('');
  const [resultModalText, setResultModalText] = useState('');
  const [successResult, setSuccessResult] = useState(false);
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
   * @function dismissResultModalAction
   * @description Dismisses the result modal
   */
  const dismissResultModalAction = useCallback(() => {
    setResultModalText('');
    setResultModalTitle('');
    setIsShowingResultModal(false);
    if (successResult) {
      setSuccessResult(false);
      return navigate(`${API_ENDPOINTS.MENU_ITEMS}`);
    }
    setSuccessResult(false);

  }, [navigate, successResult]);

  /**
   * @function saveAction
   * @returns {void}
   * @description Attempts to save the menu item
   */
  const saveAction = useCallback(() => {
    const notSavedTitle = 'Failed to Save Menu Item';
    APIUtils.saveOrUpdateResource({
      endpoint: MenuItemStructure().targetEndpoint,
      id: resourceId,
      data: {data: menuItemData}
    }).then(result => {
      if (result.success) {
        setResultModalTitle('Saved Menu Item');
        setResultModalText(
          'The menu item has been saved. Click ok to go back to the menu list page.'
        );
      } else {
        setResultModalTitle(notSavedTitle);
        setResultModalText('Something did not quite work with saving this menu item.');
      }
      setSuccessResult(result.success);
      console.error('Failed to save menu item with result: ', result);
    }).catch(e => {
      console.error('Failed to save menu item with error: ', e);
      setResultModalTitle(notSavedTitle);
      setResultModalText(
        `An unexpected error occurred while trying to save the menu item: ${e.toString()}`
      );
    }).finally(() => {
      setIsShowingResultModal(true);
    })
  }, [menuItemData, resourceId]);

  return (
    <Container style={{padding: 10}}>
      {renderForm({menuItemData, editDataAction})}
      <Button
        onClick={saveAction}
        style={{marginTop: 10}}
        variant='success'
      >
        <CheckCircleFillIcon className='me-2' />
        Save Menu Item
      </Button>
      <Modal open={isShowingResultModal} onClose={dismissResultModalAction}>
        <Modal.Header>
          <Modal.Title>{resultModalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {resultModalText}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={dismissResultModalAction} appearance="primary">
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
