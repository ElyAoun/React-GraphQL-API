import {gql} from '@apollo/client'
import { useQuery } from '@apollo/client';

export const getBooksQuery = gql`
    query{
        books{
            id,
            title,
            author{
                name
            }
        }
    }
`

export const getBookByIdQuery = gql`
    query ($id:Int!){
        book (id: $id){
        id,
        title,
        author {
            id,
            name
        }
        }
    }
`

export const addBookMutation = gql`
    mutation($book: BookInput!){
        addBook (newBook: $book){
            id,
            title
        }
    }
`

export const updateBookMutation = gql`
    mutation($id: Int!, $book: BookInput!){
        bookUpdate (id: $id, newBook: $book){
            id,
            title,
            authorId
        }
    }
`

export const deleteBookMutation = gql`
    mutation($id: Int!){
        deleteBook(id: $id)
    }
`