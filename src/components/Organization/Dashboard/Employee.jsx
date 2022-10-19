import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import { Col, Container, Row } from 'react-bootstrap'
import { GrFormAdd } from 'react-icons/gr'
import { BsViewList } from 'react-icons/bs'
import { BsGrid } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { BiEditAlt } from 'react-icons/bi'
import { AiOutlineDelete } from 'react-icons/ai'
import './style.css'
import {useLocation} from "react-router-dom";
import axios from 'axios'
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
export default function Employee() {
  let subtitle;

  const [layout, setlayout] = useState(false);
  const [test, setTests] = useState([]);
  const [loaded, setload] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modaleditOpen, seteditOpen] = React.useState(false);
  const search = useLocation().search;
  const page = new URLSearchParams(search).get('page');
  useEffect(() => {
    const id=localStorage.getItem('id')

    console.log(localStorage.getItem('id'));
    const getEmp = axios.get(`http://localhost:3001/employee?page=${page}&limit=10`, {
      params:{
        id:id
      },
    });
    Promise.all([getEmp]).then(function (result) {
      const testObj = JSON.parse(JSON.stringify(result[0].data));
      setTests(testObj.results)
      setload(true)
    });
  }, [])
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
  function closeModal() {
    setIsOpen(false);
  }
  function creatEmp(event){
    event.preventDefault()
    const Email = event.target[0].value;
    const Name = event.target[1].value;
    const Password = event.target[2].value;
    const payload = {
      oId: localStorage.getItem('id'),
      email: Email,
      empName: Name,
      password: Password,
    }
    axios.post('http://localhost:3001/employee', payload).then((result) => {
      console.log(result);
      closeModal()
    }).catch((err) => {
      console.log(err);
    })
  }
  return (
    <>
          <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modeHead">
          <h2>Add Employee</h2>
          <button onClick={closeModal}>close</button>
        </div>
        <form onSubmit={creatEmp}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" placeholder='Email' name='email' id='email' />
          </div>
          <div className="form-group">
            <label htmlFor="name">name</label>
            <input type="text" placeholder='Name' name='name' id='name' />
          </div>
          <div className="form-group">
            <label htmlFor="Password">Password</label>
            <input type="password" placeholder='password'
              name="example"/>
          </div>
          <div className="form-group">
            <button type='submit'>Create</button>
          </div>
        </form>
      </Modal>
        <Container className="" fluid>
    <Row>
      <Col sm={6}>
        <div className="secHead">
          <h3>
            Employee
          </h3>
        </div>
      </Col>
      <Col sm={6}>
        <div className="secAct">
          <div className="layout">
            <div className="listLayout">
              <BsViewList onClick={() => {
                setlayout(false)
              }} />
            </div>
            <div className="gridLayout">
              <BsGrid onClick={() => {
                setlayout(true)
              }} />
            </div>
          </div>
          <div className="addTest">
            <button onClick={openModal} className='addtest'>
              <GrFormAdd /> Add Employee
            </button>
          </div>
        </div>
      </Col>
    </Row>
    <Row>
      {
        (loaded) ? 
        test.map((number) => <Col key={number._id} className={`${layout ? 'col-md-4' : 'col-md-12'}`}>
          <div className="singleTest">
            <Row>
              <Col md={6}>
                <Row>
                  <Col className={`${layout ? 'col-md-12' : 'col-md-6'}`}>
                    <div className="TestNum">
                      <span>Number</span>
                      <p style={{textTransform:'UpperCase'}}>#{number._id.slice(-4)}</p>
                    </div>
                  </Col>
                  <Col className={`${layout ? 'col-md-12' : 'col-md-6'}`}>
                    <div className="testDate">
                      <span>Name</span>
                      <p>{number.empName}</p>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <div className={`testActBtns ${layout ? 'btn_grid' : 'btn_flex'}`}>
                  <div className="viewBtn">
                    <button className="viewtest">
                      view
                    </button>
                  </div>
                  <div className="udAct">
                    <div className='edtTest btn'>
                      <BiEditAlt />
                    </div>
                    <button className="btn dltTest">
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        ) 
        : 'loading'}
    </Row>
     </Container>
    </>

  )
}
