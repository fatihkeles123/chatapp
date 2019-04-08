import React, { Component, Fragment } from 'react';
import {ApolloProvider} from 'react-apollo';
import ApolloClient from "apollo-boost";
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import sessionWrapper from './components/hoc/SessionWrapper';
import SignUp from './containers/SignUp/SignUp.js';
import Login from './containers/Login/Login.js';
import MainPage from './containers/MainPage/MainPage.js';
import Menu from './components/UI/Menu';

import './App.css';

const client = new ApolloClient({
  uri: "http://localhost:4351/graphql",
  fetchOptions: {
	  credentials: 'include'
  },
  request: operation => {
	  operation.setContext({
		  headers: {
			  authorization: localStorage.getItem('token')
		  }
	  });
  }
});

const Header = ({ refetch, session }) => {
	console.log("Header : "+ refetch);
return	<BrowserRouter>
		<Fragment>
			<Menu session={session} />
			<Switch>
				<Route path="/" exact render={ () => <MainPage session={session} />} />
				<Route path="/login" render={ () => <Login refetch={refetch} />} />
				<Route path="/signup" render={ () => <SignUp refetch={refetch} />} />
			</Switch>
		</Fragment>
	</BrowserRouter>
};
const SessionWrapper = sessionWrapper(Header);
console.log(SessionWrapper);
class App extends Component {
  render() {
    return (
		<ApolloProvider client={client}>
			<div className="App">  
			<SessionWrapper />
		  </div>
		</ApolloProvider>
    );
  }
}

export default App;
