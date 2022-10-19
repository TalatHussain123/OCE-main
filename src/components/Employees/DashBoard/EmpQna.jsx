import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { GrFormAdd } from 'react-icons/gr'
import { BsViewList } from 'react-icons/bs'
import { BsGrid } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { BiEditAlt } from 'react-icons/bi'
import { AiOutlineDelete } from 'react-icons/ai'
import { useLocation } from "react-router-dom";
import Modal from 'react-modal';
import axios from 'axios'
import { MultiSelect } from "react-multi-select-component";
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
export default function EmpQna() {
  let subtitle;
  const [layout, setlayout] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [test, setTests] = useState([]);
  const [loaded, setload] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const search = useLocation().search;
  const [selected, setSelected] = useState([]);
  const [option, setoption] = useState('')
  const [type, setType] = useState('')
  const options = [
  ];
  const page = new URLSearchParams(search).get('page');
  useEffect(() => {
    const oid = localStorage.getItem('oid')
    const getTest = axios.get(`http://localhost:3001/questions?page=${page}&limit=10`, {
      params: {
        id: oid
      },
    });
    Promise.all([getTest]).then(function (result) {
      const testObj = JSON.parse(JSON.stringify(result[0].data));
      setTests(testObj.results)
      setload(true)
    });
  }, [refresh])
  useEffect(() => {
    if(selected.length===0)
    {
      setoption([])
    }
    else{
      selected.map((el) => {
        const updatedOptions = [...option, {option:el.value,isCorrect:false}];
        setoption(updatedOptions)
      }
      )
    }
  }, [selected])
  function getCorrect(e) {
    const { name, value } = e.target;
    const newState = option.map((obj,index) => {
      if (index === parseInt(value)) {
        if(obj.isCorrect===true)
        {
          return {...obj, isCorrect: false};
        }
        return {...obj, isCorrect: true};
      }
      return obj;
    });
    setoption(newState);
  }
  function getType(e) {
    const { name, value } = e.target;
    setType(value)
  }
  //Crud Methods
  function createQuestion(e) {
    e.preventDefault()
    const question = e.target[0].value;
    const oid=localStorage.getItem('oid')
    let Mcqs,section;
    if(type==='mcqs'){
      Mcqs=option;
      section=[]
    }
    else{
      Mcqs=[];
      section=option
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append("oId", oid);
    formData.append("question", question);
    formData.append("option",JSON.stringify(Mcqs));
    formData.append("section",JSON.stringify(section));
    formData.append("image", fileName);
    axios.post('http://localhost:3001/questions',formData,{
      headers: {
        "Content-Type": "multipart/form-data",
      }}).then((result)=>{
      setrefresh(!refresh)
      closeModal()
      setoption([]);
      setSelected([]);
    }).catch((err)=>{
      console.log(err)
    })
  }
  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  function editData() {
    console.log('done');
  }
  function deleteQue(id){
    const result = window.confirm("Are you Sure You want to delete this Record!");
    if (result === true) {  
      const payload = {
        _id: id
      }
      axios.delete('http://localhost:3001/questions', { data: payload }).then((result) => {
        console.log(result);
        setrefresh(!refresh)
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
          <h2>Add Question</h2>
          <button onClick={closeModal}>close</button>
        </div>
        <form onSubmit={createQuestion}>
          <div className="form-group">
            <label htmlFor="question">Question</label>
            <input type="text" name="question" id="question" placeholder='what is Computer Science' required />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input type="file" name="image" id="image"onChange={saveFile} />
          </div>
          <div className="form-group">
            <input type="radio" name="queType" id="mcqs" value="mcqs" onChange={getType} required />
            <label htmlFor="mcqs">MCQs</label>
            <input type="radio" name="queType" id="detailed" value="detailed" onChange={getType} required />
            <label htmlFor="detailed">Detailed</label>
          </div>

          {type === 'mcqs' ? <div className="form-group">
            <label htmlFor="image">Option</label>
            <MultiSelect
              options={options}
              value={selected}
              onChange={setSelected}
              labelledBy="Select"
              isCreatable={true}
            />
            {
              selected.map((ele, index) =>
                <>
                  <div className="optionSelected">
                    <li>{ele.value}</li>
                    <input type="checkbox" name="rightOpt" id={index} value={index} onChange={getCorrect} />
                    <label htmlFor={index}>isCorrect</label>
                  </div>
                </>
              )
            }
          </div>
            : <div className="form-group">
              <label htmlFor="image">Section</label>
              <MultiSelect
                options={options}
                value={selected}
                onChange={setSelected}
                labelledBy="input"
                isCreatable={true}
              />
            </div>}
          <div className="form-group">
            <button type="submit">Add</button>
          </div>
        </form>
      </Modal>
      <Container className="" fluid>
        <Row>
          <Col sm={6}>
            <div className="secHead">
              <h3>
                Questions
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
                <div className="addTest">
                  <button onClick={openModal} className='addtest'>
                    <GrFormAdd /> Add Questions
                  </button>
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
                            <span>Question</span>
                            <p style={{ textTransform: 'UpperCase' }}>{number.question.slice(0, 15)}</p>
                          </div>
                        </Col>
                        <Col className={`${layout ? 'col-md-12' : 'col-md-6'}`}>
                          <div className="testDate">
                            <span>Type</span>
                            <p>{number.option.length === 0 ? 'Detailed' : 'MCQs'}</p>
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
                          <button className="btn dltTest" onClick={() => {
                            deleteQue(number._id)
                          }}>
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
