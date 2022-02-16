import { Provider } from 'react-redux';
// import 'rsuite/dist/rsuite.min.css';
import './App.css';
import {
  BrowserRouter,
  Link,
  Routes,
  Route
} from 'react-router-dom';
import {configureStore} from './store';
import LoginPage from './pages/LoginPage/LoginPage';
import NavHeader from './components/NavHeader/NavHeader';
import NavRoutes from './components/NavRoutes/NavRoutes';

const store = configureStore();

function App() {
  // TODO: Fix nested routing, possibly using a HoC.
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavHeader />
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='*' element={<NavRoutes />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
