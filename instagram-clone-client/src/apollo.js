import { ApolloClient } from 'apollo-client';
// import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client'

const httpLink = createUploadLink({uri:'http://localhost:3000/graphql'})

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      "x-token": localStorage.getItem('token') || null,
    }
  });
  return forward(operation);
})


const authAfterware = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    const context = operation.getContext();
    const { response: { headers } } = context;
    if (headers) {
      const token = headers.get("x-token");

      if (token) {
        localStorage.setItem("token", token);
      }
    }
    if(response.errors && response.errors.length){
      if(response.errors[0].message==="No autenticado"){
        localStorage.removeItem('token')
        window.location = "/login"
      }
    };
    return response;
  });
});


export default new ApolloClient({
  link: authAfterware.concat(authMiddleware.concat(httpLink)),
  cache: new InMemoryCache()
});
