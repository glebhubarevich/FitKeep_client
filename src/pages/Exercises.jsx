import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getExercises, deleteExercise} from '../redux/reducers/exerciseReducer';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const ExerciseList = () => {
	const dispatch = useDispatch();
	const exercises = useSelector((state) => state.exercises.exercises);
	const loading = useSelector((state) => state.exercises.loading);

	useEffect(() => {
		dispatch(getExercises());
	}, [dispatch]);

	if (loading) {
		return <LoadingSpinner />;
	}
	return (
		<div className='page'>
			<h1>Exercises</h1>
			<ul>
				{exercises &&
					exercises.map((exercise) => (
						<li key={exercise._id}>
							{exercise.name} - {exercise.category}
							<button
								onClick={() => dispatch(deleteExercise(exercise._id))}
							>
								Delete
							</button>
						</li>
					))}
			</ul>
		</div>
	);
};

export default ExerciseList;
