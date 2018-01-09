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
    token: String
    errors: [Error]
  }

  type Mutation{
    login(email: String!, password: String!): Response!
    createUser(username: String!, password: String!, fullname: String!, email: String!): Response!
  }
`;
