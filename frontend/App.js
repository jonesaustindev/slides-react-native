import React from "react";
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { createUploadLink } from 'apollo-upload-client';

import AppContainer from './AppContainer';
import { endpoint } from './config';
import { getToken } from './auth';

const authLink = setContext(async (req, { headers }) => {
  const token = await getToken();
  return {
    ...headers,
    headers: {
      authorization: token ? `Bearer ${token}` : null
    }
  }
})

// const httpLink = new HttpLink({
//   uri: endpoint
// })

const link = authLink.concat(createUploadLink({
  uri: endpoint,
}));

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppContainer />
      </ApolloProvider>
    )
  }
}