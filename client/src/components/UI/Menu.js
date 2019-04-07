import React from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
	return (
		<div className="Menu">
			<NavLink to="/" exact>messages</NavLink>
			<NavLink to='/login'>login</NavLink>
			<NavLink to='/signup'>signup</NavLink>
		</div>
	);
};

export default Menu;