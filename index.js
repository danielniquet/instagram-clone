import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
import cors from 'cors';

// import typeDefs from './schemas'
// import resolvers from './resolvers'
import models from './models'

//mezclar todos los archivos de carpetas de types y resolvers
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './types')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
const PORT = 3000;
const SECRET = "ajhfshflkjfFSDFSjwehrkwjr;qek";

const app = express();
app.use(cors({
  origin:["http://localhost:3001"]
}))

// bodyParser is needed just for POST.
app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
  context: {
    models,
    SECRET,
    user: {
      _id: 1, username: 'bob'
    }
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
