import React, {  useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useParams, useNavigate, Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'

import { getOrderDetails } from '../actions/orderActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

function OrderScreen() {
    const { id } = useParams()
    console.log("orderScreen ID===>", id)
    
    const dispatch = useDispatch()
   
    const navigate = useNavigate()
    const orderDetails = useSelector(state => state.orderDetails)
    // const orderDetails = useSelector(state => state.orderCreate)
    const state = useSelector(state => state)
    console.log('state', state)
    console.log('orderScreen ORDER DETAILS==>>>', orderDetails)

    const { order, error, loading } = orderDetails
    console.log('orderScreen ORDER++++>>>', order)
    
    if (!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + Number(item.price * item.qty), 0).toFixed(2)
    }

    useEffect(() => {
        if (!order || order._id !== Number(id)) {
            dispatch(getOrderDetails(id))
        }

    }, [dispatch, order, id])



    return loading ? (
        <Loader />
    ) : error ? (<Message variant="danger">{error}</Message>
    ) : (
        <div>
            <h1> Order: {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name:</strong>{order.user.name}</p>
                            <p><strong>Email:</strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong> Shipping: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city},
                                {' '}
                                {order.shippingAddress.postalCode},
                                {' '}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                            ) : (
                                <Message variant='warning'>Not delivered</Message>
                            )}
                            
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong> Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant='success'>Paid on {order.paidAt}</Message>
                            ) : (
                                <Message variant='warning'>Not paid</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ?
                                <Message varianr='info'>
                                    Your order is empty
                                </Message> : (
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>

                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>

                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </Col>

                                                    <Col md={4}>
                                                        {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Col>
                                    Items:
                                </Col>
                                <Col>
                                    ${order.itemsPrice}
                                </Col>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Col>
                                    Shipping:
                                </Col>
                                <Col>
                                    ${order.shippingPrice}
                                </Col>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Col>
                                    Tax:
                                </Col>
                                <Col>
                                    ${order.taxPrice}
                                </Col>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Col>
                                    Total:
                                </Col>
                                <Col>
                                    ${order.totalPrice}
                                </Col>
                            </ListGroup.Item>



                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

    
export default OrderScreen