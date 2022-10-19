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
import { useLocation } from "react-router-dom";
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
export default function Tests() {
  let subtitle;
  let editsubtitle;
  const [layout, setlayout] = useState(false);
  const [test, setTests] = useState([]);
  const [edittest, seteditTests] = useState([
  {'pass_Marks': 0,
  'proposed_Time': "",
  'test_Date': "",
  'total_Marks': 0,}]
  );
  const [loaded, setload] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modaleditOpen, seteditOpen] = React.useState(false);
  const search = useLocation().search;
  const page = new URLSearchParams(search).get('page');
  useEffect(() => {
    const id = localStorage.getItem('id')
    console.log(id);
    const getTest = axios.get(`http://localhost:3001/test?page=${page}&limit=10`, {
      params: { 
        id: id
      },
    });
    Promise.all([getTest]).then(function (result) {
      const testObj = JSON.parse(JSON.stringify(result[0].data));
      setTests(testObj.results)
      setload(true)
    });
  }, [])
  function creatTest(event) {
    event.preventDefault()
    const test_Date = event.target[0].value;
    const proposed_Time = event.target[1].value;
    const total_Marks = event.target[2].value;
    const pass_Marks = event.target[3].value;
    const Price = event.target[4].value;
    const payload = {
      oId: localStorage.getItem('id'),
      test_Date: test_Date,
      proposed_Time: proposed_Time,
      total_Marks: total_Marks,
      pass_Marks: pass_Marks,
      Price:Price
    }
    axios.post('http://localhost:3001/test', payload).then((result) => {
      console.log(result);
      closeModal()
    }).catch((err) => {
      console.log(err);
    })
  }
  function editUpload(event) {
    event.preventDefault()
    const test_Date = event.target[0].value;
    const proposed_Time = event.target[1].value;
    const total_Marks = event.target[2].value;
    const pass_Marks = event.target[3].value;
    const Price = event.target[4].value;
    const payload = {
      _id: [
        edittest[0]._id
      ]
      ,
      update: {
        test_Date: test_Date,
        proposed_Time: proposed_Time,
        total_Marks: total_Marks,
        pass_Marks: pass_Marks,
        Price:Price
      }
    }
    axios.put('http://localhost:3001/test', payload).then((result) => {
      console.log(result);
      seteditTests([
        {'pass_Marks': 0,
        'proposed_Time': "",
        'test_Date': "",
        'total_Marks': 0,}])
      editcloseModal()
    }).catch((err) => {
      console.log(err);
    })

  }
  
  async function editTest(id) {
    const editVal = await test.filter((val) => {
      return val._id.includes(id)
    }).map((val) => {
      return val
    })
    return editVal
  }
  function deleteTest(id) {
    const result = window.confirm("Are you Sure You want to delete this Record!");
    if (result === true) {
      const payload = {
        _id: id
      }
      axios.delete('http://localhost:3001/test', { data: payload }).then((result) => {
        console.log(result);
      }).catch((err) => {
        console.log(err);
      })
    } else {

    }
  }
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
  function editcloseModal() {
    seteditOpen(false);
  }

  function editopenModal() {
    seteditOpen(true);
  }

  function editafterOpenModal() {
    // references are now sync'd and can be accessed.
    editsubtitle.style.color = '#f00';
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
          <h2>Add Test</h2>
          <button onClick={closeModal}>close</button>
        </div>
        <form onSubmit={creatTest}>
          <div className="form-group">
            <label htmlFor="date">Proposed Date</label>
            <input type="Date" name='date' min={new Date().toISOString().split('T')[0]} id='date' />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input type="Time" name='time' id='time' />
          </div>
          <div className="form-group">
            <label htmlFor="time">Total Marks</label>
            <input type="text"
              name="example"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }} />
          </div>
          <div className="form-group">
            <label htmlFor="time">Passing Marks</label>
            <input type="text"
              name="example"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }} />
          </div>
          <div className="form-group">
            <label htmlFor="time">Price</label>
            <input type="text"
              name="Price"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }} />
          </div>
          <div className="form-group">
            <button type='submit'>Create</button>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={modaleditOpen}
        onAfterOpen={editafterOpenModal}
        onRequestClose={editcloseModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modeHead">
          <h2>Edit Test</h2>
          <button onClick={editcloseModal}>close</button>
        </div>
        <form onSubmit={editUpload}>
          <div className="form-group">
            <label htmlFor="date">Proposed Date</label>
            <input type="Date" defaultValue={edittest[0].test_Date} name='date' id='date' />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input type="Time" defaultValue={edittest[0].proposed_Time} name='time' id='time' />
          </div>
          <div className="form-group">
            <label htmlFor="time">Total Marks</label>
            <input type="text"
              name="example"
              defaultValue={edittest[0].total_Marks}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }} />
          </div>
          <div className="form-group">
            <label htmlFor="time">Passing Marks</label>
            <input type="text"
              name="example" 
              defaultValue={edittest[0].pass_Marks}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }} />
          </div>
          <div className="form-group">
            <label htmlFor="time">Price</label>
            <input type="text"
              name="Price" 
              defaultValue={edittest[0].Price}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }} />
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
              <div className="addTest">
                <button onClick={openModal} className='addtest'>
                  <GrFormAdd /> Add Test
                </button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          {
            (loaded) ?
              test.map((number, key) => <Col key={key} className={`${layout ? 'col-md-4' : 'col-md-12'}`}>
                <div className="singleTest">
                  <Row>
                    <Col md={6}>
                      <Row>
                        <Col className={`${layout ? 'col-md-12' : 'col-md-6'}`}>
                          <div className="TestNum">
                            <span>Number</span>
                            <p style={{ textTransform: 'UpperCase' }}>#{number._id.slice(-4)}</p>
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

                        <div className="udAct">
                          <div onClick={() => {
                            editTest(number._id).then((result) => {
                              seteditTests(result)
                              editopenModal() 
                            })

                          }} className='edtTest btn'>
                            <BiEditAlt />
                          </div>
                          <button onClick={() => {
                            deleteTest(number._id)
                          }} className="btn dltTest">
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
