// import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import UserBlog from './Components/UserBlog';
import BlogAdd from './Components/BlogAdd'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from './Components/AdminPage';

function App() {
  return (
    <div>
      <Router>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/user/login" element={<Login whom="users"/>}/>
            <Route exact path="/admin/login" element={<Login whom="admin"/>}/>
            <Route exact path="/user/register" element={<Signup/>}/>
            <Route exact path="/user/getBlogs" element={<UserBlog/>}/>
            <Route exact path="/user/writeBlog" element={<BlogAdd/>}/>
            <Route exact path="/admin/adminPage" element={<AdminPage/>}/>
          </Routes>
      </Router>
    </div>

  );
}

export default App;
