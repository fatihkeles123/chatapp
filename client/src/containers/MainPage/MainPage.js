import React, {Component} from 'react';
import TimeAgo from 'react-timeago';
import { Query, Mutation } from 'react-apollo';
import { MESSAGES, CREATE_MESSAGE } from '../../queries';

class MainPage extends Component {
	
	state = {
		messageBody: '',
		creatorId: ''
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
		const { messages } = cache.readQuery({
			query: MESSAGES
		});
		
		cache.writeQuery({
			query: MESSAGES,
			data: {
				messages: messages.concat([createMessage])
			}
		});

	}
	
	componentWillMount(){
		const session = this.props.session;
		if(session && session.activeUser){
			this.setState({
				creatorId: this.props.session.activeUser.id
			});
		
		}
	}
	
	
	render() {
		const session = this.props.session;
		//console.log(session.activeUser);
		if(session && session.activeUser){
			return (
				<div>
					<h1>
						Chat App
					</h1>
					<div>
					<Mutation 
						mutation={CREATE_MESSAGE} 
						variables={ {...this.state} }
						optimisticResponse={{
							__typename: "Mutation",
							createMessage: {
								__typename: "Message",
								id: Math.round(Math.random()*-2000000),
								messageBody: "lay lay lay",
								messageCreationDate: new Date(),
								creatorId: this.state.creatorId
							}
						}}
						//update={ this.onCacheUpdate }
					>
						{
							(createMessage, { loading, error }) => (
								<form
									onSubmit={event => this.onSubmit(event, createMessage)}
								>
									<input 
										type="text"
										name="messageBody"
										value={this.state.messageBody}
										onChange={this.onChange}
										disabled={ !(session && session.activeUser) || loading }
										placeholder={ session && session.activeUser ? "type your message here" : "please, login to type your message"} 
									/>
								</form>
							)
						}
					</Mutation>
					
					
						
					</div>
					<Query query={MESSAGES}>
					{
						({data, loading, error}) => {
							console.log(data);
							if(loading) return <div>Loading</div>;
							if(error) return <div>Error</div>;
							return(
								<ul>
								{
									data.messages.map(message => (
										<li key={message.id}>
											<div>
												{message.messageBody}
											</div>
											<div>
												{message.messageUser.userName}
											</div>
											<TimeAgo date={message.messageCreationDate} />
										</li>
									))
								}
								</ul>
							);
						}
					}
					</Query>
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
