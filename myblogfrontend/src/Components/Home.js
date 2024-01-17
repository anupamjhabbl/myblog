import {Link} from 'react-router-dom';

const Home = () => {
    return (
        <div class="container">
            <button class="btn" id="adminBtn"><Link to="/admin/login">Admin Login</Link></button>
            <button class="btn" id="registerBtn"><Link to="/user/register">Register User</Link></button>
            <button class="btn" id="loginBtn"><Link to="/user/login">Login User</Link></button>
        </div>
    )
}

export default Home;