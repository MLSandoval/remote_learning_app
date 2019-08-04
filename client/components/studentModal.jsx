import React from "react";

export default class StudentModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            broadcast: true 
        }   
}


render(){
    console.log("question obj in studentModal:::::::::::::: : ", this.props.questionList)
    return(
        <React.Fragment>
            <div className="modal" tabindex="-1">
                <div className="modal-dialog modal-lg footer">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">**Question Title**</h5>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="column answerA">A</div>
                            <div className="column answerB">B</div>
                            <div className="column answerC">C</div>
                            <div className="column answerD">D</div>      
                        </div>                  
                    </div>
                    </div>
                </div>
            </div>
        </React.Fragment>)
    }
}