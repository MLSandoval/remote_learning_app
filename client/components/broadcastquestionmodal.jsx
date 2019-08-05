import React from 'react';
import Select from 'react-select';
import Answers from './savedquestionanswers';

export default class BroadcastModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: null
    }
    this.handleReset = this.handleReset.bind(this);
  }


  handleReset(){
    this.setState({options: null});
  }

  render() {
    console.log("Onchange on select", this.props.handleSelect);
    if (this.props.view === "saved" && this.props.options.length !== 0){
        return (
          <div className="modal student" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Saved Questions</h5>
                  <button type="button" onClick={this.props.toggle} className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <Select
                    style={{ 'width': 100 + '%' }}
                    options={this.props.options}
                    onChange={this.props.handleSelect}
                  />
                  <Answers
                    data={this.props.answers}
                  />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" onClick={this.handleReset} >Delete</button>
                  <button type="button" className="btn btn-primary">Send</button>
                </div>
              </div>
            </div>
          </div>
        )
    } else {
      return(
        <div></div>
      )
    }
  }
}