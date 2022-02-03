import { Provider } from 'react-redux';
import './App.css';
import {
  BrowserRouter,
  Link,
  Routes,
  Route
} from 'react-router-dom';
import {configureStore} from './store';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RestaurantLocationListPage from './pages/RestaurantLocation/RestaurantLocationListPage';
import RestaurantlocationEditPage from './pages/RestaurantLocation/RestaurantLocationEditPage';

const store = configureStore();
// TODO: implement some kind of authorized routes
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Link to='/restaurant-locations'>Restaurants</Link>
        </div>
        <Routes>
          <Route exact path='/' element={<LoginPage />} />
          <Route exact path='/dashboard' element={<DashboardPage />} />
          <Route path='/restaurant-locations' element={<RestaurantLocationListPage />} />
          <Route path='/restaurant-locations/:id' element={<RestaurantlocationEditPage />} />
          <Route path='/restaurant-locations/new' element={<RestaurantlocationEditPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
