import gql from "graphql-tag";

export default {
  query: {
    me: gql`
      {
        me {
          _id
          username
          fullname
          email
          thumbnail
        }
      }
    `
  },
  mutation: {
    singleUpload: gql`
      mutation($file: Upload!) {
        singleUpload(file: $file) {
          id
          path
          filename
          mimetype
          encoding
        }
      }
    `,
    createPost: gql`
      mutation($post: iPost) {
        createPost(post: $post) {
          success
          errors {
            path
            message
          }
        }
      }
    `
  }
};
