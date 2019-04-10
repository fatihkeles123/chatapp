import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Query, Mutation } from 'react-apollo';
import { MESSAGES, CREATE_MESSAGE, MESSAGE_CATCHED } from '../../queries';
import ListItem from '../../components/UI/ListItems/ListItem';
import Spinner from '../../components/UI/Spinner/Spinner';
import TimeAgo from 'react-timeago';
import './MainPage.css';
import '../../components/UI/ListItems/ListItem.css';

class MainPage extends Component {
	
	state = {
		messageBody: '',
		creatorId: ''
	}
	
	
	scrollToBottom = () => {
		if(this.messageList){
			const scrollHeight = this.messageList.scrollHeight;
			const height = this.messageList.clientHeight;
			const maxScrollTop = scrollHeight - height;
			this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
		}
	}
	
	onChange = event => {
		this.setState({
			messageBody: event.target.value
		});
	};
	
	onSubmit = (event, createMessage) => {
		
			event.preventDefault();
		
		if(this.state.messageBody){			
			createMessage().then(({ data }) => {
				console.log(data);
			});
		}
		
		this.setState({messageBody: ''});
	}
	
	onCacheUpdate = (cache, { data: { createMessage } }) => {
		const data = cache.readQuery({
			query: MESSAGES
		});
		

		if(data.messages[data.messages.length-1].id===data.messages[data.messages.length-2].id){
			data.messages.pop();
		}

		const newArray = data.messages.concat(createMessage);				
		cache.writeQuery({
			query: MESSAGES,
			data: {
				messages: newArray
			}
		});

	}
	
	
	componentDidMount(){
		
		const session = this.props.session;
		if(session && session.activeUser){
			this.setState({
				creatorId: this.props.session.activeUser.id
			});
		}
		
	}
	
	componentDidUpdate(){
		
		this.scrollToBottom();
	
	}
	
	
	render() {
		const session = this.props.session;
		if(session && session.activeUser){
			return (
				<div>
					<h1>
						Chat App
					</h1>
					
					<Query query={MESSAGES}>
					{

						({data, subscribeToMore, loading, error}) => {
							
							if(loading) return <Spinner />;
							if(error) return <div>Error</div>;
							
							subscribeToMore({
								document: MESSAGE_CATCHED,
								updateQuery: (prev, { subscriptionData }) => {
									
									if(!subscriptionData.data){
										return prev;
									}
									
									const newData = subscriptionData.data.messageCatched;
									let previousMessages = prev.messages;
									
									if(!previousMessages.find(message => message.id === newData.id)){
										
										return{
											messages: [...previousMessages, newData]
										}
										
									}else{
										
										return prev;
										
									}
									
								}
							});
							
							if(data && data.messages){
								if(data.messages[data.messages.length-1].id===data.messages[data.messages.length-2].id){
									data.messages.pop();
								}
							}
							
							return(
								<ul 
									className="ListItems"
									ref={(el) => {
									  this.messageList = el;
									}}
								>
								{
									data.messages.map(message => (
										<ListItem
											key={message.id}
											id={message.id}
											messageBody={message.messageBody}
											userName={message.messageUser.userName}
											date={message.messageCreationDate}
											pending={(message.id<0 ? true : false)}
										/>
										// <li className="ListItem" key={message.id}>
											// <div className="nickname">
												// @{message.messageUser.userName}
											// </div>
											// {message.id<0 ? <div className="pending">pending...</div> : <TimeAgo className="time-ago" date={message.messageCreationDate} />}
											// <div className="message-box">
												// {message.messageBody}
											// </div>
											
										// </li>
									))
								}
								</ul>
							);
						}
					}
					</Query>
					<div>
					<Mutation 
						mutation={CREATE_MESSAGE} 
						variables={ {...this.state} }
						update={ this.onCacheUpdate }
						optimisticResponse={{
							__typename: "Mutation",
							createMessage: {
								id: String(Math.round(Math.random()*-2000000)),
								messageBody: this.state.messageBody,
								messageCreationDate: String(new Date()),
								creatorId: this.state.creatorId,
								messageUser: {
									id: this.state.creatorId,
									userName:session.activeUser.userName,
									__typename: "User"
								},
								__typename: "Message"
							}
						}}
					>
						{
							(createMessage, { loading, error }) => {
								
								return(
									<form
										ref="form"
										onSubmit={event => this.onSubmit(event, createMessage)}
									>
									<input 
										className="messageInput"
										type="text"
										name="messageBody"
										value={this.state.messageBody}
										onChange={this.onChange}
										disabled={ !(session && session.activeUser) || loading }
										placeholder={(session && session.activeUser) ? "type your message, here!" : "please, click the above link to be logged in!"} 
									/>
								</form>
								
								);
								
							}	
						}
					</Mutation>
					</div>
				</div>
				
			);			
		}else{
			return (
				<div>Please, login....</div>
			);
		}

	}
}

export default MainPage;
