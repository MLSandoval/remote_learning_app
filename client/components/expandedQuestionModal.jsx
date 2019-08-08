import React from "react";

<<<<<<< HEAD
export default  class ExpandedQuestionModal extends React.Component {
    constructor(props){
        super(props);
        this.toggleView = this.toggleView.bind(this);
        this.handleDeleteStudentQuestion = this.handleDeleteStudentQuestion.bind(this);
        this.handleChildClick = this.handleChildClick.bind(this);
    }
=======
export default class ExpandedQuestionModal extends React.Component {
  constructor(props) {
    super(props);
    this.toggleView = this.toggleView.bind(this);
    this.handleDeleteStudentQuestion = this.handleDeleteStudentQuestion.bind(this);
  }
>>>>>>> 5ed7185dafdedc0b3c5cc5b22cf722a9a0dbd18e

  toggleView() {
    this.props.resetSelectedQuestion();
  }
  handleDeleteStudentQuestion() {
    this.props.deleteStudentQuestion(this.props.questionTarget.id);
  }

    handleChildClick(event) {
    event.stopPropagation()
    };

<<<<<<< HEAD
    render(){
        console.log("ExpandedQuestionModal: ", this.props.questionTarget)


        return (
            <div  className="modal" tabIndex="-1" role="dialog" onClick={this.toggleView}>
            <div  className="modal-dialog" role="document" onClick={this.handleChildClick}>
                <div  className="modal-content">
                <div  className="modal-header">
                    <h5  className="modal-title">{this.props.questionTarget.author}</h5>
                    <button type="button"  className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" onClick={this.toggleView}>&times;</span>
                    </button>
                </div>
                <div  className="modal-body">
                    <p>{this.props.questionTarget.question}</p>
                </div>
                <div  className="modal-footer">
                    {/* <button type="button"  className="btn btn-secondary" data-dismiss="modal" onClick={this.toggleView}>Close</button> */}
                    <button type="button"  className="btn btn-danger" data-dismiss="modal" onClick={this.handleDeleteStudentQuestion}>Delete</button>
                </div>
                </div>
            </div>
            </div>)

    }
=======
  render() {
    console.log("ExpandedQuestionModal: ", this.props.questionTarget)


    return (
      <div className="modal" tabIndex="-1" role="dialog" onClick={this.toggleView}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{this.props.questionTarget.author}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" onClick={this.toggleView}>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{this.props.questionTarget.question}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.handleDeleteStudentQuestion}>Delete</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.toggleView}>Close</button>
            </div>
          </div>
        </div>
      </div>)

  }
>>>>>>> 5ed7185dafdedc0b3c5cc5b22cf722a9a0dbd18e
}
