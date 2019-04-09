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
			id
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
		  id
		  userName
		}
	  }
	}
`;

export const MESSAGES_WITHOUT_USER = gql`
	query{
	  messages{
		id
		creatorId
		messageBody
		messageCreationDate
	  }
	}
`;


export const CREATE_MESSAGE = gql`
	mutation($creatorId:String! $messageBody:String!){
	  createMessage(
		creatorId: $creatorId
		messageBody: $messageBody
	  ){
		id
		messageBody
		messageUser{
		  id
		  userName
		}
	  }
	}
`;

export const MESSAGE_CATCHED = gql`
	subscription {
		messageCatched {
			id
			messageBody
			creatorId
			messageCreationDate
		}
	}
`;