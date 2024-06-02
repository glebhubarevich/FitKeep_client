import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {getTrainings} from '../redux/reducers/trainingReducer';

const Trainings = () => {
	const dispatch = useDispatch();
	const {trainings, loading, error} = useSelector((state) => state.trainings);

	useEffect(() => {
		dispatch(getTrainings());
	}, [dispatch]);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error: {error}</p>;
	}

	return (
		<div>
			<h1>All Trainings</h1>
			<ul>
				{trainings.map((training) => (
					<li key={training._id}>
						<Link to={`/trainings/${training._id}`}>
							{training.description} -{' '}
							{new Date(training.date).toLocaleDateString()}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Trainings;
