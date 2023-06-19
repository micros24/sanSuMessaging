import ApolloClientProvider from "./utils/ApolloClientProvider";
import Container from "react-bootstrap/Container";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloClientProvider>
      <Container fluid>
        <App />
      </Container>
    </ApolloClientProvider>
  </React.StrictMode>
);
