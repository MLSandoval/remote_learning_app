import React from 'react';
import Select from 'react-select';

export default class BroadcastModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: null
    }
  }

  // componentDidMount() {
  //   console.log('component mounted');
  //   this.appendQuestionDivs();
  // }

  appendQuestionDivs() {
    console.log('entered append method');
    console.log(this.props.data);
    if (this.props.data) {
      let questionsList = 
      this.setState();
    }
  }

  render() {
    if (this.props.view === "broadcast" && this.props.options.length !== 0){
        return (
          <div className="modal student" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Question</h5>
                  <button type="button" onClick={this.props.toggle} className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <Select style={{ 'width': 100 + '%' }} options={this.props.options} />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" onClick={this.handleReset} >Delete</button>
                  <button type="button" className="btn btn-warning">Broadcast</button>
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
