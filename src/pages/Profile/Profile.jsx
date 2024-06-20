import React, {useEffect, useRef, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Navigate, useNavigate} from 'react-router-dom';
import {
	loadUser,
	updateProfile,
	updatePassword,
	removeImage,
	deleteUser,
} from '../../redux/reducers/authReducer';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import './Profile.scss';

const Profile = () => {
	const dispatch = useDispatch();
	const {user, isAuthenticated, loading} = useSelector((state) => state.auth);
	const fileInputRef = useRef(null);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [profileImage, setProfileImage] = useState('');
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmNewPassword, setConfirmNewPassword] = useState('');

	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			setName(user.name);
			setEmail(user.email);
			setProfileImage(user.profileImage);
		} else {
			dispatch(loadUser());
		}
	}, [dispatch, user]);

	if (!isAuthenticated && !loading) {
		return <Navigate to='/login' />;
	}

	const handleEditImageClick = () => {
		fileInputRef.current.click();
	};

	const handleFileChange = async (e) => {
		const file = e.target.files[0];
		if (file) {
			const formData = new FormData();
			formData.append('profileImage', file);
			const result = await dispatch(updateProfile(formData));
			if (result.payload.profileImage) {
				setProfileImage(result.payload.profileImage);
			}
		}
	};

	const handleRemoveImage = async () => {
		await dispatch(removeImage());
	};

	const handleProfileUpdate = async () => {
		const formData = new FormData();
		formData.append('name', name);
		formData.append('email', email);
		if (fileInputRef.current.files[0]) {
			formData.append('profileImage', fileInputRef.current.files[0]);
		}
		const result = await dispatch(updateProfile(formData));
		if (result.payload.profileImage) {
			setProfileImage(result.payload.profileImage);
		}
		if (result.payload.name) {
			setName(result.payload.name);
		}
		if (result.payload.email) {
			setEmail(result.payload.email);
		}
	};

	const handlePasswordUpdate = async () => {
		if (newPassword !== confirmNewPassword) {
			alert('New passwords do not match!');
			return;
		}

		const passwordData = {
			oldPassword,
			newPassword,
		};

		const result = await dispatch(updatePassword(passwordData));
		if (result.error) {
			alert(result.error.message);
		} else {
			alert('Password updated successfully!');
			setOldPassword('');
			setNewPassword('');
			setConfirmNewPassword('');
		}
	};

	const handleDeleteUser = async () => {
		const confirmDelete = window.confirm(
			'Are you sure you want to delete your account? This action is irreversible!'
		);
		if (confirmDelete) {
			dispatch(deleteUser());
			alert('Account deleted successfully!');
			navigate('/login');
		}
	};

	return (
		<div className='page'>
			{loading ? (
				<LoadingSpinner />
			) : (
				<div className='profile page'>
					<h1>My Account</h1>
					<div className='section-container flex-column gap3'>
						<div className='profile__image flex-column'>
							<img
								className='profile__image_img'
								src={profileImage}
								alt='Profile'
								width={100}
							/>
							<div className='flex-row gap2'>
								<input
									type='file'
									ref={fileInputRef}
									style={{display: 'none'}}
									onChange={handleFileChange}
									accept='image/*'
								/>
								<button onClick={handleEditImageClick}>
									Edit Image
								</button>
								<input
									type='file'
									ref={fileInputRef}
									style={{display: 'none'}}
									onChange={handleFileChange}
									accept='image/*'
								/>
								<button
									onClick={handleRemoveImage}
									className='btn_danger'
								>
									Remove
								</button>
							</div>
						</div>
						<div className='profile__details flex-column gap1'>
							<h3>Profile Details</h3>
							<label className='flex-row gap1 flex-ai-center'>
								Name:
								<input
									type='text'
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</label>
							<label className='flex-row gap1 flex-ai-center'>
								Email:
								<input
									type='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</label>
							<button onClick={handleProfileUpdate}>
								Update Profile
							</button>
						</div>
						<div className='profile__password flex-column gap1'>
							<h3>Change Password</h3>
							<label className='flex-row gap1 flex-ai-center'>
								Old Password:
								<input
									type='password'
									value={oldPassword}
									onChange={(e) => setOldPassword(e.target.value)}
								/>
							</label>
							<label className='flex-row gap1 flex-ai-center'>
								New Password:
								<input
									type='password'
									value={newPassword}
									onChange={(e) => setNewPassword(e.target.value)}
								/>
							</label>
							<label className='flex-row gap1 flex-ai-center'>
								Confirm New Password:
								<input
									type='password'
									value={confirmNewPassword}
									onChange={(e) =>
										setConfirmNewPassword(e.target.value)
									}
								/>
							</label>
							<button onClick={handlePasswordUpdate}>
								Update Password
							</button>
						</div>
						<div className='flex-column gap2 danger-zone'>
							<div className='flex-column gap1'>
								<p>Danger zone!</p>
								<h3>Delete Account</h3>
								<p>
									Once you delete your account,{' '}
									<strong>there is no going back.</strong>
								</p>
							</div>
							<button className='btn_danger' onClick={handleDeleteUser}>
								Delete Account
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Profile;
