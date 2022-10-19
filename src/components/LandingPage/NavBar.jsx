import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';
export default function NavBar() {
  return (
     <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <img src={Logo} alt="" className="nav-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">About Us</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <span>As an</span>
            <Link className='nav-btn emSignin' to="/employee/login">Employee</Link>
            |
            <Link className='nav-btn regOrg' to="/org/register">Organization</Link>
          </Navbar.Text>
        </Navbar.Collapse>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

