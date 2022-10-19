import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';
import Logo from '../../assets/logo.png'
export default function SingleBlog() {
    const [blog, setblog] = useState([{
        title:"",
        field:[],
        Interest:[],
        

    }])
    const search = useLocation().search;
    const id = new URLSearchParams(search).get('_id');
    useEffect(()=>{
        const getBlog = axios.get(`http://localhost:3001/blogBy`, {
          params: {
              _id: id,
          },
      });
      Promise.all([getBlog]).then(function (result) {
        const testObj = JSON.parse(JSON.stringify(result[0].data));
        setblog(testObj)
    });
      },[])
      console.log(blog);
  return (
    <Container>
    <Row className='blognav'>
        <Col>
            <div className="logo">
                <img src={Logo} alt="" />
            </div>
        </Col>
    </Row>
    <Row>
        <Col>
        <div className="btitle">
            <h2 className="title">
                {blog[0].title}
            </h2>
        </div>
        <Row className='metaData'>
            <Col>
            <div className="bfield">
            {blog[0].field.map((val)=>
            <span className="fieldS">{val}</span>
            )}
            </div>
            
            </Col>
        </Row>

        <Row className='bContent'>
            <p>
                {
                   blog[0].content
                }
            </p>
        </Row>
        <Row className='metaData'>
        <Col>
            <div className="binterest">
            {blog[0].Interest.map((val)=>
            <span className="interestS">{val}</span>
            )}
            </div>
            </Col>
        </Row>
        </Col>
    </Row>
</Container>
  )
}
