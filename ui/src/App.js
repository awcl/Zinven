import './App.css';
import Header from './Components/Header';
import Home from './Components/Home';
import Login from './Components/Login';
import Onboard from '.Components/Onboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Context from './Components/Context';

const App = () => {
  return (
    <div className="App">
      <Context.Provider value={{}}>
        <Router>
          <Header />
          <div className="Content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Onboard" element={<Onboard />} />
              </Routes>
          </div>
        </Router>
      </Context.Provider>
    </div>
  );
}

export default App;
