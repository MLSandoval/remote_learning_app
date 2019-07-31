import React from 'react';

export default class AdminButton extends React.Component {
  constructor(props){
    super(props)
    this.addQuestion= this.addQuestion.bind(this);
  }

  addQuestion() {

  }

  render() {
    if(this.props.function==="addBroadcastQuestion") {
      return (
        <div style={{
          'backgroundColor': '#4CAF50',
          'display': 'inline-block',
          'fontSize': 16 + 'px',
          'marginTop': 10 + 'vh'
        }} onClick={this.addQuestion}>click me
      </div>
      )
    }

  }
}
