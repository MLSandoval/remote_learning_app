import React from 'react';
import LogIn from './logInModal.jsx';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true
    }
    this.renderLogInModal = this.renderLogInModal.bind(this);
    this.closeLogInModal = this.closeLogInModal.bind(this);
  }

  renderLogInModal() {
    this.setState({ login: true });
  }

  closeLogInModal() {
    this.setState({ login: false });
  }


  render() {
    const theme = this.props.theme
    return (
      <div className="row col container-fluid p-0">
        <div className={theme === '?darkpopout' ? 'black col-10 remogy-header textShadowWhite' : 'col-10 remogy-header textShadowBlack'}></div>
        <div className={theme === '?darkpopout' ? "black d-inline-flex textShadowWhite" : "d-inline-flex textShadowBlack"} style={{ 'width': '5px' }} onClick={this.props.switchUser}></div>
        <div className={theme === '?darkpopout' ? "black col darkStyleUser textShadowWhite" : "col  lightStyleUser textShadowBlack"}>{this.props.user}</div>
        <LogIn loginState={this.state.login}
          close={this.closeLogInModal}
          loginFunction={this.props.loginFunction}
          userSelect={this.props.switchUser}
          setStudentName={this.props.setStudentName}
          handleChannelNameInput={this.handleChannelNameInput}
          handleUsernameInput={this.handleUsernameInput}
          handleSelectUser={this.handleSelectUser}
          theme={theme} />
      </div>
    )
  }
}
