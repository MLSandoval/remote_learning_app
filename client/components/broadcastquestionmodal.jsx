import React from 'react';
import Select from 'react-select';
import Answers from './savedquestionanswers';

export default class BroadcastModal extends React.Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteSavedQuestion = this.handleDeleteSavedQuestion.bind(this);
  }


  handleDelete(){
    this.setState({});
  }


  handleDeleteSavedQuestion(){
    if (this.props.question) {
      console.log('the handleDelete if statement ran');
      this.props.deleteAdminQuestion(this.props.question.value);
      this.props.resetSelect();
    } 
  }



  render() {
    if (this.props.view === "saved" && this.props.options.length !== 0){
        return (
          <div className="modal" tabIndex="-1" role="dialog">
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
                    value={this.props.question}
                  />
                  <Answers
                    data={this.props.question}
                  />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" onClick={this.handleDeleteSavedQuestion} >Delete</button>
                  <button type="button" className="btn btn-primary" onClick={this.props.handleSendQuestion}>Send</button>
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
