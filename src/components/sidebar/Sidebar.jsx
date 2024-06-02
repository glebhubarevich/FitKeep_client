import React from 'react';
import {useState} from 'react';
import './Sidebar.scss';
import {Link, NavLink, useLocation} from 'react-router-dom';
import {House, Barbell, Calendar, User} from 'phosphor-react';

import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../redux/reducers/authReducer';

export default function Sidebar() {
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();
	const dispatch = useDispatch();
	return (
		<aside id='sidebar'>
			<Link to='/'>
				<img src='/src/assets/logo.svg' alt='Logo' />
			</Link>
			<nav>
				<NavLink to='/'>
					<House size={32} weight='light' />
					Home
				</NavLink>
				<NavLink to='trainings'>
					<Calendar size={32} weight='light' />
					My Trainings
				</NavLink>
				<NavLink to='exercises'>
					<Barbell size={32} weight='light' />
					Exercises Library
				</NavLink>
				<NavLink to='profile'>
					<User size={32} weight='light' />
					My Account
				</NavLink>
				<button onClick={() => dispatch(logout())}>Logout</button>
			</nav>
		</aside>
	);
}
