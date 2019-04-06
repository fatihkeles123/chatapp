import React, { Component } from 'react';
import {ApolloProvider} from 'react-apollo';
import ApolloClient from "apollo-boost";
import SignUp from './containers/SignUp/SignUp.js';
import Login from './containers/Login/Login.js';
import './App.css';

const client = new ApolloClient({
  uri: "http://localhost:4351/graphql"
});

class App extends Component {
  render() {
    return (
    <ApolloProvider client={client}>
      <div className="App">
        <SignUp />
		<Login />
      </div>
    </ApolloProvider>
    );
  }
}

export default App;
