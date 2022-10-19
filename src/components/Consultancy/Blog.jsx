import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useLocation, useParams } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import './style.css'
export default function Blog() {
  const search = useLocation().search;
  const [blogs,setblogs]=useState([])
  const cat = new URLSearchParams(search).get('cat');
  const subcategories = new URLSearchParams(search).get('subcat');
  console.log(cat, subcategories);
  const subcatArray = subcategories.split(",");
  console.log(subcatArray);
  useEffect(()=>{
    const getBlog = axios.get(`http://localhost:3001/blog`, {
      params: {
          cat: cat,
          subcat:subcatArray
      },
  });
  Promise.all([getBlog]).then(function (result) {
    console.log('done');
    const testObj = JSON.parse(JSON.stringify(result[0].data));
    console.log('d',testObj);
    setblogs(testObj)
});
  },[])
  console.log(blogs,subcatArray);
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
            <span></span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
        <section className='blogSection'>
        <Row>
          <Col>
            <div className="headText">
              <h2>Here Your Recommended Paths/Fields</h2>
            </div>
          </Col>
        </Row>
        <Row>
          {
            blogs.map((val)=>
            
          <Col sm={3}>
            <div className="blogcard">
              <span className="tag">{val.tag}</span>
              <Link to={`/blog?_id=${val._id}`}>
              <p>{val.title}</p>

              </Link>
              <div className="intTag">
                {
                  val.Interest.map((val)=>
                <span className="interest">
                 {val}
                </span>

                  )
                }
              </div>
            </div>
          </Col>
            )
          }
        </Row>
        </section>
        </Col>
      </Row>
    </Container>
  )
}
