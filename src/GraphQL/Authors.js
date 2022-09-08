import {gql} from '@apollo/client'

export const getAuthorsQuery = gql`
    {
        authors{
            id,
            name
        }
    }
`

export const getAuthorByIdQuery = gql`
    query ($id:Int!){
        author (id: $id){
        id,
        name,
        }
    }
`

export const addAuthorMutation = gql`
    mutation($author: AuthorInput!){
        addAuthor (newAuthor: $author){
            id,
            name
        }
    }
`

export const updateAuthorMutation = gql`
    mutation($id: Int!, $author: AuthorInput!){
        updateAuthor (id: $id, newAuthor: $author){
            id,
            name
        }
    }
`

export const deleteAuthorMutation = gql`
    mutation($id: Int!){
        deleteAuthor(id: $id)
    }
`