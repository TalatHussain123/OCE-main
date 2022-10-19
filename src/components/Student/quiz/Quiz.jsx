import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap'
import Countdown from 'react-countdown';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '../../../assets/logo.png'
import './style.css'
export default function Quiz({ active }) {
    const navigate = useNavigate()
    const { stdid, testid } = useParams()
    const [attach, setattach] = useState([{
        marks: "50",
        time: "3"
    }])
    const [question, setquestion] = useState([{
        question: '',
        section: [],
        option: []
    }])
    const [Number, setNumber] = useState(0)
    const [oId, setoId] = useState('')
    const [attempt, setattempt] = useState([])
    const [warning, setwarning] = useState(0)
    const [optAns, setoptAns] = useState([])
    const [DetAns, setDetAns] = useState([])
    const [qId, setqId] = useState([])
    const [last, setlast] = useState(false)
    useEffect(() => {
        const getTest = axios.get('http://localhost:3001/testQuestion', {
            params: {
                id: testid
            },
        })
        Promise.all([getTest]).then(function (result) {
            const testObj = JSON.parse(JSON.stringify(result[0].data));
            setattach(testObj.Questions)
            setoId(testObj.oId)
            setqId(testObj.Questions.map(val => {
                return val.qid
            }))
        });
    }, [testid])
    useEffect(() => {
        if (qId.length !== 0) {
            const getTest = axios.get('http://localhost:3001/getQuestion', {
                params: {
                    id: qId
                },
            })
            Promise.all([getTest]).then(function (result) {
                const testObj = JSON.parse(JSON.stringify(result[0].data));
                setquestion(testObj)
            });
        }
    }, [qId])
    useEffect(() => {
        if (warning === 2) {
            // console.log('warning')
        }
        else {
            setwarning(warning + 1)
        }
    }, [active])
    function nextQue() {
        if (question[Number].option.length === 0) {
            const detAnswers = getDetAns()
            console.log(Number, attach[Number].qid, detAnswers);
            setattempt([{
                queId: question[Number]._id,
                section: detAnswers,
                marks: attach[Number].marks
            }, ...attempt])
        }
        else {
            console.log(Number, attach[Number].qid, optAns);
            setattempt([{
                queId: question[Number]._id,
                option: optAns,
                marks: attach[Number].marks
            }, ...attempt])
        }
        if (Number >= qId.length - 1) {
            setlast(true)
        }
        else {
            setoptAns([])
            question[Number].option.map((val, index) => {

                if (document.getElementById(index).checked) {
                    document.getElementById(index).checked = false;
                }
            })
            setNumber(Number + 1)
        }
    }
    function submitQuiz() {
        const payload = {
            testid: testid,
            stdid: stdid,
            oId: oId,
            attempt: attempt
        }
        console.log(payload);
        axios.post('http://localhost:3001/submit', payload).then((result) => {
            alert('submited')
            navigate(`/std/${stdid}/results`)
        }).catch((err) => {
            console.log(err);
        })
    }
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            nextQue()
        } else {
            // Render a countdown
            return <span>{hours}:{minutes}:{seconds}</span>;
        }
    };
    const optionSelect = useCallback(
        (e) => {
            const { value } = e.target;
            let isAdd = true
            optAns.map((val) => {
                if (val === parseInt(value))
                    isAdd = false
            })
            if (isAdd !== false) {
                setoptAns([parseInt(value), ...optAns])
            }
            else {
                setoptAns((prevState) =>
                    prevState.filter((prevItem) => parseInt(prevItem) !== parseInt(value))
                );
            }
        },
        [optAns]
    );
    const getDetAns = () => {
        const detail = question[Number].section.map((val, index) => {
            let value = document.getElementById('det' + index).value;
            return {
                section: val.option,
                text: value,
            }
        })
        setDetAns(detail, ...DetAns)
        return detail;
    }

    const time = React.useMemo(() => {
        return Date.now() + (60000 * attach[Number].time);
    }, [Number]);
    console.log(question)
    return (
        <Container>

            <Row>
                <Col>
                    <div className="Left">
                        <div className="Logo">
                            <img src={logo} alt="" />
                        </div>
                        <div className="Left_Qtns" style={{ color: '#6235D7' }} >
                            <span>Question {Number + 1} of {question.length}</span>
                        </div>
                        <div>
                            <p>{question[Number].question}</p>
                        </div>
                        <div className="Left_Btns">
                        </div>
                    </div>
                </Col>
                <Col>
                    <div className="Right">
                        <div className="Right_header">
                            <Row>
                                <Col>
                                    <div className="Heading1" style={{ color: '#352B75' }} >
                                        <h3>Select One Answer</h3>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="Timmer">
                                        <span>
                                            <Countdown renderer={renderer} date={time}>

                                            </Countdown>
                                        </span>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="Right_btn">
                                        {(last) ?
                                            <button onClick={submitQuiz}>Submit</button> :
                                            <button onClick={nextQue}> Next Question</button>
                                        }
                                    </div>
                                </Col>

                            </Row>
                        </div>
                        {question[Number].option.length === 0 ?
                            <form action="">
                                {question[Number].section.map((val, index) =>
                                    <div className='form-group'>
                                        <label htmlFor={'det' + index}>{val.option}</label>
                                        <textarea name="" id={'det' + index} cols="10" rows="10"></textarea>
                                    </div>
                                )}
                            </form>
                            :
                            <div className="Mcqs">
                                {question[Number].option.map((val, index) =>

                                    <div className="Mcqs1">
                                        <input type="checkbox" className='checkbox' name={question[Number].question} value={index} id={index} onChange={optionSelect} hidden />
                                        <label htmlFor={index}>{val.option}</label>
                                    </div>
                                )}
                            </div>
                        }

                    </div>
                </Col>
            </Row>
        </Container>
    )
}
