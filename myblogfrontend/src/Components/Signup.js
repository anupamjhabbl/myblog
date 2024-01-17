const Signup = () => {
  return (
    <div class="register-container">
      <form class="register-form" action="http://127.0.0.1:8000/users/register" method="POST">
        <h2>Create an Account</h2>
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" name="username" required/>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required/>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required/>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Signup;