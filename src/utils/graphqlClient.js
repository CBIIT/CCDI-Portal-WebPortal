import {
  ApolloClient, InMemoryCache, ApolloLink, HttpLink,
} from '@apollo/client';
import env from './env';

const defaultOptions = {
  query: {
    fetchPolicy: 'no-cache',
  },
};

const BACKEND = env.REACT_APP_BACKEND_API;
const INTEROP_SERVICE = `${env.REACT_APP_INTEROP_SERVICE_API}graphql`;

const interopService = new HttpLink({
  uri: INTEROP_SERVICE,
});

const backendService = new HttpLink({
  uri: BACKEND,
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions,
  link: ApolloLink.split( // This is 3rd level of ApolloLink.
            (operation) => operation.getContext().clientName === 'interopService',
            // the string "interopService" can be anything you want,
            interopService, // <= apollo will send to this if clientName is "interopService"
            backendService, // <= otherwise will send to this
          ), // <= otherwise will send to this
});

export default client;
