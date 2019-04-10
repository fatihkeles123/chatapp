import React from 'react';
import TimeAgo from 'react-timeago';
import './ListItem.css';

const ListItem = (props) => (
	<li className="ListItem" key={props.id}>
		<div className="nickname">
			@{props.userName}
		</div>
		{props.pending ? <div className="pending">pending...</div> : <TimeAgo className="time-ago" date={props.date} />}
		<div className="message-box">
			{props.messageBody}
		</div>
		
	</li>
); 

export default ListItem;