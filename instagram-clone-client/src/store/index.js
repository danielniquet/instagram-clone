import React, { Component, createContext, Fragment } from 'react';
import { ApolloConsumer } from 'react-apollo';
import ActionTypes from './ActionTypes';
import reducer from './reducers';
import { Message } from 'semantic-ui-react';

const { Provider, Consumer } = createContext();

class ContextStore extends Component {
  state = {
    user: {},
    posts: [],
    error: false,
    dispatch: async action => {
      const response = await reducer(this.state, action, this.client);
      console.log(response);

      this.setState(response);
    }
  };

  client = null;
  render() {
    const { error } = this.state;

    return (
      <Provider value={this.state}>
        <ApolloConsumer>
          {client => {
            this.client = client;
            return (
              <Fragment>
                {this.props.comp}
                {error ? (
                  <Message negative>
                    <Message.Header>
                      Ooops! Un error ha ocudrrido
                    </Message.Header>
                    <p>{error}</p>
                  </Message>
                ) : null}
              </Fragment>
            );
          }}
        </ApolloConsumer>
      </Provider>
    );
  }
}

const WrapperConsumer = Component => {
  return props => {
    return (
      <Consumer>
        {context => <Component {...props} context={context} />}
      </Consumer>
    );
  };
};

export default WrapperConsumer;
export { ActionTypes };
export { ContextStore };
