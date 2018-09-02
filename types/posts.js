export default `
  scalar Upload

  type Post{
    _id: ID!
    by: User
    effect: String
    photo: String
    likedBy:[User]
    comments: [Comment]
    createdAt: String
  }
  type Comment{
    user: User
    text: String
  }
  input iBy {
    username: String!
    thumbnail: String
  }
  input iPost{
    desc: String
    photo: String
    effect: String
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
    createPost(post: iPost): Response!
    singleUpload (file: Upload!): File!
  }
`;
