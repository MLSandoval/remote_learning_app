import React from 'react';

export default class AddAdminQuestionForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            question: '',
            answerA : '',
            answerB: '',
            answerC : '',
            answerD: '',
        }
        this.handleQuestionInput = this.handleQuestionInput.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.storeQuestionData = this.storeQuestionData.bind(this);
        this.handleAnswerInput = this.handleAnswerInput.bind(this);
    }

    storeQuestionData(){
        
        if(this.state.question){
            let questionObj = {
            adminID: this.props.adminData[0],
            question: this.state.question,
            answers: [
                this.state.answerA,
                this.state.answerB,
                this.state.answerC,
                this.state.answerD
            ],
            correctAnswer: null
            };
        
            console.log('questionOBj: ', questionObj);
            questionObj.answers = questionObj.answers.join(',');

        

            fetch('http://localhost:3001/addAdminQuestion',{
                method: "POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(questionObj)
            })
            .then(res => res.json())
            .then(res=>{
                console.log('post admin question fetch success, res: ', res);
                let FrontEndQuestionObj = {
                    admin_id: questionObj.adminID,
                    answer_ids: [
                        res.firstAnswerID,
                        res.firstAnswerID + 1,
                        res.firstAnswerID + 2,
                        res.firstAnswerID + 3,
                     ],
                    answers: questionObj.answers.split(','),
                    label: questionObj.question,
                    value: res.questionID
                };
                this.props.callback(FrontEndQuestionObj);
            })
            .catch(error=>{
                console.error(error);
            });
        }  
    }

    handleQuestionInput(event){
        this.setState({ question: event.target.value});
    }

    handleAnswerInput(event){

        switch(event.target.id){
            case "A":
                this.setState({answerA: event.target.value});
                break;
            case "B":
                this.setState({answerB: event.target.value});
                 break;
            case "C":
                this.setState({answerC: event.target.value});
                break;
            case "D":
                 this.setState({answerD: event.target.value});
                break;
        }
    }

    handleReset(){
    this.setState({ questions : '',
                    answerA : '',
                    answerB : '',
                    answerC : '',
                    answerD : ''
                })
    }

    render() {
        if(this.props.view === 'add'){
            return(
                <div className="modal" tabIndex="-1" role="dialog" style={{'zIndex': 420}}>
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">New Question</h5>
                                <button type="button" onClick={this.props.toggle} className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <input type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Enter Question"
                                            onChange={this.handleQuestionInput}
                                            value={this.state.questions}
                                        />
                                    </div>
                                    <div>
                                        <label>A:
                                            <input id="A"
                                                className="form-control form-control-sm"
                                                type="text"
                                                name="name"
                                                onChange={this.handleAnswerInput}
                                                placeholder="Enter Answer"
                                                value={this.state.answerA}
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label>B:
                                            <input id="B"
                                                className="form-control form-control-sm"
                                                type="text"
                                                name="name"
                                                onChange={this.handleAnswerInput}
                                                placeholder="Enter Answer"
                                                value={this.state.answerB}
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label>C:
                                            <input id="C"
                                                className="form-control form-control-sm"
                                                type="text"
                                                name="name"
                                                onChange={this.handleAnswerInput}
                                                placeholder="Enter Answer"
                                                value={this.state.answerC}
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label>D:
                                            <input id="D"
                                                className="form-control form-control-sm"
                                                type="text"
                                                name="name"
                                                onChange={this.handleAnswerInput}
                                                placeholder="Enter Answer"
                                                value={this.state.answerD}
                                            />
                                        </label>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-success" data-dismiss="modal" value="Submit" onClick={this.storeQuestionData}>Add</button>
                                <button type="button" className="btn btn-danger" onClick= {this.handleReset} >Reset</button>
                                <button type="button" className="btn btn-primary">Send</button>
                            </div>
                        </div>
                    </div>
                </div>   
            );
        }else{
            return(
                <React.Fragment></React.Fragment>
            );
        }
    }
}
