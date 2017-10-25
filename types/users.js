export default `
  type UserShort {
    _id: ID,
    username: String!,
    thumbnail: String,
  }

  type User{
    _id: ID!
    username: String!
    password: String!

  }

  type Query{
    allUsers: [User]!
    getUser(_id: ID!): User!
  }

  type Mutation{
    createUser(username: String!, password: String!): User!
  }
`;
