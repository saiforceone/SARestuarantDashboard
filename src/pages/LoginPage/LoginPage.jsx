import React, {useCallback, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { loginUserAction } from '../../store/actions/appActions';
import StorageUtils, {STORAGE_CONSTANTS} from '../../utils/StorageUtils';

/**
 * @function LoginPage
 * @returns {JSX.Element}
 * @description Renders a login page, duh -_-
 */
const LoginPage = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const appStore = useSelector(state => state.app);
  const navigate = useNavigate();

  useEffect(() => {
    const tokenData = StorageUtils.getValueFromStorage({
      key: STORAGE_CONSTANTS.KEY_AUTH_TOKEN,
    });
    if (tokenData.data) {
      return navigate('/dashboard', {replace: true});
    }
  }, [navigate]);

  /**
   * @function onAuth
   * @description Handles logging in
   */
  const onAuth = useCallback(() => {
    
    if (!username.trim().length || !password.trim().length) {
      return alert('Missing credentials');
    }

    dispatch(loginUserAction({
      username,
      password,
      navigate,
    }));
  }, [username, password, dispatch, navigate])

  return (
    <div>
      <p>Login to SuperAwesomeRestaurant Admin</p>
      <input
        disabled={appStore.isAuthenticating}
        onChange={e => setUsername(e.target.value)}
        placeholder='Username'
        type='text'
        value={username}
      />
      <input
        disabled={appStore.isAuthenticating}
        onChange={e => setPassword(e.target.value)}
        placeholder='********'
        type='password'
        value={password}
      />
      <button
        disabled={appStore.isAuthenticating}
        onClick={onAuth}
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
