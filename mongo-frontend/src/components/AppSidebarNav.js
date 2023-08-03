/* eslint-disable */
import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import { CBadge, CNavItem, CNavLink } from '@coreui/react'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'

export const AppSidebarNav = ({ items, location, navigate }) => {
  const useHandleLogout = () => {
    localStorage.removeItem('token')
    toast.success('Successfully Logout!', {
      position: toast.POSITION.TOP_CENTER,
    })
    navigate('/login')
    console.log('you are logged out')
    console.log(localStorage.getItem('token')) // Add this line to check if the token is removed
  }

  const navLink = (name, icon, badge, onClick) => {
    return (
      <>
        {icon && icon}
        {name && <span onClick={onClick === 'logout' ? useHandleLogout : undefined}>{name}</span>}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const navItem = (item, index) => {
    const { component: Component, name, badge, icon, onClick, ...rest } = item
    // const Component = component
    return (
      <Component
        {...(rest.to &&
          !rest.items && {
          component: NavLink,
        })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge, onClick)}
      </Component>
    )
  }
  const navGroup = (item, index) => {
    const { component: Component, name, icon, to, ...rest } = item
    // const Component = component
    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index),
        )}
      </Component>
    )
  }

  return (
    <React.Fragment>
      {items &&
        items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
      <CNavItem>
        <CNavLink to="/login" onClick={useHandleLogout} style={{ cursor: 'pointer' }}>
          <FontAwesomeIcon icon={faSignOut} rotation={180} style={{ paddingLeft: '20px' }} />
          Logout
        </CNavLink>
      </CNavItem>
    </React.Fragment>
  )
}

// AppSidebarNav.propTypes = {
//   items: PropTypes.arrayOf(PropTypes.any).isRequired,
// }

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  location: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired,
}
