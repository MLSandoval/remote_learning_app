import React from "react";

export default  class ExpandedQuestionModal extends React.Component { 
    constructor(props){
        super(props);
    }

    render(){
        console.log("ExpandedQuestionModal: ", this.props.questionTarget)
    
        if(this.props.questionTarget === null){
            return (<div></div>)
        }else{
            return (
                <div  className="modal" tabIndex="-1" role="dialog">
                <div  className="modal-dialog" role="document">
                  <div  className="modal-content">
                    <div  className="modal-header">
                      <h5  className="modal-title">{this.props.questionTarget.author}</h5>
                      <button type="button"  className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div  className="modal-body">
                        <p>{this.props.questionTarget.question}</p>
                    </div>
                    <div  className="modal-footer">
                      <button type="button"  className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>) 
        }
    }
}
