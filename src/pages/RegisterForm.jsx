import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {register} from '../redux/reducers/authReducer';

const RegisterForm = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		profileImage: '',
	});
	const dispatch = useDispatch();
	const {isAuthenticated, loading, error} = useSelector((state) => state.auth);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await dispatch(register(formData));
	};

	if (isAuthenticated) {
		return <Navigate to='/' />;
	}

	return (
		<form onSubmit={handleSubmit} autoComplete='new-password'>
			<div>
				<label>Name:</label>
				<input
					type='text'
					name='name'
					value={formData.name}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<label>Email:</label>
				<input
					type='email'
					name='email'
					value={formData.email}
					onChange={handleChange}
					required
					autoComplete='new-password'
				/>
			</div>
			<div>
				<label>Password:</label>
				<input
					type='password'
					name='password'
					value={formData.password}
					onChange={handleChange}
					required
					autoComplete='new-password'
				/>
			</div>
			<div>
				<label>Profile Image:</label>
				<input
					type='text'
					name='profileImage'
					value={formData.profileImage}
					onChange={handleChange}
				/>
			</div>
			<button type='submit' disabled={loading}>
				{loading ? 'Registering...' : 'Register'}
			</button>
			{error && <p>{error}</p>}
		</form>
	);
};

export default RegisterForm;
