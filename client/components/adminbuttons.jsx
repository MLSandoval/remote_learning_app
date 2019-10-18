import React from 'react';

export default class AdminButtons extends React.Component {
  constructor(props){
    super(props)
    this.addQuestion= this.addQuestion.bind(this);
  }

  render() {
    if(this.props.userType ==="admin") {
      return (
        <div className="front btn-group btn-group-vertical" style={{ 'bottom': 70 + 'vh', "height": 150 + 'px' }}>
          <button id="addButton" type="button" className="front btn btn-primary" onClick={this.toggleModal}>
              <i id="addButton" className="admin-button fa fa-plus"></i>
          </button>
          <button id="savedButton" type="button" className="front btn btn-primary" onClick={this.toggleModal}>
              <i id="savedButton" className="admin-button fa fa-list-ul"></i>
          </button>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }

  }
}
