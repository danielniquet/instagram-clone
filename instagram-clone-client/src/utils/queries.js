import gpl from 'graphql-tag';

export default {
  query:{

  },
  mutation:{
    createUser: gpl`
      mutation($username: String!, $password: String!, $fullname: String!, $email: String!){
        createUser(username:$username, password:$password, fullname:$fullname, email:$email)
      }
    `
  },
  // subscription:{},
}
