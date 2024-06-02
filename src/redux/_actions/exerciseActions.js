import axios from 'axios';
import {
	GET_EXERCISES,
	ADD_EXERCISE,
	UPDATE_EXERCISE,
	DELETE_EXERCISE,
	EXERCISE_ERROR,
} from '../actionTypes';

const API_URL = import.meta.env.VITE_API_URL;

// Get exercises
export const getExercises = () => async (dispatch) => {
	try {
		const res = await axios.get(`${API_URL}/api/exercises`);
		dispatch({type: GET_EXERCISES, payload: res.data});
	} catch (err) {
		dispatch({type: EXERCISE_ERROR});
	}
};

// Add exercise
export const addExercise = (formData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	};

	try {
		const res = await axios.post(
			`${API_URL}/api/exercises`,
			formData,
			config
		);
		dispatch({type: ADD_EXERCISE, payload: res.data});
	} catch (err) {
		dispatch({type: EXERCISE_ERROR});
	}
};

// Update exercise
export const updateExercise = (id, formData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	};

	try {
		const res = await axios.patch(
			`${API_URL}/api/exercises/${id}`,
			formData,
			config
		);
		dispatch({type: UPDATE_EXERCISE, payload: res.data});
	} catch (err) {
		dispatch({type: EXERCISE_ERROR});
	}
};

// Delete exercise
export const deleteExercise = (id) => async (dispatch) => {
	try {
		await axios.delete(`${API_URL}/api/exercises/${id}`);
		dispatch({type: DELETE_EXERCISE, payload: id});
	} catch (err) {
		dispatch({type: EXERCISE_ERROR});
	}
};
