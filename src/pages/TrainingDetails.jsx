import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {getTraining} from '../redux/reducers/trainingReducer';
import {getExercise} from '../redux/reducers/exerciseReducer';
import {Link} from 'react-router-dom';

const TrainingDetails = () => {
	const {id} = useParams();
	const dispatch = useDispatch();
	const {training, loading, error} = useSelector((state) => state.trainings);

	useEffect(() => {
		dispatch(getTraining(id));
	}, [dispatch, id]);
	useEffect(() => {
		if (training && training.exercises) {
			training.exercises.forEach((exerciseId) => {
				dispatch(getExercise(exerciseId));
			});
		}
	}, [dispatch, training]);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error: {error}</p>;
	}

	if (!training) {
		return <p>No training found.</p>;
	}

	return (
		<div>
			<h1>Training Details</h1>
			<p>
				<strong>Description:</strong> {training.description}
			</p>
			<p>
				<strong>Date:</strong>{' '}
				{new Date(training.date).toLocaleDateString('de-DE')}
			</p>
			<h2>Exercises</h2>
			<ul>
				{training.exercises.map((exercise) => {
					return (
						<li key={exercise._id}>
							<Link to={`/exercises/${exercise._id}`}>
								<h4>{exercise.name}</h4>
								<p>{exercise.category}</p>
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default TrainingDetails;
