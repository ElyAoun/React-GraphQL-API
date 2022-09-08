import React, {useState, useEffect} from 'react'
import {Form, Button} from 'react-bootstrap'
import {useQuery, useMutation} from '@apollo/client'
import {getAuthorsQuery} from '../GraphQL/Authors'
import {getBookByIdQuery, updateBookMutation} from '../GraphQL/Books'
import FormContainer from './FormContainer'
import Loader from './Loader'
import Message from './Message'
import { useParams } from 'react-router-dom'
 
const EditBook = () => {

    const {bookId} = useParams()

    const [title, setTitle] = useState("")
    const [authorId, setAuthorId] = useState(0)

    const { loading: loadingBook, error: errorBook, data: dataBook } = useQuery(getBookByIdQuery, 
        {variables: { id: parseInt(bookId) },
    });


    const {loading: loadingQuery, error: errorQuery, data:dataQuery} = useQuery(getAuthorsQuery)

    const [updateBook, {data, loading, error}] = useMutation(updateBookMutation)


    const submitHandler = (e) => {
        e.preventDefault()
        console.log(authorId)
        updateBook({variables:{id: parseInt(bookId), book: {id:parseInt(bookId), title:title, authorId:authorId}}})
        window.location.href = "/books";
    }


    useEffect(() => {
        setTitle(dataBook?.book.title)
        setAuthorId(dataBook?.book.author.id)
    }, [dataBook, data]);

    
    return (
        <div>
            <h1 style={{display:"flex", alignItems:"center", justifyContent:"center"}}>Edit Book</h1>
            {loadingBook && <Loader/>}
            {errorBook && <Message variant='danger'>{errorBook}</Message>}
            <FormContainer>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
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
                    <Form.Select defaultValue={authorId} onChange={(e)=>{setAuthorId(parseInt(e.target.value))}} style={{border:'1px solid grey'}}>
                        <option>{authorId}</option>
                        {dataQuery?.authors && dataQuery.authors.map((author, i) => (
                                <option key={i} value={author.id}>{author.name}</option>
                        ))}
                    </Form.Select>
                    <br></br>
                    <Button type='submit' variant='primary'>Save</Button>
                </Form>
            </FormContainer>
            {loading && <Loader />}
            {error && <Message variant='danger'>{error}</Message>}
        </div>    
    )
}

export default EditBook
