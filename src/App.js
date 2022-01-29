import { Provider } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import {configureStore} from './store';
import Example from './components/Example';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Example />
    </div>
    </Provider>
  );
}

export default App;
