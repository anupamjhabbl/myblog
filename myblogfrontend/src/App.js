// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div>
      <div className='login'>
          <h1>Login</h1>

          <form>
            <label for="username">Username</label>
            <input type='text' name='username' placeholder='Enter your username'></input><br></br>

            <label for="pass">Password</label>
            <input type='password' name='pass' placeholder='Enter your password'></input><br></br>

            <button type='submit'>Login</button>

            <p>Don't have an account SignUp</p>
            
          </form>
          
      </div>

      <div className='signup'>
          <h1>SignUp</h1>

          <form>
            <label for="email">Enter your email</label>
            <input type='email' name='email' placeholder='Enter your Email'></input><br></br>

            <label for="username">Username</label>
            <input type='text' name='username' placeholder='Enter your username'></input><br></br>

            <lable for="password">Password</lable>
            <input type='password' name="password" placeholder='Enter your password'></input><br></br>

            <button type='submit'>SignUp</button>

            <p>Have an account Login</p>
            
          </form>
          
      </div>


    </div>
    
  );
}

export default App;
