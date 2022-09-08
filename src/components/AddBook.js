import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import {useQuery, useMutation} from '@apollo/client'
import {getAuthorsQuery} from '../GraphQL/Authors'
import {addBookMutation} from '../GraphQL/Books'
import FormContainer from './FormContainer'
import Loader from './Loader'
import Message from './Message'
 
const AddBook = () => {
    const [title, setTitle] = useState("")
    const [authorId, setAuthorId] = useState(0)

    const {loading: loadingQuery, error: errorQuery, data:dataQuery} = useQuery(getAuthorsQuery)

    const [addBook, {data, loading, error}] = useMutation(addBookMutation)

    const submitHandler = (e) => {
        e.preventDefault()
        addBook({variables:{book: {id:0, title:title, authorId:authorId}}})
        window.location.href = "/books";
    }

    return (
        <div>
            <h1 style={{display:"flex", alignItems:"center", justifyContent:"center"}}>Add Book</h1>
            <FormContainer>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name' >
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            style={{border:'1px solid grey'}}
                            type='text'
                            placeholder='Name'
                            value={title}
                            onChange={(e)=>setTitle(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <br></br>
                    <Form.Select onChange={(e)=>{setAuthorId(parseInt(e.target.value))}} style={{border:'1px solid grey'}}>
                        <option>Select Author</option>
                        {dataQuery?.authors && dataQuery.authors.map((author, i) => (
                                <option key={i} value={author.id}>{author.name}</option>
                        ))}
                    </Form.Select>
                    <br></br>
                    <Button type='submit' variant='primary'>Add</Button>
                </Form>
            </FormContainer>
            {loading && <Loader />}
            {error && <Message variant='danger'>{error}</Message>}
        </div>    
    )
}

export default AddBook
