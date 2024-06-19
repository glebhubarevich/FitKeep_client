import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, Link, useNavigate} from 'react-router-dom';
import {getExercise, deleteExercise} from '../../redux/reducers/exerciseReducer';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import './ExerciseDetails.scss';

const ExerciseDetails = () => {
	const {id} = useParams();
	const dispatch = useDispatch();
	const {exercise, loading, error} = useSelector((state) => state.exercises);
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getExercise(id));
	}, [dispatch, id]);

	if (loading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return <p>Error: {error}</p>;
	}

	if (!exercise) {
		return <p>No exercise found.</p>;
	}

	const handleDelete = () => {
		const confirmDelete = window.confirm('Are you sure you want to delete this exercise?');
		if (confirmDelete) {
			dispatch(deleteExercise(id));
			navigate('/exercises');
		}
	};

	return (
		<div className='page'>
			<div className='flex-row space-between'>
				<h1>{exercise.name}</h1>
				<div className='flex-row gap1'>
					<button onClick={handleDelete} className='button btn_danger'>
						Delete exercise
					</button>
					<Link to={`/exercises/edit/${exercise._id}`} className='button btn_secondary'>
						Edit
					</Link>
				</div>
			</div>
			<div className='section-container flex-column gap2'>
				<>
					<h4>Category:</h4>
					<p>{exercise.category}</p>
				</>
				{exercise.description && (
					<>
						<h4>Description:</h4>
						<p>{exercise.description}</p>
					</>
				)}
				<div className='exercise-media flex-column gap2'>
					<h4>Media:</h4>
					<div className='grid'>
						{exercise.media.map((file, index) => (
							<img
								src={`${file}`}
								alt={`Media ${index + 1}`}
								key={index}
								className='rounded shadow'
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ExerciseDetails;
