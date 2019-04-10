import React, {Component} from 'react';
import { Query } from 'react-apollo';
import { USERS } from '../../queries';
import ListItem from '../../components/UI/ListItems/ListItem';
import Spinner from '../../components/UI/Spinner/Spinner';
import TimeAgo from 'react-timeago';
import '../MainPage/MainPage.css';
import '../../components/UI/ListItems/ListItem.css';

class MainPage extends Component {
	
	state = {
		
	}
		
	
	render() {
			return (
				<div>
					<h1>
						Users
					</h1>
					
					<Query query={USERS}>
					{

						({data, loading, error}) => {
							
							if(loading) return <Spinner />;
							if(error) return <div>Error</div>;
							console.log(data);
							return(
								<ul 
									className="ListItems"
									ref={(el) => {
									  this.messageList = el;
									}}
								>
								{
									data.users.map(user => (
										
										 <li className="ListItem" key={user.id}>
											 <TimeAgo className="time-ago" date={user.creationDate} />
											<div className="message-box">
												 {user.userName}
											</div>
											
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
