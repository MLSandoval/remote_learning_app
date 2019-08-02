import React from 'react';
import Select from 'react-select';

export default class BroadcastModal extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }

  componentDidMount() {
    this.props.load();
  }

  appendQuestionDivs() {
    if (this.props.data) {
      var options = this.props.data.map(x =>
        x = { 'value': x.id, 'label': x.question }
      );
    }

      // var questionDivs = this.props.data.map(x =>
      //   <div className="border" key={x.id}>
      //     <div>{x.id}. {x.question}</div>
      //     <div className="answerDiv border hide">{x.answers[0]}</div>
      //     <div className="answerDiv border hide">{x.answers[1]}</div>
      //     <div className="answerDiv border hide">{x.answers[2]}</div>
      //     <div className="answerDiv border hide">{x.answers[3]}</div>
      //   </div>
      //   )

      return options;

  }

  render() {
    this.appendQuestionDivs();
    if(this.props.data) {
      var options = this.props.data.map(x =>
        x = { 'value': x.id, 'label': x.question }
      );
    }
    if (this.props.view === "broadcast"){
        return (
          <div className="modal dropdown" style={{
            'top': 50 + '%',
            'left': 10 + '%',}}>
            <Select style={{'width': 100 + '%'}} options={options} />
            </div>
        )
    } else {
      return (
        <div></div>
      )
    }
  }
}
