import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import NavBar from '../components/LandingPage/NavBar'
import illustration from '../assets/undraw_online_test_re_kyfx.svg'
import { Link } from 'react-router-dom'
export default function LandingPage() {
  return (
    <>
     <NavBar/>
     <section className='heroSection'>  
     <Container>
     <Row>
      <Col>
      <div className="hero-left">
        <h2>
          Digital Exam <br />
          System
        </h2>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
        <Link to="/condidate/login">Apply For Exam</Link>
        <Link to="/consultancy">Get Consultancy</Link>
      </div>
      </Col>
      <Col>
      <img src={illustration} alt="" />
      </Col>
     </Row>
     </Container>
     </section>
    </>
  )
}
