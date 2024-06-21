import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

const API_URL = import.meta.env.VITE_API_URL;

// Async thunks
export const getExercises = createAsyncThunk(
	'exercises/getExercises',
	async () => {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}
		const response = await axios
			.get(`${API_URL}/api/exercises`)
			.catch((err) => {
				console.log(err);
			});
		return response.data;
	}
);

export const getExercise = createAsyncThunk(
	'exercises/getExercise',
	async (id) => {
		const response = await axios
			.get(`${API_URL}/api/exercises/${id}`)
			.catch((err) => {
				console.log(err);
			});

		return response.data;
	}
);

export const addExercise = createAsyncThunk(
	'exercises/addExercise',
	async (exercise) => {
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};
		const response = await axios.post(
			`${API_URL}/api/exercises`,
			exercise,
			config
		);
		return response.data;
	}
);

export const updateExercise = createAsyncThunk(
	'exercises/updateExercise',
	async ({id, formData}) => {
		const response = await axios
			.patch(`${API_URL}/api/exercises/${id}`, formData)
			.catch((err) => {
				console.log(err);
			});
		return response.data;
	}
);

export const deleteExercise = createAsyncThunk(
	'exercises/deleteExercise',
	async (id) => {
		await axios.delete(`${API_URL}/api/exercises/${id}`).catch((err) => {
			console.log(err);
		});
		return id;
	}
);

const exerciseSlice = createSlice({
	name: 'exercises',
	initialState: {
		exercises: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getExercises.pending, (state) => {
				state.loading = true;
			})
			.addCase(getExercises.fulfilled, (state, action) => {
				state.exercises = action.payload;
				state.loading = false;
			})
			.addCase(getExercises.rejected, (state, action) => {
				state.error = action.error.message;
				state.loading = false;
			})
			.addCase(getExercise.pending, (state) => {
				state.loading = true;
			})
			.addCase(getExercise.fulfilled, (state, action) => {
				state.exercise = action.payload;
				state.loading = false;
			})
			.addCase(getExercise.rejected, (state, action) => {
				state.error = action.error.message;
				state.loading = false;
			})
			.addCase(addExercise.pending, (state) => {
				state.loading = true;
			})
			.addCase(addExercise.fulfilled, (state, action) => {
				state.exercises.push(action.payload);
				state.loading = false;
			})
			.addCase(addExercise.rejected, (state, action) => {
				state.error = action.error.message;
				state.loading = false;
			})
			.addCase(updateExercise.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateExercise.fulfilled, (state, action) => {
				const index = state.exercises.findIndex(
					(exercise) => exercise._id === action.payload._id
				);
				state.exercises[index] = action.payload;
				state.loading = false;
			})
			.addCase(updateExercise.rejected, (state, action) => {
				state.error = action.error.message;
				state.loading = false;
			})
			.addCase(deleteExercise.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteExercise.fulfilled, (state, action) => {
				state.exercises = state.exercises.filter(
					(exercise) => exercise._id !== action.payload
				);
				state.loading = false;
			})
			.addCase(deleteExercise.rejected, (state, action) => {
				state.error = action.error.message;
				state.loading = false;
			});
	},
});

export default exerciseSlice.reducer;
