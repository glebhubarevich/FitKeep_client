import './SearchInput.scss';

const SearchInput = ({value, onChange, placeholder}) => {
	return (
		<div className='search'>
			<input
				type='text'
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				className='search-input'
			/>
		</div>
	);
};

export default SearchInput;
