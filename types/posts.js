export default `
  scalar Upload

  type Post{
    _id: ID!
    by: User
    desc: String
    photo: String
    likedBy:[User]
    comments: [User]
    createdAt: String
  }
  input iBy {
    username: String!
    thumbnail: String
  }
  input iPost{
    desc: String,
    photo: String,
  }
  type File {
    id: ID!
    path: String!
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Query{
    getPost(_id: ID!): Post!
  }


  type Mutation{
    createPost(post: iPost): Post!
    singleUpload (file: Upload!): File!
  }
`;
