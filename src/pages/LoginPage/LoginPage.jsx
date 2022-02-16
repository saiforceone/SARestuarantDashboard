import React, {useCallback, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {Button, Card, Form} from 'react-bootstrap';
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
    <Card className='container p-4' style={{width: '50%'}}>
      <Card.Body>
      <h4 className='text-center'>Login to SuperAwesomeRestaurant Admin</h4>
      <Form onSubmit={e => e.preventDefault()}>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='username-field'>
            Username *
          </Form.Label>
          <Form.Control
            disabled={appStore.isAuthenticating}
            onChange={e => setUsername(e.target.value)}
            name='username-field'
            placeholder='Username'
            type='text'
            value={username}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password-field'>
            Password *
          </Form.Label>
          <Form.Control
            disabled={appStore.isAuthenticating}
            onChange={e => setPassword(e.target.value)}
            name='password-field'
            placeholder='********'
            type='password'
            value={password}
          />
        </Form.Group>
        <div className='d-grid'>
          <Button
            variant='success'
            disabled={appStore.isAuthenticating}
            onClick={onAuth}
          >
            Login
          </Button>
        </div>
      </Form>
      </Card.Body>
    </Card>
  );
};

export default LoginPage;
