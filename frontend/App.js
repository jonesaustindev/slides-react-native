import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { endpoint } from './config';

import Navigator from './Navigator';

const client = new ApolloClient({
  link: new HttpLink({
    uri: endpoint
  }),
  cache: new InMemoryCache()
})

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Navigator />
      </ApolloProvider>
    )
  }
}

export default App;