import React, {useCallback, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { API_ENDPOINTS } from '../../constants';
import {fetchMenuItems} from '../../store/actions/menuActions';

/**
 * @function renderContent
 * @param {Array<object>} menuItems
 * @param {Function} editItemAction
 * @returns {JSX.Element}
 * @description Renders menu items and attaches the associated edit item action
 */
const renderContent = ({menuItems = [], editItemAction}) => {

  const content = menuItems.length ? menuItems.map(item => (
    <div
      key={`menu-item-${item._id}`}
    >
      <p>{item.itemName}</p>
      <button
        onClick={() => editItemAction({menuItem: item})}
      >
        Edit
      </button>
    </div>
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
  }, []);

  useEffect(() => {
    fetchItems();
  }, []);

  const addItemAction = useCallback(() => {
    navigate(`${API_ENDPOINTS.MENU_ITEMS}new`);
  }, []);

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
  }, [menuItemStore.data]);

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
