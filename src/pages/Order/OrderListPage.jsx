import React, {useCallback, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { API_ENDPOINTS } from '../../constants';
import {fetchOrders} from '../../store/actions/orderActions';

/**
 * @function RenderOrder
 * @param {Array<object>} orders
 * @param {Function} viewOrderAction
 * @returns {JSX.Element}
 * @description renders the list of orders
 */
const RenderOrder = ({orders = [], viewOrderAction}) => {

  const content = orders.map(order => (
    <div
      key={`order-${order._id}`}
    >
      <p>Order #: {order._id}</p>
      <p>Order Status: {order.orderStatus}</p>
      <p>Order Location: {order.relatedLocation.locationName}</p>
      <p>Customer: {order.relatedUser.username}</p>
      <p>Order Date: {order.orderDate}</p>
      <button
        onClick={e => viewOrderAction({order})}
      >
        View / Update Order Status
      </button>
    </div>
  ));

  return (
    <div>
      {content}
    </div>
  );
};

/**
 * @function OrderListPage
 * @returns {JSX.Element}
 * @description Renders a list of orders with the abiility to update order status
 */
export default function OrderListPage() {

  const dispatch = useDispatch();
  const ordersStore = useSelector(state => state.orders);
  const navigate = useNavigate();

  /**
   * @function getOrders
   * @returns {void}
   * @description Dispatches the action to retrieve orders
   */
  const getOrders = useCallback(() => {
    dispatch(fetchOrders({queryObject: {}}));
  }, [dispatch]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  /**
   * @function viewOrderAction
   * @returns {void}
   * @description handles viewing the order
   */
  const viewOrderAction = useCallback(({order}) => {
    if(!order) return;
    navigate(`${API_ENDPOINTS.ORDERS}${order._id}`, {
      state: {
        order
      },
    });
  }, [navigate]);

  const contentProps = {orders: ordersStore.data, viewOrderAction};

  return (
    <div>
      <h1>Orders</h1>
      <button onClick={getOrders}>Refresh</button>
      <RenderOrder {...contentProps} />
    </div>
  );
}
