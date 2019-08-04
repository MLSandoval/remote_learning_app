import React from "react";

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
        console.log("question obj in studentModal:::::::::::::: : ", this.props.questionList)
        if(this.toggleStudentModal){
            return(
                <React.Fragment>
                    <div className="modal" tabindex="-1">
                        <div className="modal-dialog modal-lg footer">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{this.props.questionTitle}</h5>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className={this.props.answer1}>A</div>
                                    <div className={this.props.answer2}>B</div>
                                    <div className={this.props.answer3}>C</div>
                                    <div className={this.props.answer4}>D</div>      
                                </div>                  
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