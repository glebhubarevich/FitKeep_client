import './CalendarControls.scss';
import {ArrowLeft, ArrowRight} from 'phosphor-react';

const CalendarControls = ({
	view,
	handleViewChange,
	handleWeekChange,
	handleMonthChange,
	jumpToToday,
	currentPeriod,
}) => {
	return (
		<div className='controls'>
			<div className='controls__period-selector shadow'>
				<button
					className={`controls__period-selector_btn${
						view === 'month' ? ' active' : ''
					}`}
					onClick={() => handleViewChange('month')}
					value='month'
				>
					Month
				</button>
				<button
					className={`controls__period-selector_btn${
						view === 'week' ? ' active' : ''
					}`}
					onClick={() => handleViewChange('week')}
					value='week'
				>
					Week
				</button>
			</div>
			{view === 'week' && (
				<div className='time-controls'>
					<h4>{currentPeriod}</h4>
					<div className='time-controls_btns'>
						<button onClick={() => handleWeekChange('prev')}>
							<ArrowLeft size={12} weight='bold' />
						</button>
						<button onClick={() => handleWeekChange('next')}>
							<ArrowRight size={12} weight='bold' />
						</button>
					</div>
				</div>
			)}
			{view === 'month' && (
				<div className='time-controls'>
					<h4>{currentPeriod}</h4>
					<div className='time-controls_btns'>
						<button onClick={() => handleMonthChange('prev')}>
							<ArrowLeft size={12} weight='bold' />
						</button>
						<button onClick={() => handleMonthChange('next')}>
							<ArrowRight size={12} weight='bold' />
						</button>
					</div>
				</div>
			)}
			<button onClick={jumpToToday}>Today</button>
		</div>
	);
};

export default CalendarControls;
