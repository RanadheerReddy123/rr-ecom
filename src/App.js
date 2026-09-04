import logo from './logo.svg';
import './App.css';
import Products from './components/Products';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Products />
      </header>
    </div>
  );
}

export default App;
