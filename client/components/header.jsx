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
          <div className="col-10 fullheight">Telegogy</div>
          <div className="col-2 fullheight nopadding" onClick={this.renderLogInModal}>Log In</div>
        </div>
        <LogIn loginState={this.state.login} close={this.closeLogInModal} loginFunction={this.props.loginFunction}/>
      </div>
    )
  }
}
