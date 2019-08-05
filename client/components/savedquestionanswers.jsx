import React from 'react';

export default class Answers extends React.Component {
  render(){
    if(this.props.data){
      console.log('saved questions props: ', this.props);
      return (
        <table>
          <tbody>
            <tr>
              <td className="answerDiv">{this.props.data.answerA[0]}</td>
              <td className="answerDiv">{this.props.data.answerB[0]}</td>
            </tr>
            <tr>
              <td className="answerDiv">{this.props.data.answerC[0]}</td>
              <td className="answerDiv">{this.props.data.answerD[0]}</td>
            </tr>
          </tbody>
        </table>
    )
    } else {
      return (
        <div></div>
      )
    }

  }
}
