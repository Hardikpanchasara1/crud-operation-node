/*eslint-disable */
import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import Loginlogo from '../../../assets/images/login/dummy-logo.webp'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  // Inside the validateForm function:

  const validateForm = () => {
    let valid = true
    if (!email) {
      setEmailError('Please enter the email')

      valid = false
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email')
      valid = false
    } else {
      setEmailError('')
    }
    if (!password) {
      setPasswordError('Please enter the password')
      valid = false
    } else {
      setPasswordError('')
    }
    return valid
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      try {
        const response = await axios.post(
          'http://localhost:5000/user/login',
          { email, password },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        const { role } = response.data
        console.log(response.data.role)
        localStorage.setItem('role', role)

        if (role === 0) {
          console.log('user logged in')
          // navigate('/login')
          navigate('/dashboard')
          toast.success('Successfully Login!', {
            // position: toast.POSITION.TOP_CENTER,
          })
        } else if (role === 1) {
          console.log('Admin logged in')
          navigate('/dashboard')
          toast.success('Successfully Login!', {
            // position: toast.POSITION.TOP_CENTER,
          })
        } else if (role === 2) {
          console.log('Master Admin logged in')
          navigate('/dashboard')
          toast.success('Successfully Login!', {
            // position: toast.POSITION.TOP_CENTER,
          })
        }

        const userdata = response.data

        localStorage.setItem('token', userdata.Token)
      } catch (error) {
        toast.error('Invalid Email And Password!', {
          // position: toast.POSITION.TOP_CENTER,
        })
      }
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      navigate('/dashboard')
    }
  }, [navigate])

  return (
    <>
      <Logincompo className="bg-login d-flex justify-content-center align-items-center ">
        <div className="login-padding py-3 py-sm-4 px-0 px-sm-5 text-center">
          <div className="content w-75 mx-auto">
            <img src={Loginlogo} alt="logo" className=" m-2 m-sm-3 p-2 p-sm-3 img-logo "  />
            <h2 className="login-heading m-sm-3 m-2">Login Page</h2>

            <Form onSubmit={handleSubmit}>
              <Form.Group
                className=" d-flex align-items-start flex-column"
                controlId="formBasicEmail"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                placeholder="Email Id"
              >
                <Form.Label className="inp-label mt-3">
                  Email address <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control type="text" placeholder="Enter email" className="login-input" />
              </Form.Group>
              {emailError && <p className="error">{emailError}</p>}

              <Form.Group
                className=" d-flex align-items-start flex-column"
                controlId="formBasicPassword"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
              >
                <Form.Label className="inp-label mt-3">
                  Password <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  className="login-input"
                />
                {showPassword ? (
                  <i
                    className="fa-solid fa-eye email-password-icon "
                    onClick={() => setShowPassword(!showPassword)}
                  ></i>
                ) : (
                  <i
                    className="  fa-solid fa-eye-slash email-password-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  ></i>
                )}
              </Form.Group>
              {passwordError && <p className="error">{passwordError}</p>}

              <button className="login-btn my-4">Login</button>

              <div className="sign-in-suggetion">
                <p>
                  New to our platform? <Link to="/register">Create an account</Link>
                </p>
                {/* <p>
                  <Link>Forgot password?</Link>
                </p> */}
              </div>
            </Form>
          </div>
        </div>
      </Logincompo>
    </>
  )
}

const Logincompo = styled.div`
  color: black;
  width: 100%;
  min-height: 100vh;
  background-color: #0b699e;
  background-image: linear-gradient(to right top, #0b699e, #1ef08d);
  .img-logo{
    width: 50%;
  }
  .email-password-icon {
    margin-bottom: -15px;
    position: relative;
    top: -35px;
    left: 85%;
  }
  .login-padding {
    background-color: white;
    border: none;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    /* min-width: 450px; */
    min-width: 576px;
    &:hover {
      box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
      transform: translateY(-2px);
      transition: all 0.2s;
    }
  }
  .login-heading {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 40px;
    font-weight: 700;
    line-height: 52px;
    letter-spacing: 0em;
  }
  .inp-label {
    font-size: 21px;
    font-weight: 600;
    line-height: 27px;
    letter-spacing: 0em;
    text-align: center;
  }
  .login-input {
    min-height: 58px;
    border: 3px solid #9ee7e3;
    border-radius: 10px;
    &:focus {
      outline: #9ee7e3 solid 2px;
      transition: all 0.2s;
    }
  }
  .login-btn {
    min-height: 58px;
    border: none;
    border-radius: 10px;
    background-color: #0f9299;
    color: black;
    width: 100%;
    font-size: 21px;
    font-weight: 600;
    line-height: 27px;
    letter-spacing: 0em;
    text-align: center;
    &:hover {
      background-color: black;
      transition: all 0.5s;
      color: white;
    }
  }
  .error {
    margin: 0px;
    text-align: start;
    color: red;
  }
  @media (max-width: 768px) {
    .login-heading {
      font-size: 32px;
      line-height: 52px;
    }
    .inp-label {
      font-size: 18px;
      line-height: 27px;
    }
    .login-input {
      min-height: 58px;
    }
    .login-btn {
      min-height: 58px;
      width: 100%;
      font-size: 18px;
      line-height: 27px;
    }
  }
  @media (max-width: 576px) {
    .email-password-icon {
      left: 80%;
    }
    .login-padding {
      min-width: 80%;
    }
    .login-heading {
      font-size: 26px;
      line-height: 52px;
    }
    .inp-label {
      font-size: 16px;
      line-height: 27px;
    }
    .login-input {
      min-height: 58px;
    }
    .login-btn {
      min-height: 58px;
      width: 100%;
      font-size: 16px;
      line-height: 27px;
    }
    .sign-in-suggetion{
      font-size: 12px;
    }
  }
`

export default Login
