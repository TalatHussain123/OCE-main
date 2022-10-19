import React,{useState} from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import RegImage from '../../assets/registerScreen.png'
import logo from '../../assets/logo.png'
import { useNavigate } from "react-router-dom"
import axios from 'axios';


function AdminLogin() {
    const [err,seterr]=useState(null)
    const navigate = useNavigate()
    function getUser(event){
      event.preventDefault();
      const email=event.target[0].value;
      const password=event.target[1].value;
      const payload={
        email: email,
        password: password
    }
    console.log(payload)
      axios.post('http://localhost:3001/admin/login',payload).then((result)=>{
        localStorage.setItem('admin_id', result.data.access_Token);
        navigate(`/admin/${result.data.id}/home`)
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
            <img src={logo} alt="" />
          </div>
          <div className="signUpForm">
            <div className="FormHead">
              <h3>Welcome Back</h3>
              <p>Please Log in to your Account</p>
            </div>
            <form action="" onSubmit={getUser}>
              <div className="form-group">
                <input type="email" name="email" placeholder='Email' id="email" />
              </div>
              <div className="form-group">
                <input type="password" name="password" placeholder='Password' id="password" />
              </div>
              <div className="form-group empLogin">
                <button type='submit' className='btn'>Login</button>
  
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

export default AdminLogin