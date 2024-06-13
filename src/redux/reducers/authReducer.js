import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

const API_URL = import.meta.env.VITE_API_URL;

// Async thunks
export const loadUser = createAsyncThunk('auth/loadUser', async () => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	const response = await axios.get(`${API_URL}/api/users/me`);
	return response.data;
});

export const register = createAsyncThunk(
	'auth/register',
	async ({name, email, password, profileImage}) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		profileImage =
			profileImage ||
			`https://api.dicebear.com/8.x/initials/svg?backgroundType=gradientLinear&seed=${name.replace(
				/ /g,
				'+'
			)}`;
		const body = JSON.stringify({name, email, password, profileImage});
		const response = await axios.post(
			`${API_URL}/api/auth/register`,
			body,
			config
		);
		setAuthToken(response.data.token);
		localStorage.setItem('token', response.data.token);
		return response.data;
	}
);

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
			});
	},
});

export default authSlice.reducer;
