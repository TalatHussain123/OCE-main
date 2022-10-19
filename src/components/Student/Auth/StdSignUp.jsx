import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import RegImage from '../../../assets/registerScreen.png'
import logo from '../../../assets/logo.png'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

export default function StdSignUp() {
  const navigate = useNavigate()

  function regStd(event){
    event.preventDefault()
    const email=event.target[0].value;
    const name=event.target[1].value;
    const password=event.target[2].value;
    const payload={
      email: email,
      name: name,
      password: password
  }
  axios.post('http://localhost:3001/condidate/auth',payload).then((result)=>{
    console.log(result);
    navigate('/condidate/login')
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
              <form action="" onSubmit={regStd}>
                <div className="form-group">
                  <input type="email" name="email" placeholder='Email' id="email" />
                </div>
                <div className="form-group">
                  <input type="text" name="name" id="name" placeholder="Name" />
                </div>
                <div className="form-group">
                  <input type="password" name="password" id="password"  placeholder='Password'/>
                </div>
                <div className="form-group">
                  <button type='submit'>Sign Up</button>
                </div>
                <div className="form-group">
                  <Link to="/condidate/login" className='loginlink'>Already Have an Account</Link>
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
