import React,{useEffect} from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import RegImage from '../../../assets/registerScreen.png'
import logo from '../../../assets/logo.png'
import './style.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { useState } from 'react'

export default function OrgLogin() {
  const [err,seterr]=useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    const token=localStorage.getItem('Olog_id')
      axios.get( 
      'http://localhost:3001/org/token',
      { headers: {"Authorization" : `Bearer ${token}`} }
      ).then((result)=>{
        navigate(`/org/${result.data[0]._id}/home`)
      }).catch((err)=>{
        navigate(`/org/login`)
      });
  }, [navigate])
  function getUser(event){
    event.preventDefault();
    const email=event.target[0].value;
    const password=event.target[1].value;
    const payload={
      email: email,
      password: password
  }
    axios.post('http://localhost:3001/org/login',payload).then((result)=>{
      localStorage.setItem('Olog_id', result.data.access_Token);
      localStorage.setItem('id', result.data.id);
      console.log(result);
      navigate(`/org/${result.data.id}/home`)
    }).catch((err)=>{
      console.log(err);
      if(err.code==='ERR_NETWORK'){
        seterr(`ERR CODE ${err.code}`)
      }
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
                  <input type="email" name="email" placeholder='Email' id="email" />
                </div>
                <div className="form-group">
                  <input type="password" name="password" placeholder='Password' id="password" />
                </div>
                <div className="form-group loginBtn">
                  <button type='submit' className='btn'>Login</button>
                  <Link to='/org/register' className="btn">Create Account</Link>
                </div>
                <div className="errmessage">
                  {err && <p>{err}</p>}
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
