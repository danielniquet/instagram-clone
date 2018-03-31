import gql from 'graphql-tag'

export default {
  query:{
  },
  mutation:{
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
    mutation($post: iPost){
        createPost(post: $post){
          success
          errors{
            path
            message
          }
        }
      }
    `
  }
}
