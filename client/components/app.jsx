import React from 'react';
import Video from './video.jsx';
import SidePanel from './sidepanel.jsx';
import addQuestionForm from './addQuestionForm';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userType: 'admin',
            questionQueue: [ { id: '1',question: 'Why isn\'t this working?', author: 'Dwight' },
                    { id: '2', question: 'What does this button do?', author: 'Rex' },
                    { id: '3', question: 'Do you feel lucky, punk?', author: 'Clint' }],

            broadcastQuestion:[]
                }

        this.switchUser = this.switchUser.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
        };

    switchUser(){
        if (this.state.userType === 'admin'){
            this.setState({ userType: 'student' })
        } else {
            this.setState({ userType: 'admin' })
        }
    }

    addQuestion(question) {
        let newQuestion = [{ 'id': '4', 'question': question, 'author': 'Guest' }];
        this.setState({ questionQueue: this.state.questionQueue.concat(newQuestion)})

         console.log('New Question', newQuestion);
      }

    deleteQuestion(id){
        let questionArr = this.state.questionQueue.filter(questionObj =>{
             return questionObj.id !== id;
        })
           this.setState({questionQueue:questionArr})
        }

    render(){
        return(
            <div id="app" className="container-fluid nopadding">
                <div className="row" style={{'height':101 + 'vh'}}>
                    <button style={{ 'position': 'absolute', 'height': 15 + 'px', 'left': 10 + 'px', 'zIndex': 10 }} onClick={this.switchUser}></button>
                    <Video userType={this.state.userType} />
                    <SidePanel userType={this.state.userType}
                        add={this.addQuestion}
                        delete={this.deleteQuestion}
                        questionQueue={this.state.questionQueue} />
                </div>
            </div>
        )
    }
}

export default App;
