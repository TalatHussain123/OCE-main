import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BsViewList } from 'react-icons/bs'
import { BsGrid } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import './style.css'
import axios from 'axios'
export default function ResultParent() {
    const [layout, setlayout] = useState(false);
    const [test, setTests] = useState([]);
    const [loaded, setload] = useState(false);
    const [page, setpage] = useState(1);
    useEffect(() => {
    const oid = localStorage.getItem('oid')
    console.log(oid);
      const getTest = axios.get(`http://localhost:3001/attempts?page=${page}&limit=10`, {
        params: {
          id: oid
        },
      });
      Promise.all([getTest]).then(function (result) {
        const testObj = JSON.parse(JSON.stringify(result[0].data));
    console.log(testObj.results);
        setTests(testObj.results)
        setload(true)
      });
    }, [])
  return (
    <Container className="" fluid>
    <Row>
      <Col sm={6}>
        <div className="secHead">
          <h3>
            Test
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
                      <span>Date</span>
                      <p>{number.test_Date}</p>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <div className={`testActBtns ${layout ? 'btn_grid' : 'btn_flex'}`}>
                  <div className="viewBtn">
                    <Link to={number._id}>
                    <button className="viewtest">
                      Check Test
                    </button>
                    </Link>
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
  )
}
