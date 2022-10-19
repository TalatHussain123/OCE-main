import React, { useEffect, useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Row, Col, Container } from 'react-bootstrap';

export default function ApplyTest() {
  const navigate = useNavigate();
  const { applyTest,id } = useParams()
  const [test,settest]=useState([])
  const [product, setproduct] = useState({
    price: 0
  });
  useEffect(() => {
    const oid = localStorage.getItem('oid')
    const getTest = axios.get('http://localhost:3001/findTest', {
      params: {
        id: applyTest
      },
    })
    Promise.all([getTest]).then(function (result) {
      const testObj = JSON.parse(JSON.stringify(result[0].data));
      settest(testObj)
      setproduct({
        id: testObj._id,
        price: testObj.Price
      })
    });
  }, [applyTest])
  function addInvoice(){
    const payload={
      testid:applyTest,
      stdid:id,
      oid:test.oId,
      paid:test.Price
    }
    console.log('invoice',payload);
    axios.post('http://localhost:3001/invoice', payload).then((result) => {
      alert('Test Applied')
      navigate(`/std/${id}/tests`)
    }).catch((err) => {
      console.log(err)
    })
  }
  const makePayment = token => {
    const body = {
      token,
      product
    }
    const header = {
      "Content-Type": 'application/json'
    }
    axios.post('http://localhost:3001/payment', body, header).then((result) => {
      console.log(result)
      addInvoice()
    }).catch((err) => {
      console.log(err)
    })
  }
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <div className="appltestContent">
              <div className="TestHead">
                <h3>Test Checkout</h3>
              </div>
              <div className="PriceDetr">
                <Row>
                  <Col>
                  <div className="priceHead">

                    Price
                  </div>
                  </Col>
                  <Col>
                  <div className="Pricetest">

                    {product.price}
                  </div>
                  </Col>
                </Row>
              </div>
              <div className="PriceBtn">

              <StripeCheckout
              stripeKey='pk_test_51IN2oZBoLJ8PZCNotpFO3ZFqrS4itYOA5HA2rz3jMR45kiKOBNgxLr3gVMCZShlXhgrFFxeBZhwHA8GF7YTuI73N00MyQIfNWK'
              token={makePayment}
            >
              <button>Pay For Test</button>
            </StripeCheckout>
              </div>
            </div>
           
          </Col>
        </Row>
      </Container>



    </div>
  )
}
