import React, {Fragment} from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';

const Menu = ({session}) => {
	console.log("menu : ",session)
	return (
		<div className="Menu">
			<NavLink to="/" exact>messages</NavLink>
			{
				session.activeUser ? <LoggedIn session={session} /> : <LoggedOut session={session} />
			}
		</div>
	);
};

const LoggedIn = ({ session }) => (
	<Fragment>
		<NavLink to='/'>@{session.activeUser.userName}</NavLink>
	</Fragment>
);

const LoggedOut = () => (
	<Fragment>
		<NavLink to='/login'>login</NavLink>
		<NavLink to='/signup'>signup</NavLink>
	</Fragment>
);

export default Menu;