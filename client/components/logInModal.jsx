import React from 'react';

export default class LogIn extends React.Component {
  constructor() {
    super();
    this.state = {
      channelName: '',
      userName: '',
      userType: 'admin'
    }
    this.handleChannelNameInput = this.handleChannelNameInput.bind(this);
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.login = this.login.bind(this);
    this.handleSelectUser = this.handleSelectUser.bind(this);
  }

  handleChannelNameInput(event) {
    this.setState({channelName: event.target.value})
  }

  handleUsernameInput(event) {
    this.setState({userName: event.target.value})
  }

  handleSelectUser(event) {
    this.setState({userType: event.target.value})
  }

  login() {
    this.props.loginFunction(this.state.channelName, this.state.userType, this.state.userName);
    this.props.close();
  }


  render() {
    if(this.props.loginState) {
      if(this.state.userType === 'admin'){
        return (
          <div className="modal" tabIndex="-1" role="dialog" style={{'zIndex':1600, 'backgroundColor': 'black'}}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Log In</h5>
                </div>
                <div className="modal-body">
                  <form>
                    <label>
                      Enter channel name:
                      <input type="text" onChange={this.handleChannelNameInput} value={this.state.channelName} required></input><br/>
                      Student
                      <input type="radio" name="userType" value="student" onChange={this.handleSelectUser} required></input><br/>
                      Admin
                      <input type="radio" name="userType" value="admin" onChange={this.handleSelectUser}></input><br/>  

                      <input type="submit" className="btn btn-primary" onClick={this.login}></input>
                    </label>
                  </form>
                </div>
                <div className="modal-footer">
                </div>
              </div>
            </div>
          </div>
        )
      } else {
        return (
          <div className="modal" tabIndex="-1" role="dialog" style={{'zIndex':1600, 'backgroundColor': 'black'}}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Log In</h5>
                </div>
                <div className="modal-body">
                  <form>
                    <label>
                      Enter channel name:
                      <input type="text" onChange={this.handleChannelNameInput} value={this.state.channelName} required></input><br/>
                      Enter username:
                      <input type='text' onChange={this.handleUsernameInput} value={this.state.userName} required></input><br/>
                      Student
                      <input type="radio" name="userType" value="student" onChange={this.handleSelectUser} required></input><br/>
                      Admin
                      <input type="radio" name="userType" value="admin" onChange={this.handleSelectUser}></input><br/>  

                      <input type="submit" className="btn btn-primary" onClick={this.login}></input>
                    </label>
                  </form>
                </div>
                <div className="modal-footer">
                </div>
              </div>
            </div>
          </div>
        )
      }
      

    } else {
        return (
          <div></div>
        )
    }
  }
}