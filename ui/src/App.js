import './App.css';
import Home from './Components/Home';
import Header from './Components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Context from './Components/Context';

function App() {
  return (
    <div className="App">
      <Context.Provider value={{}}>

      <Header/>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </Router>
    </Context.Provider>
    </div>
  );
}

export default App;
