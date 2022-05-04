import './App.css';
import Home from './views/Home';

function App() {
  return (
    <div className="App">
      <header>
        <div className='content'>
          <i className="fab fa-github fa-inverse fa-2x"></i>
          <h1>GitHub User Search</h1>
        </div>
      </header>
      <div className='container'>
        <div className='call-to-action'>
          <p><i className="fas fa-search"></i>Search more than 90M users</p>
        </div>
        <Home />
      </div>
      <footer>
        <p><a href='https://github.com/rojaslabs' target='_blank'>github.com/rojaslabs</a></p>
      </footer>
    </div>
  );
}

export default App;
