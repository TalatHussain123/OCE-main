import React, { useState, useEffect } from 'react'
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
export default function BlogCat() {
    const [loaded, setload] = useState(false);
    const [layout, setlayout] = useState(false);
    const [refresh, setrefresh] = useState(false);
    const [cat, setcat] = useState(false);
    const [pages, setpages] = useState(1);
    const [interest, setinterest] = useState([]);
    const [editCat, seteditcat] = useState([
        {
            interest: ''
        }
    ]);


    useEffect(() => {
        const id = localStorage.getItem('id')
        console.log(id);
        const getTest = axios.get(`http://localhost:3001/category?page=${pages}&limit=10`);
        Promise.all([getTest]).then(function (result) {
            const testObj = JSON.parse(JSON.stringify(result[0].data));
            setcat(testObj.results)
            setload(true)
        });
    }, [refresh])
    function addBlog(e) {
        e.preventDefault()
        const field = e.target[0].value;
        const payload = {
            field: field,
            interest: interest
        }
        axios.post('http://localhost:3001/category', payload).then((result) => {
            setinterest([])
            setrefresh(!refresh)
            closeModal();
        }).catch((err) => {
            console.log(err)
        })
    }
    async function editTest(id) {
        const editVal = await cat.filter((val) => {
            return val._id.includes(id)
        }).map((val) => {
            return val
        })
        return editVal
    }
    function updateblog(e) {
        e.preventDefault()
        const field = e.target[0].value;
        const payload = {
            _id: [
                editCat[0]._id
            ]
            ,
            update: {
                field: field,
                interest: interest
            }
        }
        axios.put('http://localhost:3001/category', payload).then((result) => {
            console.log(result)
            seteditcat([
                {
                    interest: ''
                }])
            u_closeModal();
            setinterest([])
            setrefresh(!refresh)

        }).catch((err) => {
            console.log(err);
        })
    }
    function deleteBlog(id) {
        const result = window.confirm("Are you Sure You want to delete this Record!");
        if (result === true) {
            const payload = {
                _id: id
            }
            axios.delete('http://localhost:3001/category', { data: payload }).then((result) => {
                console.log(result);
                setrefresh(!refresh)
            }).catch((err) => {
                console.log(err);
            })
        } else {

        }
    }
    const interestopt = editCat[0].interest;
    const interestnew = [];
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
    let u_subtitle;
    const [updateIsOpen, setupdateIsOpen] = useState(false);
    function u_openModal() {
        setupdateIsOpen(true);
    }

    function u_afterOpenModal() {
        // references are now sync'd and can be accessed.
        u_subtitle.style.color = '#f00';
    }
    function u_closeModal() {
        setupdateIsOpen(false);
    }
    console.log('editCat',editCat)
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
                    <h2>Add Category</h2>
                    <button onClick={closeModal}>close</button>
                </div>
                <form action="" onSubmit={addBlog}>
                    <div className="form-group">
                        <label htmlFor="Field">Field</label>
                        <input type="text" name="" placeholder='Field' id="" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Field">Interest</label>
                        <MultiSelect
                            options={interestnew}
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
            <Modal
                isOpen={updateIsOpen}
                onAfterOpen={u_afterOpenModal}
                onRequestClose={u_closeModal}
                style={customStyles}
                contentLabel="Add Blog"
            >
                <div className="modeHead flex">
                    <h2>Update Category</h2>
                    <button onClick={u_closeModal}>close</button>
                </div>
                <form action="" onSubmit={updateblog}>
                    <div className="form-group">
                        <label htmlFor="Field">Field</label>
                        <input type="text" name="" defaultValue={editCat[0].field} placeholder='Field' id="" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Field">Interest</label>
                        <MultiSelect
                            options={interestopt}
                            value={interest}
                            onChange={setinterest}
                            labelledBy="Select"
                            required
                            isCreatable={true}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit">Update</button>
                    </div>
                </form>

            </Modal>
            <Container className="" fluid>
                <Row>
                    <Col sm={6}>
                        <div className="secHead">
                            <h3>
                                Category
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
                                        <GrFormAdd /> Add Cat
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    {
                        (loaded) ?
                            cat.map((number, key) => <Col key={key} className={`${layout ? 'col-md-4' : 'col-md-12'}`}>
                                <div className="singleTest">
                                    <Row>
                                        <Col md={6}>
                                            <Row>
                                                <Col className={`${layout ? 'col-md-12' : 'col-md-6'}`}>
                                                    <div className="TestNum">
                                                        <span>Field</span>
                                                        <p style={{ textTransform: 'UpperCase' }}>{number.field}</p>
                                                    </div>
                                                </Col>
                                                <Col className={`${layout ? 'col-md-12' : 'col-md-6'}`}>

                                                    <div className="testDate">
                                                        <span>Interests</span>
                                                        <ul className="interest">

                                                            {
                                                                number.interest.map((res) =>
                                                                    <li>{res.value}</li>
                                                                )
                                                            }
                                                        </ul>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md={6}>
                                            <div className={`testActBtns ${layout ? 'btn_grid' : 'btn_flex'}`}>

                                                <div className="udAct">
                                                    <div onClick={() => {
                                                        editTest(number._id).then((result) => {
                                                            seteditcat(result)
                                                            u_openModal()
                                                        })
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
