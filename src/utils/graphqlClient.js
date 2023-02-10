import {
    ApolloClient, InMemoryCache, HttpLink,
} from '@apollo/client';

const link = new HttpLink({
  uri: "http://localhost:8080/v1/graphql/",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

export default client;
