import React, {useState, useEffect} from 'react'
import {useQuery, useMutation} from '@apollo/client'
import {getBooksQuery, deleteBookMutation} from '../GraphQL/Books'
import {Table, Button} from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'

const BooksList = () => {
    const {loading, error, data} = useQuery(getBooksQuery)
  
    const [deleted, setDeleted] = useState(false)
    const [deleteBook, {data: dataDelete, loading: loadingDelete, error: errorDelete}] = useMutation(deleteBookMutation)

    const buttonHandler = (id) => {
      deleteBook({variables:{id: id}})
      window.location.href = "/books";
    }
    
    return (
      <div>
      <h1 style={{display:'flex', alignItems:'center', justifyContent:'center'}}>Books</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm' style={{maxWidth:'80%', margin:'auto', border:'1px solid grey'}}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data && data.books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td><Button onClick={()=>buttonHandler(book.id)} variant="danger">Delete</Button>
                    <a className='btn' style={{backgroundColor:'green', color:'white', marginLeft:'10px'}} href={`/editBook/${book.id}`}>Edit</a></td>
                
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
    
    )
}

export default BooksList