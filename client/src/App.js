import React, { Component, Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { WebSocketLink } from 'apollo-link-ws';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import sessionWrapper from './components/hoc/SessionWrapper';
import SignUp from './containers/SignUp/SignUp.js';
import Login from './containers/Login/Login.js';
import MainPage from './containers/MainPage/MainPage.js';
import Menu from './components/UI/Menu';

import './App.css';

const middlewareLink = new ApolloLink((operation, forward) => {
	operation.setContext({
		headers: {
			authorization: localStorage.getItem("token") || null
		}
	});
	return forward(operation);
});

const wsLink = new WebSocketLink(
	new SubscriptionClient("ws://localhost:4351/graphql", {
		reconnect: true,
	}),
);

const httpLink = middlewareLink.concat(
	createHttpLink({
		uri: "http://localhost:4351/graphql",
	})
);

const hasSubscriptionOperation = ({ query: { definitions } }) => {
	return definitions.some(({ kind, operation }) => kind === 'OperationDefinition' && operation === 'subscription');
};

const link = ApolloLink.split(
	hasSubscriptionOperation,
	wsLink,
	httpLink
);

const client = new ApolloClient({
	link,
	cache: new InMemoryCache(),
});
/*
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
*/
const Header = ({ refetch, session }) => {
	
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
