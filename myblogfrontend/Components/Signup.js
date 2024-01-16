const Signup = () => {
    return (
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
    )
}

export default Signup;