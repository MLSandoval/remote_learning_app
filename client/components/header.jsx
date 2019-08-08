import React from 'react';
import LogIn from './logInModal.jsx';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false
    }
    this.renderLogInModal = this.renderLogInModal.bind(this);
    this.closeLogInModal = this.closeLogInModal.bind(this);
  }

  renderLogInModal() {
    console.log(this);
    this.setState({login: true});
  }

  closeLogInModal() {
    this.setState({login: false});
  }


  render(){
    return(
      <div className="col-12 container-fluid">
        <div className="row fullheight">
          <div className="col-10 fullheight remogy-header">Remogy</div>
          <button className="col-2 fullheight btn-primary" onClick={this.renderLogInModal}>Log In</button>
        </div>
        <LogIn loginState={this.state.login} 
                close={this.closeLogInModal} 
                loginFunction={this.props.loginFunction} 
                userSelect={this.props.switchUser}
                setStudentName={this.props.setStudentName}
                handleChannelNameInput={this.handleChannelNameInput}
                handleUsernameInput={this.handleUsernameInput}
                handleSelectUser={this.handleSelectUser}/>
      </div>
    )
  }
}
