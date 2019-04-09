import React, {Fragment} from 'react';
import { NavLink } from 'react-router-dom';
import Logout from '../../containers/Login/Logout';
import './Menu.css';

const Menu = ({session}) => {
	
	const activeUser = session === undefined || session.activeUser===undefined;
 
	return (
		<div className="Menu">
			<NavLink to="/" exact>messages</NavLink>
			{
				!activeUser ? <LoggedIn session={session} /> : <LoggedOut />
			}
		</div>
	);
	
};

const LoggedIn = ({ session }) => (

	<Fragment>
		<NavLink to='/'>@{session.activeUser.userName}</NavLink>
		<Logout />
	</Fragment>

);

const LoggedOut = () => (

	<Fragment>
		<NavLink to='/login'>login</NavLink>
		<NavLink to='/signup'>signup</NavLink>
	</Fragment>

);

export default Menu;