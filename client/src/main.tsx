import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Container from "react-bootstrap/Container";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Container fluid>
        <App />
      </Container>
    </ApolloProvider>
  </React.StrictMode>
);
