import { gql } from "@apollo/client";

// graphQl queries
const ADD_AUTHOR = gql`
  mutation AddAuthor(
    $name: String!
    $age: Int!
    $dob: String!
    $native: String!
    $martialStatus: String!
  ) {
    addAuthor(
      name: $name
      age: $age
      dob: $dob
      native: $native
      martialStatus: $martialStatus
    ) {
      name
      age
      dob
      native
      martialStatus
    }
  }
`;

const ADD_BOOK = gql`
  mutation AddBook(
    $name: String!
    $genre: String!
    $filmAdaption: String!
    $authorId: String!
  ) {
    addBook(
      name: $name
      genre: $genre
      filmAdaption: $filmAdaption
      authorId: $authorId
    ) {
      name
      genre
      filmAdaption
      authorId
    }
  }
`;

const GET_BOOK_LIST = gql`
  {
    books {
      id
      name
      genre
      filmAdaption
      authorId
    }
  }
`;

const GET_AUTHOR_LIST = gql`
  {
    authors {
      id
      name
    }
  }
`;

const GET_BOOK = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      filmAdaption
      author {
        name
        dob
        native
        martialStatus
      }
    }
  }
`;

const UPDATE_AUTHOR = gql`
  mutation UpdateAuthor(
    $id: ID!
    $name: String!
    $age: Int!
    $dob: String!
    $native: String!
    $martialStatus: String!
  ) {
    updateAuthor(
      id: $id
      name: $name
      age: $age
      dob: $dob
      native: $native
      martialStatus: $martialStatus
    ) {
      name
      age
      dob
      native
      martialStatus
    }
  }
`;

const UPDATE_BOOK = gql`
  mutation UpdateBook(
    $id: String!
    $name: String!
    $genre: String!
    $filmAdaption: String!
    $authorId: String!
  ) {
    updateBook(
      id: $id
      name: $name
      genre: $genre
      filmAdaption: $filmAdaption
      authorId: $authorId
    ) {
      id
      name
      genre
      filmAdaption
      authorId
    }
  }
`;

const DELETE_BOOK = gql`
  mutation DeleteBook(
    $id: String!
  ) {
    deleteBook(
      id: $id
    ) {
      id
      name
      genre
      filmAdaption
      authorId
    }
  }
`;

export {
  ADD_AUTHOR,
  UPDATE_AUTHOR,
  GET_AUTHOR_LIST,
  ADD_BOOK,
  UPDATE_BOOK,
  DELETE_BOOK,
  GET_BOOK_LIST,
  GET_BOOK,
};
