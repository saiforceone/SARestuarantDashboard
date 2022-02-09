import React, {useCallback, useEffect, useState} from 'react';
import { useParams, useLocation } from 'react-router';
import APIUtils from '../../utils/APIUtils';
import { API_ENDPOINTS, ORDER_STATUSES } from '../../constants';

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
    <div>
      <p>Order #: {orderData._id}</p>
      <p><strong>Delivery Notes: </strong>{orderData.deliveryNotes}</p>
      <p><strong>Order Total: </strong>${orderData.orderTotal}</p>
      <select
        onChange={e => onUpdateStatus({orderStatus: e.target.value})}
        value={orderStatus}
      >
        <option value="">Select Status</option>
        {ORDER_STATUSES.map(status => (
          <option key={status.value} value={status.value}>
            {status.label}
          </option>
        ))}
      </select>
      <button onClick={updateStatusAction}>
        Update Order Status
      </button>
    </div>
  );
};

/**
 * @function OrderDetailsPage
 * @returns {JSX.Element}
 * @description Page that shows the details of an order and allows for updating the status
 */
export default function OrderDetailsPage() {

  const location = useLocation();
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
    <div>
      <h2>Order Detail</h2>
      <RenderContent {...contentProps} />
    </div>
  );
}
