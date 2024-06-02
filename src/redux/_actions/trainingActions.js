import axios from 'axios';
import {
	GET_TRAININGS,
	ADD_TRAINING,
	UPDATE_TRAINING,
	DELETE_TRAINING,
	TRAINING_ERROR,
} from '../actionTypes';
const API_URL = import.meta.env.VITE_API_URL;
// Get trainings
export const getTrainings = () => async (dispatch) => {
	try {
		const res = await axios.get(`${API_URL}/api/trainings`);
		dispatch({type: GET_TRAININGS, payload: res.data});
	} catch (err) {
		dispatch({type: TRAINING_ERROR});
	}
};

// Add training
export const addTraining = (formData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.post(
			`${API_URL}/api/trainings`,
			formData,
			config
		);
		dispatch({type: ADD_TRAINING, payload: res.data});
	} catch (err) {
		dispatch({type: TRAINING_ERROR});
	}
};

// Update training
export const updateTraining = (id, formData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.patch(
			`${API_URL}/api/trainings/${id}`,
			formData,
			config
		);
		dispatch({type: UPDATE_TRAINING, payload: res.data});
	} catch (err) {
		dispatch({type: TRAINING_ERROR});
	}
};

// Delete training
export const deleteTraining = (id) => async (dispatch) => {
	try {
		await axios.delete(`${API_URL}/api/trainings/${id}`);
		dispatch({type: DELETE_TRAINING, payload: id});
	} catch (err) {
		dispatch({type: TRAINING_ERROR});
	}
};
