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
const C3DC_BACKEND = env.REACT_APP_C3DC_BACKEND_API
  || `${(env.REACT_APP_C3DC_URL || 'https://clinicalcommons-integrated-dev.ccdi.cancer.gov').replace(/\/$/, '')}/v1/graphql/`;

const interopService = new HttpLink({
  uri: INTEROP_SERVICE,
});

const c3dcService = new HttpLink({
  uri: C3DC_BACKEND,
});

const backendService = new HttpLink({
  uri: BACKEND,
});

// Custom link to set fetchPolicy based on operation
const dynamicFetchPolicyLink = new ApolloLink((operation, forward) => {
  // Set fetchPolicy based on clientName in context
  const clientName = operation.getContext().clientName;
  if (clientName === 'interopService' || clientName === 'c3dcService') {
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

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    dynamicFetchPolicyLink,
    ApolloLink.split(
      (operation) => operation.getContext().clientName === 'interopService',
      interopService,
      ApolloLink.split(
        (operation) => operation.getContext().clientName === 'c3dcService',
        c3dcService,
        backendService,
      ),
    ),
  ]),
});

export default client;
