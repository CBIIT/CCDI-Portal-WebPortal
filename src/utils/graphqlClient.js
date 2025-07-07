import {
  ApolloClient, InMemoryCache, ApolloLink, HttpLink,
} from '@apollo/client';
import env from './env';

// const defaultOptions = {
//   query: {
//     fetchPolicy: 'cache-first',
//   },
// };

const BACKEND = env.REACT_APP_BACKEND_API;
const INTEROP_SERVICE = `${env.REACT_APP_INTEROP_SERVICE_API}graphql`;

const interopService = new HttpLink({
  uri: INTEROP_SERVICE,
});

const backendService = new HttpLink({
  uri: BACKEND,
});

// Custom link to set fetchPolicy based on operation
const dynamicFetchPolicyLink = new ApolloLink((operation, forward) => {
  // Set fetchPolicy based on clientName in context
  const clientName = operation.getContext().clientName;
  if (clientName === 'interopService') {
    operation.setContext(({ fetchOptions = {} }) => ({
      fetchOptions: {
        ...fetchOptions,
        fetchPolicy: 'no-cache',
      },
    }));
  } else {
    operation.setContext(({ fetchOptions = {} }) => ({
      fetchOptions: {
        ...fetchOptions,
        fetchPolicy: 'cache-first',
      },
    }));
  }
  return forward(operation);
});

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   defaultOptions,
//   link: ApolloLink.split( // This is 3rd level of ApolloLink.
//             (operation) => operation.getContext().clientName === 'interopService',
//             // the string "interopService" can be anything you want,
//             interopService, // <= apollo will send to this if clientName is "interopService"
//             backendService, // <= otherwise will send to this
//           ), // <= otherwise will send to this
// });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    dynamicFetchPolicyLink,
    ApolloLink.split(
      (operation) => operation.getContext().clientName === 'interopService',
      interopService,
      backendService,
    ),
  ]),
});

export default client;
