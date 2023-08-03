/* eslint-disable */
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CFormInput,
  CRow,
  CCol,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CHeader position="sticky" className="headermain mb-4">
      <CContainer fluid>
        <CHeaderToggler
          classNameName="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon className="header-tog" icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand classNameName="mx-auto d-md-none" to="/">
            
        </CHeaderBrand>
        
        {/* <CHeaderNav  className="d-none d-md-flex me-auto"> */}
        
        {/* <CRow>
          <CCol  xs lg={2}> */}
          <div className="container">

            <div className="row height d-flex justify-content-center align-items-center">

              <div className="col-md-6">

                <div className="form">
                  <i className="fa fa-search"></i>
                  <input type="text" className="form-control form-input" placeholder="Search anything..." />
                </div>
                
              </div>
              
            </div>
          </div>
          {/* </CCol>
        </CRow> */}
        
        {/* </CHeaderNav> */}
        
        <CHeaderNav classNameName="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      {/* <CHeaderDivider /> */}
      
    </CHeader>
  )
}

export default AppHeader
