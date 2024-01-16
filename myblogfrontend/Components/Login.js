const Login = () => {
    return (
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
    )
}

export default Login;