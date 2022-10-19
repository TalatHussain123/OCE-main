import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import RegImage from '../../../assets/registerScreen.png'
import logo from '../../../assets/logo.png'
import axios from 'axios'
import { useNavigate } from "react-router-dom"


export default function StdLogin() {
  const navigate = useNavigate()

  function getUser(event){
    event.preventDefault();
    const email=event.target[0].value;
    const password=event.target[1].value;
    const payload={
      email: email,
      password: password
  }
    axios.post('http://localhost:3001/condidate/login',payload).then((result)=>{
      localStorage.setItem('Slog_id', result.data.access_Token);
      localStorage.setItem('sid', result.data.id);
      console.log(result);
      navigate(`/std/${result.data.id}/home`)
    }).catch((err)=>{
      console.log(err);
      alert('wrong entry')
    })
  }
  return (
    <>
    <div className="loginpage">
    <Container fluid>
        <Row>
          <Col>
                         <div className="logo">
              <img src={logo} alt="" className='img-fluid' />
            </div>
            <div className="signUpForm">
              <div className="FormHead">
                <h3>Welcome Back</h3>
                <p>Please Log in to your Account</p>
              </div>
              <form action="" on onSubmit={getUser}>
                <div className="form-group">
                  <input type="email" name="email" id="email" />
                </div>
                <div className="form-group">
                  <input type="password" name="password" id="password" />
                </div>
                <div className="form-group loginBtn">
                                    <button type='submit' className='btn'>Login</button>

                  <Link to='/condidate/register' className="btn">Create Account</Link>
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
