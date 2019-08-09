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
            selectedAnswer: 'Set Answer',
            dropDownClass: ''
        }
        this.handleQuestionInput = this.handleQuestionInput.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.storeQuestionData = this.storeQuestionData.bind(this);
        this.handleAnswerInput = this.handleAnswerInput.bind(this);
        this.handleSelectedAnswer =this.handleSelectedAnswer.bind(this);
        this.handleChildClick = this.handleChildClick.bind(this);
        this.indicateKey = this.indicateKey.bind(this);
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
            correctAnswer: this.state.selectedAnswer
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
        this.handleReset();
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
    this.setState({ question : '',
                    answerA : '',
                    answerB : '',
                    answerC : '',
                    answerD : '',
                    selectedAnswer : ''
                })
    }


    handleSelectedAnswer(event){
        event.preventDefault()
        let targetAnswer = event.target.id;
        this.setState({selectedAnswer:targetAnswer});
        this.toggleDropDown();
    }

    handleChildClick(event){
        event.stopPropagation();
      }

    toggleDropDown(){
        const current = this.state.dropDownClass;
        const next = current === 'show' ? '' : 'show';

        this.setState({
            dropDownClass: next
        });
    }

    indicateKey(){
        if(this.state.selectedAnswer === "key") {
            return this.state.selectedAnswer;
        } else {
            return this.state.selectedAnswer; 
        }
    }
    

    render() {
        
        if(this.props.view === 'add'){
            return(
                <div className="modal" tabIndex="-1" role="dialog" onClick={this.props.toggle}>
                    <div className="modal-dialog modal-lg" role="document" onClick={this.handleChildClick}>
                        <div className={this.props.theme === '?darkpopout' ? "modal-content darkbutton" : 'modal-content'}>
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
                                            className={this.props.theme ==='?darkpopout' ? 'darkInput form-control form-control-lg' : 'form-control form-control-lg'}
                                            placeholder="Enter Question"
                                            onChange={this.handleQuestionInput}
                                            value={this.state.question}
                                        />
                                    </div>
                                    <div>
                                        <label>A:
                                            <input id="A"
                                                className={this.props.theme ==='?darkpopout' ? 'darkInput form-control form-control-sm' : 'form-control form-control-sm'}
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
                                                className={this.props.theme ==='?darkpopout' ? 'darkInput form-control form-control-sm' : 'form-control form-control-sm'}
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
                                                className={this.props.theme ==='?darkpopout' ? 'darkInput form-control form-control-sm' : 'form-control form-control-sm'}
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
                                                className={this.props.theme ==='?darkpopout' ? 'darkInput form-control form-control-sm' : 'form-control form-control-sm'}
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
                            <div className="modal-footer container justify-content-between">
                                <div className="dropdown">
                                    <button onClick={this.toggleDropDown.bind(this)} className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {this.indicateKey()}
                                    </button>
                                        <div className={`dropdown-menu ${this.state.dropDownClass}`} aria-labelledby="dropdownMenu2" >
                                            <a id="A" className="dropdown-item" type="button" value="this.state.selectedAnswer" onClick={this.handleSelectedAnswer}>A</a>
                                            <a id="B" className="dropdown-item" type="button" value="this.state.selectedAnswer" onClick={this.handleSelectedAnswer}>B</a>
                                            <a id="C" className="dropdown-item" type="button" value="this.state.selectedAnswer" onClick={this.handleSelectedAnswer}>C</a>
                                            <a id="D" className="dropdown-item" type="button" value="this.state.selectedAnswer" onClick={this.handleSelectedAnswer}>D</a>
                                        </div>
                                </div>
                                <div>
                                    <button type="button" className="btn btn-danger mr-3" onClick= {this.handleReset}>Reset</button>
                                    <button type="submit" className="btn btn-success" data-dismiss="modal" value="Submit" onClick={this.storeQuestionData}>Add</button>
                                </div>                               
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
