import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {getTraining} from '../../redux/reducers/trainingReducer';
import {getExercise} from '../../redux/reducers/exerciseReducer';
import {Link} from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ExerciseCard from '../../components/ExerciseCard/ExerciseCard';
import './TrainingDetails.scss';

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
		return <LoadingSpinner />;
	}

	if (error) {
		return <p>Error: {error}</p>;
	}

	if (!training) {
		return <p>No training found.</p>;
	}

	return (
		<div className='page'>
			<div className='flex-row space-between'>
				<h1>
					Training on {new Date(training.date).toLocaleDateString('de-DE')}
				</h1>
				<Link
					to={`/trainings/edit/${training._id}`}
					className='button btn_secondary'
				>
					Edit
				</Link>
			</div>
			<div className='section-container flex-column gap2'>
				<div className='flex-column gap1'>
					<p>
						<strong>Description:</strong> {training.description}
					</p>
					<p>
						<strong>Date:</strong>{' '}
						{new Date(training.date).toLocaleDateString('de-DE')}
					</p>
					<p>
						<strong>Time:</strong>{' '}
						{new Date(training.date).toLocaleTimeString('de-DE')}
					</p>
				</div>
				<div className='flex-column gap1'>
					<h3>Exercises</h3>
					<ul className='grid gap1'>
						{training.exercises.map((exercise) => {
							return (
								<ExerciseCard key={exercise._id} exercise={exercise} />
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default TrainingDetails;
