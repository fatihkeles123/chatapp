const { gql } = require('apollo-boost');

export const SIGN_UP = gql`
    mutation($username:String! $password:String!){
      createUser(
        userName: $username
        password: $password
      ){
        token
      }
    }
`;

export const LOGIN = gql`
	mutation($username:String! $password:String!){
	  loginUser(
		userName: $username
		password: $password
	  ){
		token
	  }
	}
`;

export const GET_ACTIVE_USER = gql`
	query{
		activeUser{
			userName
		}
	}
`;

export const MESSAGES = gql`
	query{
	  messages{
		id
		creatorId
		messageBody
		messageCreationDate
		messageUser{
		  userName
		}
	  }
	}
`;