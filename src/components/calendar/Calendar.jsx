import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Check, Flag} from 'phosphor-react';
import {useDispatch, useSelector} from 'react-redux';
import {getTrainings} from '../../redux/reducers/trainingReducer';
import {
	format,
	startOfWeek,
	endOfWeek,
	startOfMonth,
	endOfMonth,
	eachDayOfInterval,
	isSameMonth,
	isWithinInterval,
	addWeeks,
	subWeeks,
	addMonths,
	subMonths,
	isSameDay,
} from 'date-fns';
import './Calendar.scss';
import CalendarControls from '../calendarControls/CalendarControls';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const Calendar = () => {
	const {trainings, loading, error} = useSelector((state) => state.trainings);
	const [view, setView] = useState('week'); // 'month' or 'week'
	const [selectedDate, setSelectedDate] = useState(new Date()); // default to today
	const navigate = useNavigate();
	const categories = [
		'Cardio',
		'Biceps',
		'Triceps',
		'Back',
		'Abs',
		'Legs',
		'Shoulders',
	];
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTrainings());
	}, [dispatch]);

	const handleRowClick = (date) => {
		navigate(`/trainings/day/${format(date, 'dd-MM-yyyy')}`);
	};

	const getSummary = (trainings, category) => {
		let foundInCategory = false;
		trainings.forEach((training) => {
			training.exercises.forEach((exercise) => {
				if (exercise.category === category) {
					foundInCategory = true;
				}
			});
		});
		const isInFuture = new Date(trainings[0]?.date) > new Date();
		return foundInCategory ? (
			!isInFuture ? (
				<Check size={18} />
			) : (
				<Flag size={18} />
			)
		) : null;
	};

	const handleViewChange = (event) => {
		setView(event);
	};

	const handleWeekChange = (direction) => {
		setSelectedDate((prevDate) =>
			direction === 'next' ? addWeeks(prevDate, 1) : subWeeks(prevDate, 1)
		);
	};

	const handleMonthChange = (direction) => {
		setSelectedDate((prevDate) =>
			direction === 'next' ? addMonths(prevDate, 1) : subMonths(prevDate, 1)
		);
	};

	const jumpToToday = () => {
		setSelectedDate(new Date());
	};
	const filteredData = trainings
		? trainings.filter((entry) => {
				const entryDate = entry.date;
				if (view === 'month') {
					return isSameMonth(new Date(entryDate), selectedDate);
				} else {
					const start = startOfWeek(selectedDate, {weekStartsOn: 1});
					const end = endOfWeek(selectedDate, {weekStartsOn: 1});
					return isWithinInterval(new Date(entryDate), {start, end});
				}
		  })
		: [];

	const dates =
		view === 'month'
			? eachDayOfInterval({
					start: startOfMonth(selectedDate),
					end: endOfMonth(selectedDate),
			  })
			: eachDayOfInterval({
					start: startOfWeek(selectedDate, {weekStartsOn: 1}),
					end: endOfWeek(selectedDate, {weekStartsOn: 1}),
			  });

	const currentPeriod =
		view === 'month'
			? format(selectedDate, 'MMMM yyyy')
			: `${format(
					startOfWeek(selectedDate, {weekStartsOn: 1}),
					'dd MMM'
			  )} - ${format(
					endOfWeek(selectedDate, {weekStartsOn: 1}),
					'dd MMM yyyy'
			  )}`;

	if (loading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return <p>Error: {error}</p>;
	}

	return (
		<div>
			<CalendarControls
				view={view}
				handleViewChange={handleViewChange}
				handleWeekChange={handleWeekChange}
				handleMonthChange={handleMonthChange}
				jumpToToday={jumpToToday}
				currentPeriod={currentPeriod}
			/>
			<div className='calendar__container'>
				<div className='calendar shadow rounded'>
					<div className='header'>
						<div>Date</div>
						{categories.map((category) => (
							<div key={category}>{category}</div>
						))}
					</div>
					{dates.map((date) => {
						const dayTrainings = filteredData.filter((d) =>
							isSameDay(new Date(d.date), new Date(date))
						);
						const isToday =
							format(date, 'dd.MM.yyyy') ===
							format(new Date(), 'dd.MM.yyyy');
						return (
							<div
								key={date}
								className={`row ${isToday ? 'today' : ''}`}
								onClick={() => handleRowClick(date)}
							>
								<div className='date'>{format(date, 'dd.MM.yyyy')}</div>
								{categories.map((category) => (
									<div key={category} className='cell'>
										{dayTrainings.length > 0
											? getSummary(dayTrainings, category)
											: null}
									</div>
								))}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Calendar;
