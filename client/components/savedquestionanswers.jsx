import React from 'react';

export default class Answers extends React.Component {
  constructor(props){
    super(props);

  }

  render(){
    console.log('saved question answers props: ', this.props);
    if(this.props.data){
      const answers = this.props.data.answers.split(",");
      return (
        <table>
          <tbody>
            <tr>
              <td className="btn btn-outline-secondary lightButton" onClick={() => { this.props.handleStudentAnswerClicks('A'); }}>{answers[0]}</td>
              <td className="btn btn-outline-secondary lightButton" onClick={()=>{this.props.handleStudentAnswerClicks('B')}}>{answers[1]}</td>
            </tr>
            <tr>
              <td className="btn btn-outline-secondary lightButton" onClick={() => { this.props.handleStudentAnswerClicks('C') }}>{answers[2]}</td>
              <td className="btn btn-outline-secondary lightButton" onClick={() => { this.props.handleStudentAnswerClicks('D') }}>{answers[3]}</td>
            </tr>
          </tbody>
        </table>
    )
    } else {
      return (
        <React.Fragment/>
      )
    }
  }
}
