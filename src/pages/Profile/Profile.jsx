import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {loadUser} from '../../redux/reducers/authReducer';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import './Profile.scss';

const Profile = () => {
	const dispatch = useDispatch();
	const {user, isAuthenticated, loading} = useSelector((state) => state.auth);

	useEffect(() => {
		if (!user) {
			dispatch(loadUser());
		}
	}, [dispatch, user]);

	if (!isAuthenticated && !loading) {
		return <Navigate to='/login' />;
	}

	return (
		<div className='page'>
			{loading ? (
				<LoadingSpinner />
			) : (
				<div className='profile'>
					<h1>My Account</h1>
					<div className='profile__container flex-column rounded shadow'>
						<div className='profile__image flex-column'>
							<img
								className='profile__image_img'
								src={user.profileImage}
								alt='Profile'
								width={100}
							/>
							<button>Edit Image</button>
						</div>
						<p>
							<strong>Name: </strong>
							{user.name}
						</p>
						<p>
							<strong>Email:</strong> {user.email}
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default Profile;
