import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

import typeDefs from './schemas'
import resolvers from './resolvers'
import models from './models'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
const PORT = 3000;

const app = express();

// bodyParser is needed just for POST.
app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
  context: {
    models
  }
}));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled


mongoose.connect('mongodb://localhost:27017/instagram-clone', {useMongoClient: true}).then(
  () => {
    console.log('Conectado a Mongo!!!!')
    app.listen(PORT, ()=>{
      console.log('Running GRAPHQL server...');
    });
  }
)
