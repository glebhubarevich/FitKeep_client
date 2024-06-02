import axios from 'axios';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	LOAD_USER,
	AUTH_ERROR,
} from '../actionTypes';

const API_URL = import.meta.env.VITE_API_URL;

// Load user
export const loadUser = () => async (dispatch) => {
	try {
		const res = await axios.get(`${API_URL}/api/users/me`);
		dispatch({type: LOAD_USER, payload: res.data});
	} catch (err) {
		dispatch({type: AUTH_ERROR});
	}
};

// Register user
export const register =
	({name, email, password, profileImage}) =>
	async (dispatch) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		profileImage =
			profileImage ||
			`https://avatar.iran.liara.run/username?username=${name.replace(
				/ /g,
				'+'
			)}`;
		const body = JSON.stringify({name, email, password, profileImage});

		try {
			const res = await axios.post(
				`${API_URL}/api/auth/register`,
				body,
				config
			);
			dispatch({type: REGISTER_SUCCESS, payload: res.data});
			dispatch(loadUser());
		} catch (err) {
			dispatch({type: REGISTER_FAIL});
		}
	};

// Login user
export const login = (email, password) => async (dispatch) => {
	console.log('API_URL: ', API_URL);
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify({email, password});

	try {
		const res = await axios.post(`${API_URL}/api/auth/login`, body, config);
		dispatch({type: LOGIN_SUCCESS, payload: res.data});
		dispatch(loadUser());
	} catch (err) {
		dispatch({type: LOGIN_FAIL});
	}
};

// Logout user
export const logout = () => (dispatch) => {
	dispatch({type: LOGOUT});
};
