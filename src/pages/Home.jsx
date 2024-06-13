import Calendar from '../components/calendar/Calendar';
import {Link} from 'react-router-dom';
export default function Home() {
	return (
		<div className='page'>
			<div className='flex-row space-between'>
				<h1>Home</h1>
				<Link to='trainings/new' className='button btn_primary'>
					New Training
				</Link>
			</div>
			<Calendar />
		</div>
	);
}
