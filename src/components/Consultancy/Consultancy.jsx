import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo.png'
export default function Consultancy() {
    const [field, setfield] = useState([])
    const [interest, setinterest] = useState([])
    const [select, setselect] = useState([])
    const [subcat, setsubcat] = useState([])
    const [cat, setcat] = useState([])
    useEffect(() => {
        const getTest = axios.get(`http://localhost:3001/fields`);
        Promise.all([getTest]).then(function (result) {
            const testObj = JSON.parse(JSON.stringify(result[0].data));
            let fieldoption = testObj.map(val => {
                return {
                    label: val.field,
                    value: val.field
                }
            })
            let interestoption = testObj.map(val => {
                return val.interest
            })
            setinterest(interestoption)
            setfield(fieldoption)
        });
    }, [])
    function fieldselect(val, index) {
        setcat(val)
        setselect(interest[index], ...select)
        if (document.getElementById(index).checked) {
            document.getElementById(index).checked = false;
        }
        setsubcat([])
    }
    
    function subcatSelect(value) {
        if(subcat.includes(value)){
            const index=subcat.indexOf(value)
            subcat.splice(index,1)
        }
        else{
            setsubcat([value,...subcat])
        }

    }
    console.log(cat, subcat)
    return (
        <Container>
            <Row className='blognav'>
                <Col>
                    <div className="logo">
                        <img src={Logo} alt="" />
                    </div>
                </Col>
                <Col>
                    <div className="consultMessage">
                        <span>Choose Options</span>
                    </div>
                </Col>
                <div className="fields">
                    <h2>Choose Fields</h2>
                    <Row>

                        <Col>
                            <div className='consultOption'>
                                {field.map((val, index) =>

                                    <div className="consult">
                                        <input type="radio" name="field" onChange={() => {
                                            fieldselect(val.value, index)
                                        }} value={val.value} id={`field${index}`} hidden />
                                        <label htmlFor={`field${index}`}>{val.value}</label>
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="interest">
                    {select.length>0?
                                    <h2>Choose Interests</h2>:''    
                }

                    <Row>
                        <Col>
                            <div className='consultOption'>
                                {select.map((val, index) =>

                                    <div className="consult">
                                        <input type="checkbox" name="interestInput" onChange={() => {
                                            subcatSelect(val.label)
                                        }} value={val} id={`${index}`} hidden />
                                        <label htmlFor={`${index}`}>{val.value}</label>
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                </div>
            </Row>
            <Row>
                <Col>
                <div className="srchbtn">
                    {subcat.length>0?
                    <Link to={`/blogs?cat=${cat}&subcat=${subcat}`} >Next</Link>:''
                    }
                </div>
                </Col>
            </Row>
        </Container>
    )
}
