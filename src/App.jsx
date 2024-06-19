import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Home from './pages/Home';
import Trainings from './pages/Trainings/Trainings';
import TrainingDetails from './pages/TrainingDetails/TrainingDetails';
import Exercises from './pages/Exercises';
import ExerciseDetails from './pages/ExerciseDetails/ExerciseDetails';
import Sidebar from './components/sidebar/Sidebar';
import SidebarMobile from './components/SidebarMobile/SidebarMobile';
import LoginForm from './pages/LoginForm/LoginForm';
import Profile from './pages/Profile/Profile';
import ProtectedRoute from './pages/ProtectedRoute';
import RegisterForm from './pages/RegisterForm/RegisterForm';
import TrainingForm from './pages/TrainingForm/TrainingForm';
import EditTraining from './pages/EditTraining/EditTraining';
import {loadUser} from './redux/reducers/authReducer';
import './App.scss';
import DayView from './pages/DayView/DayView';
import NewExercise from './pages/NewExercise/NewExercise';

function App() {
	const dispatch = useDispatch();
	const {isAuthenticated, loading} = useSelector((state) => state.auth);

	useEffect(() => {
		isAuthenticated && dispatch(loadUser());
	}, [dispatch, isAuthenticated]);

	return (
		<BrowserRouter>
			{isAuthenticated && <Sidebar />}
			{isAuthenticated && <SidebarMobile />}
			<main>
				{!loading && (
					<Routes>
						<Route path='/login' element={<LoginForm />} />
						<Route
							path='/'
							element={
								<ProtectedRoute>
									<Home />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/trainings'
							element={
								<ProtectedRoute>
									<Trainings />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/trainings/:id'
							element={
								<ProtectedRoute>
									<TrainingDetails />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/trainings/day/:date'
							element={
								<ProtectedRoute>
									<DayView />
								</ProtectedRoute>
							}
						/>
						<Route path='/trainings/new' element={<TrainingForm />} />
						<Route
							path='/exercises'
							element={
								<ProtectedRoute>
									<Exercises />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/trainings/edit/:id'
							element={
								<ProtectedRoute>
									<EditTraining />
								</ProtectedRoute>
							}
						/>
						{/* Exercises */}
						<Route path='/exercises/:id' element={
							<ProtectedRoute>
								<ExerciseDetails />
							</ProtectedRoute>
						} />
						<Route
							path='/profile'
							element={
								<ProtectedRoute>
									<Profile />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/exercises/edit/:id'
							element={<div>Edit Exercise</div>}
						/>
						<Route path='/exercises/new' element={<NewExercise />} />
						<Route path='/register' element={<RegisterForm />} />
						<Route path='*' element={<div>404 - Not Found</div>} />
					</Routes>
				)}
			</main>
		</BrowserRouter>
	);
}

export default App;
