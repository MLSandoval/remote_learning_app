import React from 'react';
import Select from 'react-select';
import Answers from './savedquestionanswers';
import socketIOClient from "socket.io-client";
import {HorizontalBar} from 'react-chartjs-2';


export default class BroadcastModal extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteSavedQuestion = this.handleDeleteSavedQuestion.bind(this);
    this.handleChildClick = this.handleChildClick.bind(this);
    // this.renderAnswerData = this.renderAnswerData.bind(this);
  }

  renderAnswerData(){
    console.log('answerData started', this.props.answerData);
    if(this.props.answerData.datasets[0].data.length){
        return (<div className=''>
          {/* <h2>Horizontal Bar Example</h2> */}
          <HorizontalBar data={this.props.answerData}/>
        </div>);
        } else {
          return null;
        }
  }

  handleDelete(){
    this.setState({});
  }

  handleDeleteSavedQuestion(){
    if (this.props.question) {
      this.props.deleteAdminQuestion(this.props.question.value);
      this.props.resetSelect();
    } 
  }

  handleChildClick(event){
    event.stopPropagation();
  }

  render() {
    console.log("modal is clicked: ", this.props.view, this.props.options.length);
    if (this.props.view === "saved" && this.props.options.length !== 0){
        return (
          <div className="modal" tabIndex="-1" role="dialog" onClick={this.props.toggle}>
            <div className="modal-dialog modal-lg" role="document" onClick={this.handleChildClick}>
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
                  {this.renderAnswerData()}
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
