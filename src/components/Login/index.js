import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    userId: '',
    pin: '',
    ErrorMessage: false,
  }

  onChangeUsername = event => {
    this.setState({userId: event.target.value})
  }

  onChangePassword = event => {
    this.setState({pin: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({ErrorMessage: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {userId, pin} = this.state
    const userDetails = {userId, pin}

    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {pin} = this.state

    return (
      <>
        <label className="input-label" htmlFor="password">
          PIN
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={pin}
          onChange={this.onChangePassword}
          placeholder="Enter PIN"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {userId} = this.state

    return (
      <>
        <label className="input-label" htmlFor="username">
          User ID
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={userId}
          onChange={this.onChangeUsername}
          placeholder="Enter User ID"
        />
      </>
    )
  }

  render() {
    const {ErrorMessage, errorMsg} = this.state
    return (
      <div className="main-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="website-logo"
          />
        </div>
        <div className="login-container">
          <h1 className="welcome-heading">Welcome Back!</h1>
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <div className="input-container">{this.renderUsernameField()}</div>
            <div className="password-container">
              {this.renderPasswordField()}
            </div>
            <button className="login-button" type="submit">
              Login
            </button>
            {ErrorMessage && <p className="error-message">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
