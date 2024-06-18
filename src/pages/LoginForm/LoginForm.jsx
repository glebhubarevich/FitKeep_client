import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, Navigate} from 'react-router-dom';
import {login} from '../../redux/reducers/authReducer';
import Logo from '../../assets/logo.svg';
import './LoginForm.scss';

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
		<div className='login-form page'>
			<img src={Logo} alt='FitKeep Logo' />
			<h1>Welcome to FitKeep!</h1>
			<h4>Please login to continue</h4>
			<div className='section-container'>
				<form
					onSubmit={handleSubmit}
					className='flex-column flex-center gap2 mb2'
				>
					<div className='login-form__input gap1'>
						<label>Email:</label>
						<input
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className='login-form__input gap1'>
						<label>Password:</label>
						<input
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<button type='submit' disabled={loading} className='btn_primary'>
						{loading ? 'Logging in...' : 'Login'}
					</button>
					{error && <p>{error}</p>}
				</form>
				<div className='flex-column flex-center gap1'>
					<h4>Don't have an account?</h4>
					<Link className='button btn_secondary' to='/register'>
						Register
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
