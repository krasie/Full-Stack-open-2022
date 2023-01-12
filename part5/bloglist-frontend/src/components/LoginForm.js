import PropTypes from 'prop-types'

const loginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => (
  <div>
    <form onSubmit={handleLogin}>
      <div>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            id="password"
            vulue={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" id='login-btn'>Login</button>
      </div>
    </form>
  </div>
)

loginForm.propTypes ={
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default loginForm