// import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/user/login" element={<Login whom="users"/>}/>
            <Route exact path="/admin/login" element={<Login whom="admin"/>}/>
            <Route exact path="/user/register" element={<Signup/>}/>
          </Routes>
      </Router>
    </div>

  );
}

export default App;
