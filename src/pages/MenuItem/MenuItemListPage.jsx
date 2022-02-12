import React, {useCallback, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {Badge, Button} from 'react-bootstrap';
import {
  ArrowClockwise as RefreshIcon,
  PencilSquare as PencilIcon,
  PlusCircleFill as PlusIcon,
  StarFill as StarIcon
} from 'react-bootstrap-icons';
import { API_ENDPOINTS } from '../../constants';
import {fetchMenuItems} from '../../store/actions/menuActions';
import { ItemCard } from '../../components/ItemCard/ItemCard';
import PageHeader from '../../components/PageHeader/PageHeader';

/**
 * @function renderContent
 * @param {Array<object>} menuItems
 * @param {Function} editItemAction
 * @returns {JSX.Element}
 * @description Renders menu items and attaches the associated edit item action
 */
const renderContent = ({menuItems = [], editItemAction}) => {

  const content = menuItems.length ? menuItems.map(item => (
    <ItemCard
      key={`menu-item-${item._id}`}
      imageUrl={item.mainImage}
      title={item.itemName}
      cardActions={
        <React.Fragment>
          <Button
            onClick={() => editItemAction({menuItem: item})}
            variant='primary'
          >
            <PencilIcon className='me-2' />
            Edit
          </Button>
        </React.Fragment>
      }
      extraContent={
        <React.Fragment>
          <Badge bg='secondary'>${item.baseCost}</Badge>
          <Badge bg='secondary' className='ms-2'>
            <StarIcon className='me-2' />
            <span>{item.averageRating}</span>
          </Badge>
        </React.Fragment>
      }
    />
  )) : (
    <p>No menu items</p>
  );

  return (
    <div>
      {content}
    </div>
  );
}

/**
 * @function MenuItemListPage
 * @returns {JSX.Element}
 * @description Renders the menu item list page
 */
const MenuItemListPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuItemStore = useSelector(state => state.menu);

  const fetchItems = useCallback(() => {
    dispatch(fetchMenuItems());
  }, [dispatch]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const addItemAction = useCallback(() => {
    navigate(`${API_ENDPOINTS.MENU_ITEMS}new`);
  }, [navigate]);

  /**
   * @function editItemAction
   * @param {object} item The item we want to edit
   * @returns {void}
   * @description Handles the action for editing a menu item
   */
  const editItemAction = useCallback(({menuItem}) => {
    if (!menuItem) return;
    navigate(`${API_ENDPOINTS.MENU_ITEMS}${menuItem._id}`, {
      state: {menuItem},
    });
  }, [navigate]);

  return (
    <div>
      <PageHeader
        heading='Menu Items'
        subheading={`Items Found: ${menuItemStore.data.length}`}
        actionsContainer={
          <React.Fragment>
            <Button onClick={addItemAction}>
              <PlusIcon className='me-2' />
              Add Menu Item
            </Button>
            <Button className='ms-2' onClick={fetchItems}>
              <RefreshIcon className='me-2' />
              Refresh
            </Button>
          </React.Fragment>
        }
      />
      {renderContent({menuItems: menuItemStore.data, editItemAction})}
    </div>
  );
};

export default MenuItemListPage;
