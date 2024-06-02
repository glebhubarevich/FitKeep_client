import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {loadUser} from '../redux/reducers/authReducer';

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
		<div>
			{loading ? (
				<p>Loading...</p>
			) : (
				<div>
					<h1>Profile</h1>
					{user && (
						<div>
							<p>
								<strong>Name:</strong> {user.name}
							</p>
							<p>
								<strong>Email:</strong> {user.email}
							</p>
							<img src={user.profileImage} alt='Profile' />
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Profile;
