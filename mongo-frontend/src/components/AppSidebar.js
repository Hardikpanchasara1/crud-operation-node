/* eslint-disable */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';

import { AppSidebarNav } from './AppSidebarNav';
import { sygnet } from 'src/assets/brand/sygnet';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

// sidebar nav config
import navigation from '../_nav';
// import visitornavigation from '../navigation';

const AppSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // const id = localStorage.getItem('id'); // Fetch the id from localStorage
  // const navigation = id === '0' ? visitornavigation : adminnavigation; // Determine the navigation based on id

  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Successfully Logout!', {
      position: toast.POSITION.TOP_CENTER,
    });
    navigate('/login');
    console.log('You are logged out');
    console.log(localStorage.getItem('token')); // Add this line to check if the token is removed
  };
  
  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible });
      }}
    >
      <CSidebarBrand className="dashboard-logo" to="/">
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav location={location} navigate={navigate} items={navigation} handleLogout={handleLogout} />
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  );
};

export default AppSidebar;
