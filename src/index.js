import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ApolloProvider } from '@apollo/client';
import client from './utils/graphqlClient';

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

