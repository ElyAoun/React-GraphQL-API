import React, {useEffect} from 'react'
import {useQuery, useMutation} from '@apollo/client'
import {getAuthorsQuery, deleteAuthorMutation} from '../GraphQL/Authors'
import {Table, Button} from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'

const AuthorsList = () => {

    const {loading, error, data} = useQuery(getAuthorsQuery)

    const [deleteAuthor, {data: dataDelete, loading: loadingDelete, error: errorDelete}] = useMutation(deleteAuthorMutation)

    const buttonHandler = (id) => {
      deleteAuthor({variables:{id: id}})
      window.location.href = "/authors";
    }

    return (
      <div>
      <h1 style={{display:'flex', alignItems:'center', justifyContent:'center'}}>Authors</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm' style={{maxWidth:'80%', margin:'auto', border:'1px solid grey'}}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data && data.authors.map((author) => (
              <tr key={author.id}>
                <td>{author.id}</td>
                <td>{author.name}</td>
                <td><Button onClick={()=>buttonHandler(author.id)} variant="danger">Delete</Button>
                <a className='btn' style={{backgroundColor:'green', color:'white', marginLeft:'10px'}} href={`/editAuthor/${author.id}`}>Edit</a></td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
    )
}

export default AuthorsList