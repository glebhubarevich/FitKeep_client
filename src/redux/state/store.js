import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer';
import exerciseReducer from '../reducers/exerciseReducer';
import trainingReducer from '../reducers/trainingReducer';

const store = configureStore({
	reducer: {
		auth: authReducer,
		exercises: exerciseReducer,
		trainings: trainingReducer,
	},
});

export default store;
