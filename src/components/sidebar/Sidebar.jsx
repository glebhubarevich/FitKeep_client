import {Link, NavLink} from 'react-router-dom';
import {House, Barbell, Calendar, User} from 'phosphor-react';
import {loadUser} from '../../redux/reducers/authReducer';

import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../redux/reducers/authReducer';

import './Sidebar.scss';

export default function Sidebar() {
	const dispatch = useDispatch();
	const {user} = useSelector((state) => state.auth);
	return (
		<aside id='sidebar' className='flex-column space-between'>
			<div className='flex-column flex-center'>
				<Link to='/' className='mb2'>
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
					<Link to='trainings/new' className='button btn_primary mt2 ms2'>
						New Training
					</Link>
				</nav>
			</div>
			<div className='flex-column p2'>
				<div className='flex-row mb1 gap1 flex-ai-center'>
					<Link to='/profile'>
						<img
							className='rounded-circle'
							src={user.profileImage}
							alt='Profile'
							width={50}
							height={50}
						/>
					</Link>
					<Link to='/profile'>
						<div className='flex-column gap-half'>
							<p>
								<strong>Logged in as:</strong>
							</p>
							<p>{user.name}</p>
						</div>
					</Link>
				</div>
				<button
					className='button btn__logout'
					onClick={() => dispatch(logout())}
				>
					Logout
				</button>
			</div>
		</aside>
	);
}
