import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom'

export default function AttachQue() {
    const navigate = useNavigate();
    const { testId } = useParams()
    const [testmark, settestmark] = useState()
    // const [isAttach,setisAttach]=useState()
    const [attachMarks, setattachMarks] = useState(0)
    const [test, setTests] = useState([]);
    const [pages, setpages] = useState(1);
    const [previous, setprevious] = useState(0);
    const [next, setnext] = useState(0);
    const [loaded, setload] = useState(false);
    const [attach, setattach] = useState([])
    // const tests = test.map((value) =>
    //     value
    // )
    useEffect(() => {
        const oid = localStorage.getItem('oid')
        const currentpage = pages
        const getTest = axios.get(`http://localhost:3001/questions?page=${currentpage}&limit=10`, {
            params: {
                id: oid
            },
        });
        const getTimeMarks = axios.get('http://localhost:3001/findTest', {
            params: {
                id: testId
            },
        })
        Promise.all([getTest, getTimeMarks]).then(function (result) {
            const testObj = JSON.parse(JSON.stringify(result[0].data));
            settestmark(result[1].data.total_Marks);
            // setisAttach(result[1].data.testQueId);
            setprevious(result[0].data.previous.page);
            setnext(result[0].data.next.page)
            setTests(testObj.results)
            setload(true)
        });
    }, [pages, testId])
    function getSelected(e, value) {
        e.preventDefault()
        const isAdd = attach.filter((val) => {
            console.log(val.qid, value);
            if (val.qid === value) {
                return val;
            }
        }).map((val) => {
            if (val) {
                setattachMarks(parseInt(attachMarks) - parseInt(val.marks))
                return false
            }
            else {
                return true
            }
        })
            if (isAdd.length === 0 || isAdd[0] ) {
                const id = value
                const marks = e.target[0].value;
                const time = e.target[1].value;
                if (attachMarks >= testmark) {
                    console.log('marks full');
                }
                else {
                    setattachMarks(parseInt(attachMarks) + parseInt(marks))
                    setattach([{
                        qid: id,
                        marks: marks,
                        time: time
                    }, ...attach])
                }
            }
            else {
                const updateAttach = attach.filter((val) => {
                    if (val.qid !== value) {
                        console.log('minus');
                        return val
                    }
                })
                setattach(updateAttach)
            }
        
    }
    useEffect(() => {
        console.log('log',attachMarks);
    }, [attachMarks])
    // useEffect(()=>{
    //     if(isAttach){
    //         const id=localStorage.getItem('emp_id')
    //         navigate(`/employee/${id}/test?page=1`)
    //     }
    // },[isAttach])
    function nextpage(value) {
        setpages(value)
    }
    function prevpage(value) {
        setpages(value)
    }
    function addAttachQuestion(){
        const payload={
            testId:testId,
            Questions:attach,
            oId:localStorage.getItem('oid')
        }
        axios.post('http://localhost:3001/testQuestion',payload).then((result)=>{
            const  testQue={
                _id: [
                    testId
                  ]
                  ,
                  update: {
                    testQueId:result.data.testQueID
                  }
            }
            axios.put('http://localhost:3001/test',testQue).then((result)=>{
                console.log(result);
                const id=localStorage.getItem('emp_id')
                navigate(`/employee/${id}/test?page=1`)
            }).catch((err)=>{
            console.log(err);
            })
        }).catch((err)=>{
            console.log(err)
        })

    }
    console.log('add', attachMarks);
    return (
        <>
            <Container fluid>
                <Row>
                    <Col>
                        <h2>Select Questions Below</h2>
                    </Col>
                    <Col className='flex'>
                        <h5>Total Marks: </h5>
                        <span> {testmark}</span>
                    </Col>
                    <Col className='flex'>
                        <h5>Remaining Marks</h5>
                        <span>{(parseInt(testmark) - parseInt(attachMarks))}</span>
                    </Col>
                </Row>
                <Row>
                    {
                        (loaded) ? test.map((val, index) => <Col xs={12} className="attachQues">
                            <form onSubmit={event => { getSelected(event, val._id) }}>
                                <Row>
                                    <Col xs={6} >
                                        <label htmlFor={index}>
                                            {val.question}
                                        </label>
                                    </Col>
                                    <Col xs={2}>
                                        <div className="form-group-attach">
                                            <input type="text" name="marks" placeholder='Enter Marks' id={'mark' + index} required />
                                        </div>
                                    </Col>
                                    <Col xs={2}>
                                        <div className="form-group-attach">
                                            <input type="text" name="time" placeholder='Enter Time' id={'time' + index} required />
                                        </div>
                                    </Col>
                                    <Col>
                                        <button className="addAttach">
                                            Add
                                        </button>
                                    </Col>
                                </Row>
                            </form>
                        </Col>)
                            : 'Loading'
                    }
                </Row>
                {(previous === 0) ? '' :
                    <button onClick={() => {
                        prevpage(previous)
                    }}>
                        Previous
                    </button>
                }
                {
                    (next === 0) ? '' :
                        <button onClick={() => {
                            nextpage(next)
                        }}>
                            Next
                        </button>
                }
                <Row>
                    <Col>
                        <div className="addAttachBtn">
                            <button onClick={() => {
                                navigate(-1)
                            }}>Back</button>
                            {(parseInt(testmark) - parseInt(attachMarks)) === 0 ?
                                <button onClick={()=>{
                                    addAttachQuestion();
                                }}>Add Questions</button>
                                : ""}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
