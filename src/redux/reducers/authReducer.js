import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

const API_URL = import.meta.env.VITE_API_URL;

export const loadUser = createAsyncThunk('auth/loadUser', async () => {
	if (localStorage.token) {
		console.log('localStorage.token', localStorage.token);
		setAuthToken(localStorage.token);
	}
	const response = await axios.get(`${API_URL}/api/users/me`);
	return response.data;
});

export const register = createAsyncThunk('auth/register', async (formData) => {
	const config = {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	};
	const response = await axios.post(
		`${API_URL}/api/auth/register`,
		formData,
		config
	);
	setAuthToken(response.data.token);
	localStorage.setItem('token', response.data.token);
	return response.data;
});

export const login = createAsyncThunk(
	'auth/login',
	async ({email, password}) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const body = JSON.stringify({email, password});
		const response = await axios.post(
			`${API_URL}/api/auth/login`,
			body,
			config
		);
		setAuthToken(response.data.token);
		localStorage.setItem('token', response.data.token);
		return response.data;
	}
);

export const updateProfile = createAsyncThunk(
	'auth/updateProfile',
	async (formData) => {
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};
		const response = await axios.patch(
			`${API_URL}/api/auth/me`,
			formData,
			config
		);
		return response.data;
	}
);

export const updatePassword = createAsyncThunk(
	'auth/updatePassword',
	async (passwordData) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const response = await axios.patch(
			`${API_URL}/api/auth/me/password`,
			passwordData,
			config
		);
		return response.data;
	}
);
export const removeImage = createAsyncThunk('auth/removeImage', async () => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const response = await axios.delete(
		`${API_URL}/api/auth/me/profileImage`,
		config
	);
	return response.data;
});
export const deleteUser = createAsyncThunk('auth/deleteAccount', async () => {
	await axios.delete(`${API_URL}/api/auth/me`);
	localStorage.removeItem('token');
	setAuthToken(null);
});

export const logout = createAsyncThunk('auth/logout', async () => {
	localStorage.removeItem('token');
	setAuthToken(null);
});

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		loading: false,
		user: null,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loadUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(loadUser.fulfilled, (state, action) => {
				state.isAuthenticated = true;
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(loadUser.rejected, (state, action) => {
				state.token = null;
				state.isAuthenticated = false;
				state.loading = false;
				state.user = null;
				state.error = action.error.message;
			})
			.addCase(register.pending, (state) => {
				state.loading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.token = action.payload.token;
				state.isAuthenticated = true;
				state.loading = false;
				state.user = action.payload.user;
			})
			.addCase(register.rejected, (state, action) => {
				state.token = null;
				state.isAuthenticated = false;
				state.loading = false;
				state.user = null;
				state.error = action.error.message;
			})
			.addCase(login.pending, (state) => {
				state.loading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.token = action.payload.token;
				state.isAuthenticated = true;
				state.loading = false;
				state.user = action.payload.user;
			})
			.addCase(login.rejected, (state, action) => {
				state.token = null;
				state.isAuthenticated = false;
				state.loading = false;
				state.user = null;
				state.error = action.error.message;
			})
			.addCase(logout.fulfilled, (state) => {
				state.token = null;
				state.isAuthenticated = false;
				state.loading = false;
				state.user = null;
			})
			.addCase(updateProfile.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateProfile.fulfilled, (state, action) => {
				state.loading = false;
				state.user = {...state.user, ...action.payload};
			})
			.addCase(updateProfile.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(updatePassword.pending, (state) => {
				state.loading = true;
			})
			.addCase(updatePassword.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(updatePassword.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(removeImage.pending, (state) => {
				state.loading = true;
			})
			.addCase(removeImage.fulfilled, (state, action) => {
				state.loading = false;
				state.user.profileImage = action.payload.profileImage;
			})
			.addCase(removeImage.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(deleteUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteUser.fulfilled, (state) => {
				state.token = null;
				state.isAuthenticated = false;
				state.loading = false;
				state.user = null;
			})
			.addCase(deleteUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default authSlice.reducer;
