import React, {useCallback, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logoutAction } from '../../store/actions/appActions';
import StorageUtils, {STORAGE_CONSTANTS} from '../../utils/StorageUtils';

/**
 * @function DashboardPage
 * @returns {JSX.Element}
 * @description Renders the dashboard page
 */
const DashboardPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // TODO: Change this to be a custom hook
  useEffect(() => {
    const tokenData = StorageUtils.getValueFromStorage({
      key: STORAGE_CONSTANTS.KEY_AUTH_TOKEN,
    });
    if (!tokenData.data) {
      return navigate('/', {replace: true});
    }
  }, [navigate]);

  /**
   * @function Logout
   * @description logs the user out...
   */
  const logout = useCallback(() => {
    dispatch(logoutAction({
      navigate
    }));
  }, [dispatch, navigate]);

  return (
    <div>
      <p>Dashboard page</p>
      <p>Recent Orders</p>
      <button onClick={logout}>Logout?</button>
    </div>
  );
};

export default DashboardPage;
