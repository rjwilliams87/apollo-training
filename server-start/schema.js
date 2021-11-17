import { gql } from 'apollo-server';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    password: String!
    name: UserName!
    zip: String!
  }

  input UserInput {
    username: String!
    password: String!
    name: UserNameInput!
    zip: String!
  }

  type UserName {
    first: String!
    last: String
  }

  input UserNameInput {
    first: String
    last: String
  }

  type Pet {

  }

  input PetInput {

  }

  type Query {
    user(id: ID!): User

  }

  type Mutation {
    createUser(props: UserInput!): ID!

    updateUser(id: ID!, props: UserInput): User!

    login(username: String!, password: String!): ID!
  }
`;
