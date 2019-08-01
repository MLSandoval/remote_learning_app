import React from 'react';
import Video from './video.jsx';
import SidePanel from './sidepanel.jsx';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userType: 'admin',
            data: [ { id: '1',question: 'Why isn\'t this working?', author: 'Dwight' },
                    { id: '2', question: 'What does this button do?', author: 'Rex' },
                    { id: '3', question: 'Do you feel lucky, punk?', author: 'Clint' }]
            }
        this.switchUser = this.switchUser.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);

        };
        componentDidMount() {
          fetch('/getStudentsQuestions')
          .then(promiseObj => promiseObj.json())
          .then(successObj => 
            {
            this.setState({ data: successObj.data })
          }
          );
        }
    switchUser(){
        if (this.state.userType === 'admin'){
            this.setState({ userType: 'student' })
        } else {
            this.setState({ userType: 'admin' })
        }
    }

    addQuestion(question) {
        let newQuestion = [{ 'id': '4', 'question': question, 'author': 'Guest' }];
        this.setState({ data: this.state.data.concat(newQuestion)})

         console.log('New Question', newQuestion);
      }

    deleteQuestion(id){
        let questionArr = this.state.data.filter(questionObj =>{
             return questionObj.id !== id;
        })
           this.setState({data:questionArr})
        }

    render(){
        console.log("this.State: ", this.state.userType);
        return(
            <div id="app" className="container-fluid nopadding">
                <div className="row" style={{'height':101 + 'vh'}}>
                    <button style={{ 'position': 'absolute', 'height': 15 + 'px', 'left': 10 + 'px', 'zIndex': 10 }} onClick={this.switchUser}></button>
                    <Video userType={this.state.userType} />
                    <SidePanel userType={this.state.userType}
                        add={this.addQuestion}
                        delete={this.deleteQuestion}
                        data={this.state.data} />
                </div>
            </div>

        )
    }
}

export default App;
