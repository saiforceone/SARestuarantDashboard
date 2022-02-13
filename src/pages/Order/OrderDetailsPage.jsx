import React, {useCallback, useEffect, useState} from 'react';
import { useParams, useLocation, useNavigate } from 'react-router';
import { Form } from 'react-bootstrap';
import {CheckCircleFill as CheckIcon} from 'react-bootstrap-icons';
import APIUtils from '../../utils/APIUtils';
import { API_ENDPOINTS, ORDER_STATUSES } from '../../constants';
import PageHeader from '../../components/PageHeader/PageHeader';

/**
 * @function UpdateStatusControl
 * @param {String} orderStatus
 * @returns {JSX.Element}
 * @description Renders the update status control
 */
const UpdateStatusControl = ({
  orderStatus,
  onUpdateStatus,
  updateStatusAction
}) => {
  return (
    <div className='d-flex align-items-center'>
      <div>
        <Form.Select
          onChange={e => onUpdateStatus({orderStatus: e.target.value})}
          name='order-status'
          value={orderStatus}
        >
          <option value="">Select Status</option>
          {ORDER_STATUSES.map(status => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </Form.Select>
      </div>
      <button
        className='btn btn-primary ms-4'
        onClick={updateStatusAction}
        type='button'
      >
        <CheckIcon className='me-2' />
        Update Order Status
      </button>
    </div>
  );
};

/**
 * @function RenderContent
 * @param {object} orderData
 * @param {String} orderStatus
 * @param {Function} onUpdateStatus
 * @param {Function} updateStatusAction
 * @description Renders the order details with status options and an action to update the status
 */
const RenderContent = ({orderData, orderStatus, onUpdateStatus, updateStatusAction}) => {

  if (!orderData) {
    return <p>Order data unavailable</p>
  }

  return (
    <Form onSubmit={e => e.preventDefault()}>
      <label className='mb-2' htmlFor='order-delivery-notes'>
        <strong>Order #</strong>
      </label>
      <Form.Control
        className='mb-3'
        disabled
        readOnly
        value={orderData._id}
      />
      <label className='mb-2' htmlFor='order-delivery-notes'>
        <strong>Delivery Notes</strong>
      </label>
      <Form.Control
        className='mb-3'
        disabled
        name='order-delivery-notes'
        readOnly
        value={orderData.deliveryNotes}
      />
      <label className='mb-2' htmlFor='order-total'>
        <strong>Order Total</strong>
      </label>
      <Form.Control
        className='mb-3'
        disabled
        name='order-total'
        readOnly
        value={`${orderData.orderTotal}`}
      />
    </Form>
  );
};

/**
 * @function OrderDetailsPage
 * @returns {JSX.Element}
 * @description Page that shows the details of an order and allows for updating the status
 */
export default function OrderDetailsPage() {

  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [orderData, setOrderData] = useState();
  const [orderStatus, setOrderStatus] = useState('');
  const [resourceId, setResourceId] = useState();


  useEffect(() => {
    if (params.id) {
      setResourceId(params.id)
    }
    const {state} = location;
    if (state) {
      setOrderData(state.order);
      setOrderStatus(state.order.orderStatus);
    }
  }, [location, params]);

  /**
   * @function onUpdateStatusAction
   * @returns {void}
   * @description Updates the order status local state
   */
  const onUpdateStatus = useCallback(({orderStatus}) => {
    setOrderStatus(orderStatus);
  }, []);

  /**
   * @function updateStatusAction
   * @returns {void}
   * @description Commits the order status change via the API
   */
  const updateStatusAction = useCallback(() => {
    APIUtils.saveOrUpdateResource({
      endpoint: `${API_ENDPOINTS.ORDERS}`,
      id: resourceId,
      data: {data: {orderStatus}}
    }).then(result => {
      if (result.success) {
        alert('Order status updated') 
      } else {
        alert('Order status was not updated')
      }
    }).catch(e => {
      console.error('Order status failed with error: ', e);
      alert('Failed to update status with error: ', e.message);
    });
  }, [orderStatus, resourceId]);

  const contentProps = {orderData, orderStatus, onUpdateStatus, updateStatusAction}

  return (
    <div className='p-2'>
      <PageHeader
        backButtonAction={() => navigate(-1)}
        heading='Order Details'
        subheading={`Order #: ${orderData ? orderData._id : '[Not Found]'}`}
        actionsContainer={
          <UpdateStatusControl
            updateStatusAction={updateStatusAction}
            onUpdateStatus={onUpdateStatus}
            orderStatus={orderStatus}
          />
        }
      />
      <RenderContent {...contentProps} />
    </div>
  );
};
