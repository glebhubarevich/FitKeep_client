import {useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {House, Barbell, Calendar, User, List, X} from 'phosphor-react';
import {loadUser} from '../../redux/reducers/authReducer';

import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../redux/reducers/authReducer';

import './SidebarMobile.scss';

export default function Sidebar() {
	const dispatch = useDispatch();
	const {user} = useSelector((state) => state.auth);
	const [isHidden, setIsHidden] = useState(true);
	return (
		<>
			<button
				className='sidebar-toggle'
				onClick={() => setIsHidden(!isHidden)}
			>
				{isHidden ? (
					<List size={24} weight='light' />
				) : (
					<X size={24} weight='light' />
				)}
			</button>
			<aside
				id='sidebar-mobile'
				className={`flex-column space-between${isHidden ? ' hidden' : ''}`}
			>
				<div className={`flex-column flex-center`}>
					<Link
						to='/'
						className='mb2'
						onClick={() => setIsHidden(!isHidden)}
					>
						<img src='/src/assets/logo.svg' alt='Logo' />
					</Link>
					<nav>
						<NavLink to='/' onClick={() => setIsHidden(!isHidden)}>
							<House size={24} weight='light' />
							Home
						</NavLink>
						<NavLink
							to='trainings'
							onClick={() => setIsHidden(!isHidden)}
						>
							<Calendar size={24} weight='light' />
							My Trainings
						</NavLink>
						<NavLink
							to='exercises'
							onClick={() => setIsHidden(!isHidden)}
						>
							<Barbell size={24} weight='light' />
							Exercises Library
						</NavLink>
						<NavLink to='profile' onClick={() => setIsHidden(!isHidden)}>
							<User size={24} weight='light' />
							My Account
						</NavLink>
						<Link
							to='trainings/new'
							className='button btn_primary mt2 ms2'
						>
							New Training
						</Link>
					</nav>
				</div>
				<div className='flex-column p2'>
					<div className='flex-row mb1 gap1 flex-ai-center'>
						<img
							className='rounded-circle'
							src={user.profileImage}
							alt='Profile'
							width={50}
							height={50}
						/>
						<div className='flex-column gap-half'>
							<p>
								<strong>Logged in as:</strong>
							</p>
							<p>{user.name}</p>
						</div>
					</div>
					<button
						className='button btn__logout'
						onClick={() => dispatch(logout())}
					>
						Logout
					</button>
				</div>
			</aside>
		</>
	);
}
