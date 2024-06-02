import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Trainings from './pages/Trainings';
import TrainingDetails from './pages/TrainingDetails';
import Exercises from './pages/Exercises';
import Sidebar from './components/sidebar/Sidebar';
import LoginForm from './pages/LoginForm';
import Profile from './pages/Profile';
import ProtectedRoute from './pages/ProtectedRoute';
import './App.scss';
import {useSelector} from 'react-redux';
import RegisterForm from './pages/RegisterForm';

function App() {
	const {isAuthenticated} = useSelector((state) => state.auth);
	return (
		<>
			<BrowserRouter>
				{isAuthenticated && <Sidebar />}
				<main>
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
							path='/exercises'
							element={
								<ProtectedRoute>
									<Exercises />
								</ProtectedRoute>
							}
						/>
						<Route path='/exercises/:id' element={<div>Exercise</div>} />
						<Route
							path='/profile'
							element={
								<ProtectedRoute>
									<Profile />
								</ProtectedRoute>
							}
						/>
						<Route path='/register' element={<RegisterForm />} />
						<Route path='*' element={<div>404 - Not Found</div>} />
					</Routes>
				</main>
			</BrowserRouter>
		</>
	);
}

export default App;
