import React from 'react';

export default class Answers extends React.Component {
  render(){
    console.log(this.props.data);
    if(this.props.data){
      const answers = this.props.data.answers.split(",");
      console.log('saved questions props: ', this.props);
      return (
        <table>
          <tbody>
            <tr>
              <td>{answers[0]}</td>
              <td>{answers[1]}</td>
            </tr>
            <tr>
              <td>{answers[2]}</td>
              <td>{answers[3]}</td>
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
