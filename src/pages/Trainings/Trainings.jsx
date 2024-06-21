import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getTrainings} from '../../redux/reducers/trainingReducer';
import {Link} from 'react-router-dom';
import TrainingCard from '../../components/TrainingCard/TrainingCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import {Plus} from 'phosphor-react';
import './Trainings.scss';

const groupTrainingsByDate = (trainings) => {
	return trainings.reduce((groups, training) => {
		const date = new Date(training.date).toLocaleDateString('de-DE');
		if (!groups[date]) {
			groups[date] = [];
		}
		groups[date].push(training);
		return groups;
	}, {});
};

const Trainings = () => {
	const dispatch = useDispatch();
	const {trainings, loading, error} = useSelector((state) => state.trainings);

	useEffect(() => {
		dispatch(getTrainings());
	}, [dispatch]);

	const sortedTrainings = [...trainings].sort(
		(a, b) => new Date(b.date) - new Date(a.date)
	);

	const groupedTrainings = groupTrainingsByDate(sortedTrainings);

	if (loading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return <p>Error: {error}</p>;
	}

	return (
		<div className='page'>
			<div className='flex-row space-between'>
				<h1>All Trainings</h1>
				<Link to='./new' className='button btn_primary'>
					<Plus size={16} weight='light' />
				</Link>
			</div>
			<div className='training__container section-container flex-column gap3'>
				{Object.keys(groupedTrainings).map((date) => (
					<div key={date}>
						<h3 className='mb1'>{date}</h3>
						<div className='grid'>
							{groupedTrainings[date].map((training) => (
								<TrainingCard key={training._id} training={training} />
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Trainings;
