import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {addTraining} from '../../redux/reducers/trainingReducer';
import {getExercises} from '../../redux/reducers/exerciseReducer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/DatePicker.scss';
import './TrainingForm.scss';
import ExerciseCard from '../ExerciseCard/ExerciseCard';
import SearchInput from '../SearchInput/SearchInput';

const TrainingForm = () => {
	const [description, setDescription] = useState('');
	const [date, setDate] = useState(new Date());
	const [selectedExercises, setSelectedExercises] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {exercises, loading, error} = useSelector((state) => state.exercises);

	useEffect(() => {
		dispatch(getExercises());
	}, [dispatch]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (selectedExercises.length === 0) {
			alert('Please select at least one exercise.');
			return;
		}
		const trainingData = {
			description,
			date,
			exercises: selectedExercises,
		};
		dispatch(addTraining(trainingData));
		navigate('/trainings');
	};

	const handleExerciseSelect = (exerciseId) => {
		setSelectedExercises((prevSelected) =>
			prevSelected.includes(exerciseId)
				? prevSelected.filter((id) => id !== exerciseId)
				: [...prevSelected, exerciseId]
		);
	};

	const filteredExercises = exercises.filter((exercise) =>
		exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const groupedExercises = filteredExercises.reduce((groups, exercise) => {
		const {category} = exercise;
		if (!groups[category]) {
			groups[category] = [];
		}
		groups[category].push(exercise);
		return groups;
	}, {});

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error: {error}</p>;
	}

	return (
		<div className='page flex-column gap2'>
			<h1>Add New Training</h1>
			<form
				onSubmit={handleSubmit}
				className='section-container flex-column gap2'
			>
				<div className='flex-column gap-half'>
					<label>Description:</label>
					<input
						type='text'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
				</div>
				<div className='flex-column gap-half'>
					<label>Date and Time:</label>
					<DatePicker
						selected={date}
						onChange={(date) => setDate(date)}
						showTimeSelect
						dateFormat='dd.MM.yyyy HH:mm'
						timeFormat='HH:mm'
						className='custom-date-picker-input'
					/>
				</div>

				<div className='exercise-cards flex-column gap2'>
					<h2>Exercises</h2>
					<SearchInput
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder='Search exercises'
					/>
					{Object.keys(groupedExercises).map((category) => (
						<div key={category} className='flex-column gap1'>
							<h3>{category}</h3>
							<div className='exercise-list flex-row gap1'>
								{groupedExercises[category].map((exercise) => (
									<ExerciseCard
										key={exercise._id}
										exercise={exercise}
										isSelected={selectedExercises.includes(
											exercise._id
										)}
										onSelect={handleExerciseSelect}
									/>
								))}
							</div>
						</div>
					))}
				</div>
				<button type='submit' className='btn btn_primary'>
					Add Training
				</button>
			</form>
		</div>
	);
};

export default TrainingForm;
