import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useNavigate} from 'react-router-dom';
import {
	getTraining,
	updateTraining,
} from '../../redux/reducers/trainingReducer';
import {getExercises} from '../../redux/reducers/exerciseReducer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/DatePicker.scss';
import '../TrainingForm/TrainingForm.scss';
import ExerciseCard from '../../components/ExerciseCard/ExerciseCard';
import SearchInput from '../../components/SearchInput/SearchInput';

const EditTraining = () => {
	const {id} = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		training,
		loading: trainingLoading,
		error: trainingError,
	} = useSelector((state) => state.trainings);
	const {
		exercises,
		loading: exercisesLoading,
		error: exercisesError,
	} = useSelector((state) => state.exercises);

	const [description, setDescription] = useState('');
	const [date, setDate] = useState(new Date());
	const [selectedExercises, setSelectedExercises] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		dispatch(getTraining(id));
		dispatch(getExercises());
	}, [dispatch, id]);

	useEffect(() => {
		if (training) {
			setDescription(training.description);
			setDate(new Date(training.date));
			setSelectedExercises(training.exercises.map((ex) => ex._id));
		}
	}, [training]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (selectedExercises.length === 0) {
			alert('Please select at least one exercise.');
			return;
		}
		const updatedTraining = {
			id,
			description,
			date,
			exercises: selectedExercises,
		};
		dispatch(updateTraining(updatedTraining));
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

	if (trainingLoading || exercisesLoading) {
		return <p>Loading...</p>;
	}

	if (trainingError || exercisesError) {
		return <p>Error: {trainingError || exercisesError}</p>;
	}

	return (
		<div className='training-form-container'>
			<h1>Edit Training</h1>
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label>Description:</label>
					<input
						type='text'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
				</div>
				<div className='form-group'>
					<label>Date and Time:</label>
					<DatePicker
						selected={date}
						onChange={(date) => setDate(date)}
						showTimeSelect
						dateFormat='Pp'
						className='custom-date-picker-input'
					/>
				</div>
				<div className='form-group'>
					<label>Search Exercises:</label>
					<SearchInput
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder='Search exercises'
					/>
				</div>
				<div className='exercise-cards'>
					{Object.keys(groupedExercises).map((category) => (
						<div key={category} className='exercise-category'>
							<h3>{category}</h3>
							<div className='exercise-list'>
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
				<button type='submit' className='btn btn-primary'>
					Update Training
				</button>
			</form>
		</div>
	);
};

export default EditTraining;
