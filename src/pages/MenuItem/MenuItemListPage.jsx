import React, {useCallback, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {Badge, Button} from 'react-bootstrap';
import {StarFill as StarIcon} from 'react-bootstrap-icons';
import { API_ENDPOINTS } from '../../constants';
import {fetchMenuItems} from '../../store/actions/menuActions';
import { ItemCard } from '../../components/ItemCard/ItemCard';

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
      <h2>Menu Items</h2>
      <button onClick={addItemAction}>Add Menu Item</button>
      <button onClick={fetchItems}>Refresh</button>
      {renderContent({menuItems: menuItemStore.data, editItemAction})}
    </div>
  );
};

export default MenuItemListPage;
