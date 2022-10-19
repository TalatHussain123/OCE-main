import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BsViewList } from 'react-icons/bs'
import { BsGrid } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { BiEditAlt } from 'react-icons/bi'
import { AiOutlineDelete } from 'react-icons/ai'
import { useLocation } from "react-router-dom";
import axios from 'axios'
export default function AdminOrg() {

    const [loaded, setload] = useState(false);
    const [layout, setlayout] = useState(false);
    const [org, setorg] = useState(false);
    const [pages, setpages] = useState(1);
    useEffect(() => {
        const id = localStorage.getItem('id')
        console.log(id);
        const getTest = axios.get(`http://localhost:3001/Organizations?page=${pages}&limit=10`);
        Promise.all([getTest]).then(function (result) {
            const testObj = JSON.parse(JSON.stringify(result[0].data));
            setorg(testObj.results)
            setload(true)
        });
    }, [])
    return (
        <Container className="" fluid>
            <Row>
                <Col sm={6}>
                    <div className="secHead">
                        <h3>
                            Organizations
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
                        org.map((number, key) => <Col key={key} className={`${layout ? 'col-md-4' : 'col-md-12'}`}>
                            <div className="singleTest">
                                <Row>
                                    <Col md={6}>
                                        <Row>
                                            <Col className={`${layout ? 'col-md-12' : 'col-md-6'}`}>
                                                <div className="TestNum">
                                                    <span>Name</span>
                                                    <p style={{ textTransform: 'UpperCase' }}>{number.orgName}</p>
                                                </div>
                                            </Col>
                                            <Col className={`${layout ? 'col-md-12' : 'col-md-6'}`}>
                                                <div className="testDate">
                                                    <span>Email</span>
                                                    <p>{number.email}</p>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md={6}>
                                        <div className={`testActBtns ${layout ? 'btn_grid' : 'btn_flex'}`}>

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
    )
}
