import ApolloClient from 'apollo-boost';
import { endpoint, prodEndpoint } from '../config';

const client = new ApolloClient({
  uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
  // local data
  // clientState: {
  //   resolvers: {},
  //   defaults: {}
  // }
});

export default client;
