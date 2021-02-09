import { gql } from 'apollo-server';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    password: String!
    name: UserName!
    zip: String!
    pets: [Pet]!
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
    id: ID!
    name: String!
    type: String!
    breed: String!
    userId: ID!
  }

  input PetInput {
    name: String!
    type: String!
    breed: String!
    userId: ID!
  }

  type Query {
    user(id: ID!): User

    pet(id: ID!): Pet
  }

  type Mutation {
    createUser(props: UserInput!): ID!

    updateUser(id: ID!, props: UserInput): User!

    createPet(props: PetInput!): Pet!

    updatePet(id: ID!, props: PetInput!): Pet!

    login(username: String!, password: String!): ID!
  }
`;
