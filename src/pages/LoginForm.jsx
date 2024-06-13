import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {login} from '../redux/reducers/authReducer';

const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const {isAuthenticated, loading, error} = useSelector((state) => state.auth);

	const handleSubmit = async (e) => {
		e.preventDefault();
		await dispatch(login({email, password}));
	};

	if (isAuthenticated) {
		return <Navigate to='/' />;
	}

	return (
		<div className='page'>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Email:</label>
					<input
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Password:</label>
					<input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type='submit' disabled={loading}>
					{loading ? 'Logging in...' : 'Login'}
				</button>
				{error && <p>{error}</p>}
			</form>
			<h4>Don't have an account?</h4>
			<a href='/register'>Register</a>
		</div>
	);
};

export default LoginForm;
