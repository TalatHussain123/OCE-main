import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { GrFormAdd } from 'react-icons/gr'
import { BsViewList } from 'react-icons/bs'
import { BsGrid } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { BiEditAlt } from 'react-icons/bi'
import { AiOutlineDelete } from 'react-icons/ai'
import Modal from 'react-modal';
import { useLocation } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";

import axios from 'axios'
import { getFID } from 'web-vitals'
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
export default function AdminConsult() {
    let fieldoption,interestoption;
    const [loaded, setload] = useState(false);
    const [layout, setlayout] = useState(false);
    const [refresh, setrefresh] = useState(false);
    const [blog, setconsult] = useState(false);
    const [pages, setpages] = useState(1);
    const [interestText, setinterestText] = useState([]);
    const [interest, setinterest] = useState([]);
    const [fieldOpt, setfieldOpt] = useState([]);
    const [tag, settag] = useState();
    const [interestOpt, setinterestOpt] = useState([
        {
            interest:''
        }
    ]);
    const [selectfield,setselectfield]= useState({
        value:0,
        text:'computer science'
    })

    useEffect(() => {
        const id = localStorage.getItem('id')
        const getTest = axios.get(`http://localhost:3001/consultancy?page=${pages}&limit=10`);
        Promise.all([getTest]).then(function (result) {
            const testObj = JSON.parse(JSON.stringify(result[0].data));
            setconsult(testObj.results)
            setload(true)
        });
        getFieldInterest()
    }, [refresh])
    console.log('done',interest);
    function getFieldInterest() {
        const getTest = axios.get(`http://localhost:3001/fields`);
        Promise.all([getTest]).then(function (result) {
            const testObj = JSON.parse(JSON.stringify(result[0].data));
                fieldoption=testObj.map(val => {
                return {
                    label: val.field,
                    value: val.field
                }
            })
         interestoption=testObj.map(val => {
                return val.interest
            })
            setinterestOpt(interestoption)
            setfieldOpt(fieldoption)
        });
    } 
    function addBlog(e) {
        e.preventDefault()
        const payload = {
            title: e.target[0].value,
            content: e.target[1].value,
            field:selectfield.text,
            Interest:interestText,
            tag:tag
        }
        axios.post('http://localhost:3001/consultancy', payload).then((result) => {
            setrefresh(!refresh)
            setinterest([])
            closeModal()
        }).catch((err) => {
            console.log(err)
        })
    }
useLayoutEffect(() => {
    const value=interest.map((val)=>{
        return val.value
    }
   )
   setinterestText(value)
}, [interest])
    function updateblog(e) {
    }
    function deleteBlog(id) {           
        const result = window.confirm("Are you Sure You want to delete this Record!");
        if (result === true) {
            const payload = {
                _id: id
            }
            axios.delete('http://localhost:3001/consultancy', { data: payload }).then((result) => {
                setrefresh(!refresh)
            }).catch((err) => {
                console.log(err);
            })
        } else {

        }
    }
    function selectedField(e){
        const value=e.target.value;
        const text=e.target.selectedOptions[0].text;
        console.log(text);
        setselectfield({
            value:value,
            text:text
        })
    }
    function selectTag(e){
        const value= e.target.value;
        settag(value)
    }
    //Add Modal Function
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
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
                contentLabel="Add Blog"
            >
                <div className="modeHead flex">
                    <h2>Add Blog</h2>
                    <button onClick={closeModal}>close</button>
                </div>
                <form action="" onSubmit={addBlog}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" id="title" placeholder='Title' required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea name="" id="content" cols="30" placeholder='Content' rows="10" required></textarea>
                    </div>
                    <div className="form-group">
                        <input type="radio" name="tag" value="roadmap" id="roadmap" required  onChange={selectTag}/>
                        <label htmlFor="roadmap">Roadmap</label>
                        <input type="radio" name="tag" value="schools" id="school" required onChange={selectTag} />
                        <label htmlFor="school">Institutes</label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Field">Field</label>
                        <select name="" id="" onChange={selectedField}>
                            {fieldOpt.map((val,index)=>
                                <option value={index}>{val.value}</option>
                                )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Field">Interest</label>
                        <MultiSelect
                            options={interestOpt[selectfield.value]}
                            value={interest}
                            onChange={setinterest}
                            labelledBy="Select"
                            isCreatable={true}
                        />
                    </div>
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
                                Blogs
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
                                    <button onClick={() => {
                                        openModal()

                                    }} className='addtest'>
                                        <GrFormAdd /> Add Blog
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    {
                        (loaded) ?
                            blog.map((number, key) => <Col key={key} className={`${layout ? 'col-md-4' : 'col-md-12'}`}>
                                <div className="singleTest">
                                    <Row>
                                        <Col md={6}>
                                            <Row>
                                                <Col className={`${layout ? 'col-md-12' : 'col-md-6'}`}>
                                                    <div className="TestNum">
                                                        <span>Title</span>
                                                        <p style={{ textTransform: 'UpperCase' }}>{number.title.slice(0,10)}</p>
                                                    </div>
                                                </Col>
                                                <Col className={`${layout ? 'col-md-12' : 'col-md-6'}`}>
                                                    <div className="testDate">
                                                        <span>Type</span>
                                                        <p>{number.tag}</p>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md={6}>
                                            <div className={`testActBtns ${layout ? 'btn_grid' : 'btn_flex'}`}>

                                                <div className="udAct">
                                                    <div onClick={() => {

                                                    }} className='edtTest btn'>
                                                        <BiEditAlt />
                                                    </div>
                                                    <button onClick={() => {
                                                        deleteBlog(number._id)
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
