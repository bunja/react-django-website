import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts } from '../actions/productActions'
import { useNavigate, useLocation } from 'react-router-dom'


function HomeScreen() {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { error, loading, products } = productList

    const navigate = useNavigate()
    const location = useLocation()

    let keyword = location.search
    
    console.log('keyword', keyword)
   
    useEffect(() => {
        dispatch(listProducts(keyword))
    }, [dispatch, keyword]);



    return (
        <div>
            <h1> Latest Products</h1>
            {loading ? <Loader/>
                : error ? <Message variant='dark'>{error}</Message>
                    : <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <h3>
                                    <Product product={product} />
                                </h3>
                            </Col>
                        ))}
                    </Row>
            }

        </div>
    );
}

export default HomeScreen;
