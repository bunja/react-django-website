import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'


function SearchBox() {
    const [ keyword, setKeyword ] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    // console.log('Location', location)

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword){
            navigate(`/?keyword=${keyword}`)
        } else {
            navigate(location.pathname)
        }
    }
  return (
    <Form onSubmit={submitHandler} className='search-box'>
        <Form.Control
            type='text'
            name='q'
            onChange={(e) => setKeyword(e.target.value)}
            className='mr-sm-2 m1-sm-5'
        >

        </Form.Control>
        <Button
            type='submit'
            variant='outline-success'
            className='p-2 m-13'
            
        >
            Submit
        </Button>
    </Form>
  )
}

export default SearchBox