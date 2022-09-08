import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import {useQuery, useMutation} from '@apollo/client'
import {addAuthorMutation} from '../GraphQL/Authors'
import FormContainer from './FormContainer'
import Loader from './Loader'
import Message from './Message'
 
const AddAuthor = () => {
    const [name, setName] = useState("")

    const [addAuthor, {data, loading, error}] = useMutation(addAuthorMutation)

    const submitHandler = (e) => {
        e.preventDefault()
        addAuthor({variables:{author: {id:0, name:name}}})
        window.location.href = "/authors";
    }

    return (
        <div>
            <h1 style={{display:"flex", alignItems:"center", justifyContent:"center"}}>Add Author</h1>
            <FormContainer>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name' >
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            style={{border:'1px solid grey'}}
                            type='text'
                            placeholder='Name'
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <br></br>
                    <Button type='submit' variant='primary'>Add</Button>
                </Form>
            </FormContainer>
            {loading && <Loader />}
            {error && <Message variant='danger'>{error}</Message>}
        </div>    
    )
}

export default AddAuthor
