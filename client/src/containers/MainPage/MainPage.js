import React, {Component} from 'react';
import TimeAgo from 'react-timeago';
import { Query } from 'react-apollo';
import { MESSAGES } from '../../queries';

class MainPage extends Component {
	render() {
		return (
			<div>
				<h1>
					Chat App
				</h1>
				<Query query={MESSAGES}>
				{
					({data, loading, error}) => {
						
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
	}
}

export default MainPage;
