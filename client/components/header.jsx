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
    const theme = this.props.theme
    return(
      <div className="row col container-fluid p-0">
          <div className={theme === '?darkpopout' ? 'black col-10 remogy-header' : 'col-10 remogy-header'}></div>
          <div className={theme === '?darkpopout' ? "black col-2 btn-link" : "col-2 btn-link"} onClick={this.renderLogInModal}>Login</div>
        <LogIn loginState={this.state.login} 
                close={this.closeLogInModal} 
                loginFunction={this.props.loginFunction} 
                userSelect={this.props.switchUser}
                setStudentName={this.props.setStudentName}
                handleChannelNameInput={this.handleChannelNameInput}
                handleUsernameInput={this.handleUsernameInput}
                handleSelectUser={this.handleSelectUser}
                theme={theme}/>
      </div>
    )
  }
}
