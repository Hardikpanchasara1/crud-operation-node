/* eslint-disable */
import React, { Component, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom' // Import the Navigate component
import './scss/style.scss'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProtectedRoute from './auth/ProtectedRoute'
import './scss/style.scss'
import './views/css/mansi.css'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const Auth = React.lazy(() => import('./auth/Auth.js'))

class App extends Component {
  render() {
    return (
      <Router>
        <Suspense fallback={loading}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/404" element={<Page404 />} />
            <Route path="/500" element={<Page500 />} />
            {/* <Route element={<ProtectedRoute />}> */}
              {/* <Route element={<Auth />}> */}
                <Route path="/*" element={<DefaultLayout />} />
                <Route path="/*" element={<Navigate to="/*" replace />} />
              {/* </Route> */}
            {/* </Route> */}  
          </Routes>
        </Suspense>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
          style={{ maxHeight: '50px' }}
        />
      </Router>
    )
  }
}

export default App
