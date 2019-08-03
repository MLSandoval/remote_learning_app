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
          <div className="modal student" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Question</h5>
                </div>
                <div className="modal-body">
                  <Select style={{ 'width': 100 + '%' }} options={options} />
                </div>
              </div>
            </div>
          </div>
        )
    } else {
      return (
        <React.Fragment/>
      )
    }
  }
}
