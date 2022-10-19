import { logDOM } from '@testing-library/react';
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom'

export default function AttemptTest() {
    const { attemptid } = useParams()
    const [loaded, setload] = useState(false);
    const [page, setpage] = useState(1);
    const [tests, setTests] = useState({
        attempt: [
            {
                section: []
            }
        ]
    });
    const [Que, setQue] = useState([{
        question: '',
        section: [],
        option: []
    }]);
    const [Number, setNumber] = useState(0);
    useEffect(() => {
        const getTest = axios.get(`http://localhost:3001/attempt`, {
            params: {
                id: attemptid
            },
        });

        Promise.all([getTest]).then(function (result) {
            const testObj = JSON.parse(JSON.stringify(result[0].data));
            setTests(testObj)
            setload(true)
        });
    }, [page, attemptid])

    useEffect(() => {
        if (tests.attempt) {
            const ids = tests.attempt.map((val) => {
                return val.queId;
            })
            const getTest = axios.get(`http://localhost:3001/getQuestion`, {
                params: {
                    id: ids
                },
            });
            Promise.all([getTest]).then(function (result) {
                const testObj = JSON.parse(JSON.stringify(result[0].data));
                setQue(testObj.reverse())
            });
        }
    }, [tests])
    return (
        <Container>
            <Row>
                <Col>
                    <h3>Question</h3>
                    <p>{Number+1}of {Que.length}</p>
                    <div className="Ques">
                        <span>{Que[Number].question}</span>
                    </div>
                    {
                        (Que[Number].option.length === 0) ?
                            <div className="sec">
                                <ul className='sections'>
                                    {
                                        Que[Number].section.map((val, index) =>
                                            <li key={index}>{val.option}</li>
                                        )
                                    }
                                </ul>
                            </div> :
                            <div className="opt">
                                <ul className='optionsQue'>
                                    {
                                        Que[Number].option.map((val, index) =>
                                            <div key={index} className='flex'>
                                                <li>{val.option}</li>
                                                {(val.isCorrect) ? <span className='CorrectTag'>Correct</span> : ''}

                                            </div>
                                        )
                                    }
                                </ul>
                            </div>
                    }
                </Col>
                <Col>
                    <h3>Attempt</h3>
                    {
                        Que[Number].option.length === 0 ?
                        tests.attempt[Number].section.map((val, index) =>
                        <div>{val.text}</div>
                    )
                            :
                            tests.attempt[Number].option.map((val, index) =>
                                <div>{Que[Number].option[val].option}</div>
                            )
                    }
                </Col>
            </Row>
            <Row>
                <Col>
                {(Number>=Que.length-1)?''
                :
                    <button onClick={() => {
                        setNumber(Number + 1)
                    }}>Next Question </button>
                }
                </Col>
            </Row>
        </Container>
    )
}
