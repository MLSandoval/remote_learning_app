import React from 'react';

export default class AddQuestionForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            questions: '',
            adminQuestions: [],
            answers : []
        }
        this.handleQuestionInput = this.handleQuestionInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleQuestionInput(event){
        this.setState({ questions: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        let x = this.setState({adminQuestions:this.state.questions})
        console.log("stored admin question ", x)
    }
    handleReset(){
    this.setState({ questions:'' })
    }

    render() {
        console.log("Question: ", this.state.questions);
            if(this.props.view){    
                return(
                    <div className="modal" tabIndex="-1" role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                <h5 className="modal-title">Question</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span> //ask for help on why you cant use props
                                </button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <input type="text" 
                                                   className="form-control" 
                                                   placeholder="Enter Question" 
                                                   onChange={this.handleQuestionInput}
                                                   value={this.state.questions}
                                                />
                                        </div>
                                        <label>A)<input type="text" name="name"/></label>
                                        <label>B)<input type="text" name="name"/></label>
                                        <label>C)<input type="text" name="name"/></label>
                                        <label>D)<input type="text" name="name"/></label>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary" data-dismiss="modal" value="Submit">Add</button>
                                    <button type="button" className="btn btn-secondary" onClick= {this.handleReset} >Cancel</button>
                                    <button type="button" className="btn btn-danger">BroadCast</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    )     
            }else{
                return(
                    <React.Fragment></React.Fragment>
                )
            }
    }
}