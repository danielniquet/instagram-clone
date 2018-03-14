import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider } from 'react-apollo';


import client from './apollo'

const App =
<ApolloProvider client={client}>
  <Routes />
</ApolloProvider>

ReactDOM.render(App, document.getElementById('root'));
registerServiceWorker();
