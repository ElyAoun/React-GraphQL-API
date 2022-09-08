import React from 'react'
import {useQuery} from '@apollo/client'
import {getBookByIdQuery} from '../GraphQL/Books'
import Loader from './Loader'
import Message from './Message'
import {useParams} from 'react-router-dom'

const BookDetails = () => {

    const {id} = useParams()

    const { loading, error, data } = useQuery(getBookByIdQuery,
        {variables: { id: parseInt(id) }}
    );


  return (
    <div>
        {loading && <Loader/>}
        {error && <Message variant="danger">{error}</Message>}
        {data && <div>{data.book.title}</div>}
    </div>
  )
}

export default BookDetails
