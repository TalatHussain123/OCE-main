import React, { useEffect } from 'react'
import { Outlet } from "react-router-dom";

import { BiSearch, BiBell } from 'react-icons/bi';
import { FiMail } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import AdminSidemenu from '../components/Admin/Dashboard/AdminSidemenu';
export default function Admin() {
  return (
    <div className='UniDashBoard'>
      <style>{'body { background-color: #F7F8FB; }'}</style>
      <AdminSidemenu />
      <div className='mainContent ml-[100px] pt-[18px]'>
        <Container fluid>
          <Row>
            <Col>
              <div className='FormField'>
                <div className='form-group flex items-center p-[10px] bg-white w-fit rounded-md'>
                  <BiSearch className='mr-[6px]' />
                  <input type='text' className='bg-transparent outline-none' placeholder='Search Anything' />
                </div>
              </div>
            </Col>
            <Col>
              <ul className='navSide flex items-center justify-end'>
                <li className='mx-2'>
                  <FiMail />
                </li>
                <li className='mx-2'>
                  <BiBell />
                </li>
                <li className='mx-2'>
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" className='bg-transparent border-0 flex items-center'>
                      <img src='https://picsum.photos/50/50' alt="" className='rounded-full'></img>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
        <Outlet />
      </div>
    </div>
  )
}
