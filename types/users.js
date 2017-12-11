export default `

  type Error{
    path: String!
    message: String!
  }

  type User{
    _id: ID!
    username: String!
    password: String!
    fullname: String!
    email: String!
    thumbnail: String
  }

  type Query{
    allUsers: [User]!
    getUser(_id: ID!): User!
  }

  type Response {
    success: Boolean!
    errors: [Error]
  }

  type Mutation{
    createUser(username: String!, password: String!, fullname: String!, email: String!): Response!
  }
`;
