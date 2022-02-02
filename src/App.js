import { Provider } from 'react-redux';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import {configureStore} from './store';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import LoginPage from './pages/LoginPage/LoginPage';

const store = configureStore();
// TODO: implement some kind of authorized routes
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<LoginPage />} />
          <Route exact path='/dashboard' element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
