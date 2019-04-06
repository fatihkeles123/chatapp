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