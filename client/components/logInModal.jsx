import React from 'react';

export default class LogIn extends React.Component {
  constructor() {
    super();
    this.state = {
      channelName: 'MixMstrMike',
      userName: '',
      userType: 'student'
    }
    this.handleChannelNameInput = this.handleChannelNameInput.bind(this);
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.login = this.login.bind(this);
    // this.handleSelectUser = this.handleSelectUser.bind(this);
  }

  componentDidUpdate() {
    console.log('login state: ',this.state);
  }

  handleChannelNameInput(event) {
    this.setState({channelName: event.target.value})
  }

  handleUsernameInput(event) {
    this.setState({userName: event.target.value})
  }

  // handleSelectUser(event) {
  //   this.setState({userType: event.target.defaultValue});
  // }

  login() {
    this.props.loginFunction(this.state.channelName, this.state.userType, this.state.userName);
    this.props.close();
  }


  render() {
    if(this.props.loginState) {
      return (
          <div className="modal" tabIndex="-1" role="dialog" style={{'zIndex':1600, 'backgroundColor': 'black'}}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Log In</h5>
                </div>
                <div className="modal-body container-fluid">
                  <div className="row topbotpadding">
                    <div className="col">
                      Enter channel name:
                    </div>
                    <div className="col">
                      <input type="text" onChange={this.handleChannelNameInput} value={this.state.channelName} required></input>
                    </div>
                  </div>
                  <div className="row topbotpadding">
                    <div className="col">
                      Enter username:
                    </div>
                    <div className="col">
                      <input type='text' onChange={this.handleUsernameInput} value={this.state.userName} required></input>
                    </div>
                  </div>
                  <div className="row topbotpadding">
                    <div className="col"></div>
                    <div className="col">
                      <button type="submit" defaultValue="Log In" className="btn btn-secondary" onClick={this.login}>Log In</button>
                    </div>
                  </div>                    
                </div>
                <div className="modal-footer">
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