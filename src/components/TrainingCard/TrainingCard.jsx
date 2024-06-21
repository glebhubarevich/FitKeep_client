import {Link} from 'react-router-dom';
import {CaretRight} from 'phosphor-react';
import './TrainingCard.scss';

const getSummary = (training) => {
	let foundCategories = new Set();
	training.exercises.forEach((exercise) => {
		foundCategories.add(exercise.category);
	});
	return Array.from(foundCategories).join(', ');
};

export default function TrainingCard({training}) {
	return (
		<div className='training-card rounded p2'>
			<Link to={`/trainings/${training._id}`}>
				<div className='training-card__content'>
					<h3>{training.description}</h3>
					<p>
						<strong>Categories: </strong>
						{getSummary(training)}
					</p>
					<p>
						<strong>Date: </strong>
						{new Date(training.date).toLocaleDateString('de-DE')}
					</p>
					<p>
						<strong>Time: </strong>
						{new Date(training.date).toLocaleTimeString('de-DE')}
					</p>
				</div>
				<CaretRight size={24} />
			</Link>
		</div>
	);
}
