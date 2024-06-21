import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {getExercises} from '../redux/reducers/exerciseReducer';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import ExerciseCard from '../components/ExerciseCard/ExerciseCard';
import SearchInput from '../components/SearchInput/SearchInput';
import {Plus} from 'phosphor-react';

const ExerciseList = () => {
	const dispatch = useDispatch();
	const {exercises, loading, error} = useSelector((state) => state.exercises);
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getExercises());
	}, [dispatch]);

	const [searchTerm, setSearchTerm] = useState('');
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
		return <LoadingSpinner />;
	}
	if (error) {
		return <p>Error: {error}</p>;
	}

	return (
		<div className='page'>
			<div className='flex-row space-between gap2'>
				<h1>Exercises</h1>
				<button
					className='button btn_primary'
					onClick={() => navigate('/exercises/new')}
				>
					<Plus size={16} weight='light' />
				</button>
			</div>
			<div className='section-container flex-column gap2'>
				<SearchInput
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder='Search exercises'
				/>
				<ul className='flex-column gap2'>
					{Object.keys(groupedExercises).map((category) => (
						<div key={category} className='flex-column gap1'>
							<h3>{category}</h3>
							<div className='exercise-list grid gap1'>
								{groupedExercises[category].map((exercise) => (
									<ExerciseCard
										key={exercise._id}
										exercise={exercise}
										onClick={() => {
											navigate(`/exercises/${exercise._id}`);
										}}
									/>
								))}
							</div>
						</div>
					))}
				</ul>
			</div>
		</div>
	);
};

export default ExerciseList;
