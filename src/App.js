import React from 'react'
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'


//components
import BooksList from './components/BooksList'
import AuthorsList from './components/AuthorsList'
import AddBook from './components/AddBook'
import AddAuthor from './components/AddAuthor'
import EditBook from './components/EditBook'
import EditAuthor from './components/EditAuthor'
import BookDetails from './components/BookDetails'
import AuthorDetails from './components/AuthorDetails'

const client = new ApolloClient({
  uri:'https://localhost:44371/graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Routes>
            <Route path='/books' element={<BooksList/>} />
            <Route path='/authors' element={<AuthorsList/>} />
            <Route path='/addBook' element={<AddBook/>} />
            <Route path='/addAuthor' element={<AddAuthor/>} />
            <Route path='/editBook/:bookId' element={<EditBook/>} />
            <Route path='/editAuthor/:authorId' element={<EditAuthor/>} />
            <Route path='/book/:id' element={<BookDetails/>} />
            <Route path='/author/:id' element={<AuthorDetails/>} />
          </Routes> 
        </div>
      </Router>  
    </ApolloProvider>
  );
}

export default App;
