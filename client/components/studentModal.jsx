import React from "react";
import Answers from "./savedquestionanswers";

export default class StudentModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            broadcast: true
        }
    }

    toggleStudentModal(){
        if(this.state.broadcast){
            this.setState({broadcast:false})
        }else{
            this.setState({broadcast:true})
        }
    }


    render(){
        console.log('student modal props: ', this.props);
        if(this.toggleStudentModal){
            return(
                <React.Fragment>
                    <div className="modal" tabIndex="-1">
                        <div className="modal-dialog modal-lg footer">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{this.props.adminQuestion.label}</h5>
                            </div>
                            <div className="modal-body">
                                <Answers 
                                    data={this.props.adminQuestion}
                                    handleStudentAnswerClicks={this.props.handleStudentAnswerClicks}
                                />
                            </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        } else {
            <React.Fragment/>
        }

    }
}
