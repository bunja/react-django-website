import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function CheckoutSteps({ step1, step2, step3, step4 }) {
    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {step1 ? (<LinkContainer to='/login' className='d-inline'>
                    <Nav.Link>
                        Login
                    </Nav.Link>
                </LinkContainer>
                ) : (
                    <Nav.Link className='d-inline' disabled>Login</Nav.Link>
                )}

                {step2 ? (<LinkContainer to='/shipping' className='d-inline'>
                    <Nav.Link>
                        Shipping
                    </Nav.Link>
                </LinkContainer>
                ) : (
                    <Nav.Link className='d-inline' disabled>Shipping</Nav.Link>
                )}

                {step3 ? (<LinkContainer to='/payment' className='d-inline'>
                    <Nav.Link>
                        Payment
                    </Nav.Link>
                </LinkContainer>
                ) : (
                    <Nav.Link className='d-inline' disabled>Payment</Nav.Link>
                )}

                {step4 ? (<LinkContainer to='/placeorder' className='d-inline'>
                    <Nav.Link>
                        Place Order
                    </Nav.Link>
                </LinkContainer>
                ) : (
                    <Nav.Link className='d-inline' disabled >Place Order</Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps