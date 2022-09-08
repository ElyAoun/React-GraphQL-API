import React, {useState, useEffect} from 'react'
import {Form, Button} from 'react-bootstrap'
import {useQuery, useMutation} from '@apollo/client'
import {getAuthorByIdQuery, updateAuthorMutation} from '../GraphQL/Authors'
import FormContainer from './FormContainer'
import Loader from './Loader'
import Message from './Message'
import { useParams } from 'react-router-dom'
 
const EditAuthor = () => {

    const {authorId} = useParams()

    const [name, setName] = useState("")

    const { loading: loadingAuthor, error: errorAuthor, data: dataAuthor } = useQuery(getAuthorByIdQuery, 
        {variables: { id: parseInt(authorId) },
    });

    const [updateAuthor, {data, loading, error}] = useMutation(updateAuthorMutation)


    const submitHandler = (e) => {
        e.preventDefault()
        updateAuthor({variables:{id: parseInt(authorId), author: {id:parseInt(authorId), name:name}}})
        window.location.href = "/authors";
    }


    useEffect(() => {
        setName(dataAuthor?.author.name)
    }, [dataAuthor]);

    
    return (
        <div>
            <h1 style={{display:"flex", alignItems:"center", justifyContent:"center"}}>Edit Book</h1>
            {loadingAuthor && <Loader/>}
            {errorAuthor && <Message variant='danger'>{errorAuthor}</Message>}
            <FormContainer>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
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
                    <Button type='submit' variant='primary'>Save</Button>
                </Form>
            </FormContainer>
            {loading && <Loader />}
            {error && <Message variant='danger'>{error}</Message>}
        </div>    
    )
}

export default EditAuthor
