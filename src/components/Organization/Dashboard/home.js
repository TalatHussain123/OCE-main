import React from 'react'
import Stats from './stats';
import { FaPlus } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

export default function home() {
  return (
    <div className=''>
      <Container fluid>
        <Row className='numStats'>
          <Col sm={3}>
            <div className='singleStat bg-white rounded-md p-[12px]'  >
              <div className='statnumber flex items-center justify-between'>
                <h5 className='text-2xl font-light'>1</h5>

              </div>
              <div className='statTitle' >
                <h3 className='text-2xl uppercase font-bold mt-3'>Condidates</h3>
              </div>  
            </div>
          </Col>
          <Col sm={3}>
            <div className='singleStat bg-white rounded-md p-[12px]'  >
              <div className='statnumber flex items-center justify-between'>
                <h5 className='text-2xl font-light'>1</h5>

              </div>
              <div className='statTitle' >
                <h3 className='text-2xl uppercase font-bold mt-3'>Test</h3>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Stats/>
      <div className='sysTutorial'>
      <Container>
        <h2>Tutorial Help</h2>
        <Row>
          <Col sm={4}>
            <div className='singleTut'>
            <iframe width="346" height="170" src="https://www.youtube.com/embed/qXXknB5bePU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </Col>
          <Col sm={4}>
          <div className='singleTut'>
          <iframe width="346" height="170" src="https://www.youtube.com/embed/qXXknB5bePU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
            </Col>
          <Col sm={4}>
          <div className='singleTut'>
          <iframe width="346" height="170" src="https://www.youtube.com/embed/qXXknB5bePU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
            </Col>
        </Row>
      </Container>
      </div>
    </div>
  )
}
