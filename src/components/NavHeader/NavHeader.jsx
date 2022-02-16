import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Modal, Nav} from 'react-bootstrap';
import {
  ArrowLeft as GoBackIcon,
  HouseFill as Logo,
  Power as LogoutIcon
} from 'react-bootstrap-icons';
import { checkSession, logoutAction } from '../../store/actions/appActions';

/**
 * @function NavHeader
 * @returns {JSX.Element}
 * @description Renders the header that conditionally shows the nav links or a link to login if unauthorized
 */
const NavHeader = () => {

  const [activeKey, setActiveKey] = useState('/menu-items');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const appStore = useSelector(state => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const {pathname} = location;
    if (pathname) {
      setActiveKey(pathname);
    }

    dispatch(checkSession());
  }, [dispatch]);

  /**
   * @function executeLogout
   * @description Handles logging the user out. clears all reducers states and nav to login page
   */
  const executeLogout = useCallback(() => {
    setShowLogoutModal(false);
    dispatch(logoutAction({navigate}));
  }, [dispatch, showLogoutModal]);

  const executeLogin = useCallback(() => {

  }, []);

  return (
    <Nav
      className='d-flex justify-content-between p-2'
      variant='pills'
      activeKey={activeKey}
    >
      <div className='d-inline-flex align-items-baseline'>
        <Logo className='me-2' />
        <h6 className='me-3'>SA Admin</h6>
        {appStore.userProfile && (
          <React.Fragment>
            <Nav.Item>
              <Link className='nav-link' to='/menu-items'>
                Menu Items
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link className='nav-link' to="/orders">
                Orders
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link className='nav-link' to="/restaurant-locations">
                Locations
              </Link>
            </Nav.Item>
        </React.Fragment>
        )}
      </div>
      <Button
        onClick={
          appStore.userProfile 
            ? () => setShowLogoutModal(true)
            : () => executeLogin()
        }
        variant='primary'
      >
        {appStore.userProfile ? 'Logout' : 'Login'}
      </Button>
      <Modal
        onHide={() => setShowLogoutModal(false)}
        show={showLogoutModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Logout?</Modal.Title>
        </Modal.Header>
        <Modal.Body>This Super Awesome Restaurant Admin dashboard can't do admin things by itself. Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            <GoBackIcon className='me-2' />
            No
          </Button>
          <Button variant="danger" onClick={executeLogout}>
            <LogoutIcon className='me-2' />
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Nav>
  );
};

export default NavHeader



