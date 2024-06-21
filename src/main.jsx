import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './styles/global.scss';
import './styles/typography.scss';
import './styles/colors.scss';
import './styles/alignments.scss';

//Provider und Store für Redux
import {Provider} from 'react-redux';
import store from './redux/state/store.js';
import {loadUser} from './redux/reducers/authReducer.js';

//Laden der Benutzerdaten, wenn ein Token im Local Storage vorhanden ist
if (localStorage.token) {
	store.dispatch(loadUser());
}

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
