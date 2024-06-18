import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate, Link} from 'react-router-dom';
import {register} from '../../redux/reducers/authReducer';
import './RegisterForm.scss';
import Logo from '../../assets/logo.svg';

const RegisterForm = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [img, setImg] = useState([]);

	const dispatch = useDispatch();
	const {isAuthenticated, loading, error} = useSelector((state) => state.auth);

	const handleSubmit = async (e) => {
		console.log('formdata', name, email, password, img);
		e.preventDefault();
		const formData = new FormData();
		formData.append('name', name);
		formData.append('email', email);
		formData.append('password', password);
		formData.append('profileImage', img);
		await dispatch(register(formData));
	};

	if (isAuthenticated) {
		return <Navigate to='/' />;
	}

	return (
		<div className='register-form page'>
			<img src={Logo} alt='FitKeep Logo' />
			<h1>Welcome to FitKeep!</h1>
			<h4>Create an account and start tracking your trainings!</h4>
			<div className='section-container'>
				<form
					onSubmit={handleSubmit}
					autoComplete='new-password'
					className='flex-column flex-center gap2 mb2'
				>
					<div className='register-form__input gap1'>
						<label>*Name:</label>
						<input
							type='text'
							name='name'
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</div>
					<div className='register-form__input gap1'>
						<label>*Email:</label>
						<input
							type='email'
							name='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							autoComplete='new-password'
						/>
					</div>
					<div className='register-form__input gap1'>
						<label>*Password:</label>
						<input
							type='password'
							name='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							autoComplete='new-password'
						/>
					</div>
					<div className='register-form__input gap1'>
						<label>Profile Image:</label>
						<input
							type='file'
							name='profileImage'
							onChange={(e) => {
								setImg(e.target.files[0]);
							}}
							accept='image/*'
						/>
					</div>
					<p>* Required fields</p>
					<button type='submit' disabled={loading} className='btn_primary'>
						{loading ? 'Registering...' : 'Register'}
					</button>
					{error && <p>{error}</p>}
				</form>
				<div className='flex-column flex-center gap1'>
					<h4>Already have an account?</h4>
					<Link className='button btn_secondary' to='/login'>
						Login
					</Link>
				</div>
			</div>
		</div>
	);
};

export default RegisterForm;
