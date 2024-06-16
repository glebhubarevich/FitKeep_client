import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Async thunks
export const getTrainings = createAsyncThunk('trainings/getTrainings', async () => {
	const response = await axios.get(`${API_URL}/api/trainings`);
	console.log(response.data);
	return response.data;
});

export const getTraining = createAsyncThunk('trainings/getTraining', async (id) => {
	const response = await axios.get(`${API_URL}/api/trainings/${id}`);
	return response.data;
});

export const getTrainingsByDate = createAsyncThunk('trainings/getTrainingsByDate', async (date) => {
	const response = await axios.get(`${API_URL}/api/trainings/date/${date}`);
	return response.data;
});

export const addTraining = createAsyncThunk('trainings/addTraining', async (formData) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const response = await axios.post(`${API_URL}/api/trainings`, formData, config);
	return response.data;
});

export const updateTraining = createAsyncThunk(
	'trainings/updateTraining',
	async ({id, formData}) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const response = await axios.patch(`${API_URL}/api/trainings/${id}`, formData, config);
		return response.data;
	}
);

export const deleteTraining = createAsyncThunk('trainings/deleteTraining', async (id) => {
	await axios.delete(`${API_URL}/api/trainings/${id}`);
	return id;
});

const trainingSlice = createSlice({
	name: 'trainings',
	initialState: {
		trainings: [],
		training: null,
		loading: true,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getTrainings.pending, (state) => {
				state.loading = true;
			})
			.addCase(getTrainings.fulfilled, (state, action) => {
				state.trainings = action.payload;
				state.loading = false;
			})
			.addCase(getTrainings.rejected, (state, action) => {
				state.error = action.error.message;
				state.loading = false;
			})
			.addCase(getTraining.pending, (state) => {
				state.loading = true;
			})
			.addCase(getTraining.fulfilled, (state, action) => {
				state.training = action.payload;
				state.loading = false;
			})
			.addCase(getTraining.rejected, (state, action) => {
				state.error = action.error.message;
				state.loading = false;
			})
			.addCase(getTrainingsByDate.pending, (state) => {
				state.loading = true;
			})
			.addCase(getTrainingsByDate.fulfilled, (state, action) => {
				state.trainings = action.payload;
				state.loading = false;
			})
			.addCase(getTrainingsByDate.rejected, (state, action) => {
				state.error = action.error.message;
				state.loading = false;
			})
			.addCase(addTraining.pending, (state) => {
				state.loading = true;
			})
			.addCase(addTraining.fulfilled, (state, action) => {
				state.trainings.push(action.payload);
				state.loading = false;
			})
			.addCase(addTraining.rejected, (state, action) => {
				state.error = action.error.message;
				state.loading = false;
			})
			.addCase(updateTraining.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateTraining.fulfilled, (state, action) => {
				const index = state.trainings.findIndex(
					(training) => training._id === action.payload._id
				);
				state.trainings[index] = action.payload;
				state.loading = false;
			})
			.addCase(updateTraining.rejected, (state, action) => {
				state.error = action.error.message;
				state.loading = false;
			})
			.addCase(deleteTraining.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteTraining.fulfilled, (state, action) => {
				state.trainings = state.trainings.filter((training) => training._id !== action.payload);
				state.loading = false;
			})
			.addCase(deleteTraining.rejected, (state, action) => {
				state.error = action.error.message;
				state.loading = false;
			});
	},
});

export default trainingSlice.reducer;
