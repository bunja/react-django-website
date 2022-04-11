import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link , useLocation, useNavigate} from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { login } from '../actions/userActions'

import FormContainer from '../components/FormContainer'

function LoginScreen() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
 

    const redirect = location.search ? location.search.split('=')[1] : '/'
    console.log('location.search ', location )

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin
    console.log('user info', userInfo)

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
            console.log("User Info in useEffect ", userInfo)
            
        }
    }, [ navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('submit handler is working')
        dispatch(login(email, password))
    }
   
    return (
        <FormContainer>
            <h1>Sign In</h1>
            { error && <Message variant='danger'>{error}</Message>}
            { loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Adress</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        Sign In
                    </Button>
            </Form>

            <Form className='py-3'>
                <Col>
                    New user? 
                    <Link to={redirect ? `/registr?redirect=${redirect}` : '/register'}> Register</Link>
                </Col>
            </Form>
        </FormContainer>
    )
}

export default LoginScreen