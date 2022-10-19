import axios from 'axios'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import RegImage from '../../../assets/registerScreen.png'
import logo from '../../../assets/logo.png'
import { useNavigate } from "react-router-dom"

export default function OrgSignUp() {
  const navigate = useNavigate()

  function addUser(event){
    event.preventDefault()
    const email=event.target[0].value;
    const name=event.target[1].value;
    const password=event.target[2].value;
    const payload={
      email: email,
      orgName: name,
      password: password
  }
  axios.post('http://localhost:3001/org/auth',payload).then((result)=>{
    console.log(result);
    navigate('/org/login')
  }).catch((err)=>{
    console.log(err);
  })
  }
  return (
    <>
    <div className="regPage">
    <Container fluid>
        <Row>
          <Col>
            <div className="logo">
              <img src={logo} alt="" className='img-fluid' />
            </div>
            <div className="signUpForm">
              <div className="FormHead">
                <h3>Sign Up</h3>
                <p>Create Your Account</p>
              </div>
              <form action="" onSubmit={addUser}>
                <div className="form-group">
                  <input type="email" name="email" required placeholder='Email' id="email" />
                </div>
                <div className="form-group">
                  <input type="text" name="name" required placeholder='School Name e.g KUST' id="name" />
                </div>
                <div className="form-group">
                  <input type="password" name="password" required placeholder='Password' id="password" />
                </div>
                <div className="form-group">
                  <button type='submit'>Sign Up</button>
                </div>
                <div className="form-group">
                  <Link to="/org/login" className='loginlink'>Already Have an Account</Link>
                </div>
              </form>
            </div>
          </Col>
          <Col>
                    <img src={RegImage} alt="" className='img-fluid sideAuthImg' />

          </Col>
        </Row>
      </Container>
    </div>
    </>
  )
}
