import {useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {addExercise} from '../../redux/reducers/exerciseReducer';
import './NewExercise.scss';

const NewExercise = () => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('');
	const [media, setMedia] = useState([]);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const fileInputRef = useRef(null);
	const {loading, error} = useSelector((state) => state.exercises);

	const categories = [
		'Cardio',
		'Biceps',
		'Triceps',
		'Back',
		'Abs',
		'Legs',
		'Shoulders',
	];

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!name || !category) {
			alert('Please fill out all fields.');
			return;
		}

		const formData = new FormData();
		formData.append('name', name);
		formData.append('description', description);
		formData.append('category', category);
		media.forEach((file) => {
			formData.append('media', file);
		});

		dispatch(addExercise(formData));
		navigate('/exercises');
	};

	const handleMediaChange = (e) => {
		const files = Array.from(e.target.files);
		setMedia(files);
	};

	const handleRemoveMedia = (index) => {
		setMedia((prevMedia) => prevMedia.filter((_, i) => i !== index));
	};
	const handleButtonClick = () => {
		fileInputRef.current.click();
	};

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error: {error}</p>;
	}

	return (
		<div className='page'>
			<h1>Create New Exercise</h1>
			<div className='section-container'>
				<form onSubmit={handleSubmit} className='flex-column gap1'>
					<div className='flex-row gap1 flex-ai-center'>
						<label>Name:</label>
						<input
							type='text'
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</div>
					<div className='flex-row gap1 flex-ai-center'>
						<label>Description:</label>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<div className='flex-row gap1 flex-ai-center'>
						<label>Category:</label>
						<select
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							required
						>
							<option value=''>Select a category</option>
							{categories.map((cat) => (
								<option key={cat} value={cat}>
									{cat}
								</option>
							))}
						</select>
					</div>
					<div className='flex-row gap1 flex-ai-center'>
						<label>Media:</label>
						<button
							type='button'
							onClick={handleButtonClick}
							className='btn btn-secondary'
						>
							{media.length > 0
								? `${media.length} items selected`
								: 'Choose Files'}
						</button>
						<input
							type='file'
							multiple
							onChange={handleMediaChange}
							ref={fileInputRef}
							style={{display: 'none'}}
							accept='image/*'
						/>
					</div>
					<div className='grid gap2'>
						{media.map((file, index) => (
							<div
								key={index}
								className='media-item'
								onClick={() => handleRemoveMedia(index)}
							>
								<img
									src={URL.createObjectURL(file)}
									alt={`preview-${index}`}
								/>
							</div>
						))}
					</div>
					<button type='submit' className='btn_primary'>
						Create Exercise
					</button>
				</form>
			</div>
		</div>
	);
};

export default NewExercise;
