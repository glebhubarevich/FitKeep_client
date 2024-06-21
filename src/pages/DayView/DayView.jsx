import {useEffect, useMemo} from 'react';
import {useParams, Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getTrainingsByDate} from '../../redux/reducers/trainingReducer';
import {parse, format} from 'date-fns';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import './DayView.scss';
import {CaretRight} from 'phosphor-react';

export default function DayView() {
	let {date} = useParams();
	date = useMemo(() => parse(date, 'dd-MM-yyyy', new Date()), [date]);

	const dispatch = useDispatch();
	const {trainings, loading, error} = useSelector((state) => state.trainings);

	useEffect(() => {
		dispatch(getTrainingsByDate(format(date, 'yyyy-MM-dd')));
	}, [dispatch, date]);

	if (loading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return <p>Error: {error}</p>;
	}
	console.log('trainings', trainings);

	return (
		<div className='page'>
			<h1>Trainings at {format(date, 'dd.MM.yyyy')}</h1>
			<div className='section-container'>
				{trainings.length === 0 ? (
					<p>No trainings found for this date.</p>
				) : (
					trainings.map((training) => (
						<Link
							to={`/trainings/${training._id}`}
							key={training._id}
							className='flex-row space-between p1 hover flex-center'
						>
							<div className='flex-column'>
								<h2>{training.description}</h2>
								<p>
									<strong>Date:</strong>{' '}
									{new Date(training.date).toLocaleDateString('de-DE')}
								</p>
							</div>
							<CaretRight size={24} />
						</Link>
					))
				)}
			</div>
		</div>
	);
}
