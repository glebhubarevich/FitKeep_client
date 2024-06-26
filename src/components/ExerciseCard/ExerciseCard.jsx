// Komponente für die Darstellung eines einzelnen Übungskarten-Elements

import './ExerciseCard.scss';
import {useNavigate} from 'react-router-dom';

const ExerciseCard = ({exercise, isSelected, onSelect}) => {
	const navigate = useNavigate();
	const handleSelect = () => {
		if (onSelect) onSelect(exercise._id);
		else {
			console.log(exercise._id);
			navigate(`/exercises/${exercise._id}`);
		}
	};

	return (
		<div
			className={`exercise-card rounded flex-row flex-ai-center ${
				isSelected ? 'selected' : ''
			}`}
			onClick={handleSelect}
		>
			{exercise.media && exercise.media[0] && (
				<img src={`${exercise.media[0]}`} alt={exercise.name} />
			)}
			<div className='exercise-details p1 flex-column'>
				<h4>{exercise.name}</h4>
			</div>
		</div>
	);
};

export default ExerciseCard;
