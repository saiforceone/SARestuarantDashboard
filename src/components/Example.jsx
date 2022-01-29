import React, {useCallback, useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchLocations } from '../store/actions/restaurantLocationActions';
import { fetchMenuItems } from '../store/actions/menuActions';
import { loginUserAction, logoutAction } from '../store/actions/appActions';

/**
 * @function Example
 * @returns {JSX.Element}
 * @description This component is just to help test stuff and will be deleted
 */
const Example = () => {
  const dispatch = useDispatch();
  const restaurantsStore = useSelector(state => state.restaurants);
  const appStore = useSelector(state => state.app);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = useCallback(() => {
    dispatch(loginUserAction({
      username,
      password,
    }));
  }, [username, password, dispatch]);

  const onLogout = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchLocations());
    dispatch(fetchMenuItems());
  }, []);

  console.log('restaurant store: ', restaurantsStore);

  return (
    <div>
      <p>This component doesn't really do too much honestly!</p>
      {!appStore.authToken ? (
        <React.Fragment>
          <input
            onChange={e => setUsername(e.target.value)} placeholder='username' value={username}
            />
          <input
            onChange={e => setPassword(e.target.value)} placeholder='password' type='password'
            value={password}
            />
          <button onClick={onLogin}>Log Me In!</button>
        </React.Fragment>
      ) : (
        <button onClick={onLogout}>Logout Now!</button>
      )}
    </div>
  );
};

export default Example;
