import React, {useCallback, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Badge} from 'react-bootstrap';
import {
  ArrowClockwise as RefreshIcon,
  GeoAltFill as LocationIcon,
  PersonFill as UserIcon,
  InfoSquareFill as OrderStatusIcon,
  WalletFill as MoneyIcon,
} from 'react-bootstrap-icons';
import { useNavigate } from 'react-router';
import { API_ENDPOINTS } from '../../constants';
import PageHeader from '../../components/PageHeader/PageHeader';
import {fetchOrders} from '../../store/actions/orderActions';
import {ItemCard} from '../../components/ItemCard/ItemCard';
import FormattingUtils from '../../utils/FormattingUtils';

/**
 * @function RenderOrder
 * @param {Array<object>} orders
 * @param {Function} viewOrderAction
 * @returns {JSX.Element}
 * @description renders the list of orders
 */
const RenderOrder = ({orders = [], viewOrderAction}) => {

  const content = orders.map(order => (
    <ItemCard
      key={`order-${order._id}`}
      title={`Order #: ${order._id}`}
      subtitle={`Order Date: ${FormattingUtils.formatAsDate({value: order.orderDate})}`}
      cardActions={
        <React.Fragment>
          <button
            className='btn btn-primary'
            onClick={e => viewOrderAction({order})}
          >
            View / Update Order Status
          </button>
        </React.Fragment>
      }
      extraContent={
        <React.Fragment>
          <Badge bg='primary' className='me-2'>
            <MoneyIcon className='me-1' />
            <span>${order.orderTotal}</span>
          </Badge>
          <Badge bg='secondary' className='me-2'>
            <LocationIcon className='me-1' />
            {order.relatedLocation.locationName}
          </Badge>
          <Badge bg='secondary' className='me-2'>
            <OrderStatusIcon className='me-1' />
            {order.orderStatus}
          </Badge>
          <Badge bg='secondary' className='me-2'>
            <UserIcon className='me-1' />
            {order.relatedUser.username}
          </Badge>
        </React.Fragment>
      }
    />
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
      <PageHeader
        heading='Orders'
        subheading={`Orders found: ${ordersStore.data.length}`}
        actionsContainer={
          <React.Fragment>
            <button
              className='btn btn-primary'
              onClick={getOrders}
            >
              <RefreshIcon className='me-2' />
              Refresh
            </button>
          </React.Fragment>
        }
      />
      <RenderOrder {...contentProps} />
    </div>
  );
}
