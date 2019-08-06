import React from 'react';

export default class LogIn extends React.Component {
  constructor() {
    super();
    this.state = {
      username: ''
    }
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.login = this.login.bind(this);
  }

  handleUsernameInput(event) {
    this.setState({username: event.target.value})
  }

  login() {
    this.props.loginFunction(this.state.username);
  }


  render() {
    if(this.props.loginState) {
      return (
      <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Log In</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.props.close}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <input 
                type="text"
                onChange={this.handleUsernameInput}
                value={this.state.username}
                ></input>
              </form>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary" onClick={this.login}>Log In</button>
            </div>
          </div>
        </div>
      </div>
    )
    } else {
        return (
          <div></div>
        )
    }
  }
}