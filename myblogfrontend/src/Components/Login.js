const Login = (props) => {
    return (
        <div class="login-container">
            <form class="login-form" method="POST" action={`http://127.0.0.1:8000/${props.whom}/login`}>
                <h2>Login</h2>
                <div class="input-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" required/>
                </div>
                <div class="input-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required/>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;