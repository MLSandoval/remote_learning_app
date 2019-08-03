import React from 'react';
import Video from './video.jsx';
import SidePanel from './sidepanel.jsx';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userType: 'admin',
            questionQueue: [],
            broadcastquestions: []
        }
        this.switchUser = this.switchUser.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.fetchAdminQuestionData = this.fetchAdminQuestionData.bind(this);

        };

    updateBroadcastQuestions(fkj) {

    }

    componentDidMount() {
        console.log('component did mount');
        this.fetchAdminQuestionData();
        this.getStudentQuestions();
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    getStudentQuestions() {
        fetch('http://localhost:3001/getStudentsQuestions', {
            method: 'GET'
        })
        .then(promiseObj => promiseObj.json())
        .then(successObj =>
        {
            console.log('scuccesObj: ',successObj);
        this.setState({ questionQueue: successObj.data })
        }
        ).catch((error) => {console.error(error)});
    }

    fetchAdminQuestionData() {
        console.log('click');
        // const response = fetch('/getAdminQuestions', {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // });
        // const json = response.json();
        // this.setState({broadcastquestions: json});

        fetch('http://localhost:3001/getAdminQuestions',{
            method: 'GET'
        })
            .then(promiseObj => promiseObj.json())
            .then(successObj => {
                console.log('scuccesObj: ', successObj);
                this.setState({ broadcastquestions: successObj.data })
                this.appendQuestionDivs()
            }
            ).catch((error) => { console.error(error) });


        console.log('this.state post fetchAdminQuestionData: ',this.state);
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
        this.setState({ questionQueue: this.state.questionQueue.concat(newQuestion)})
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
                    <Video userType={this.state.userType}
                        data={this.state.broadcastquestions}/>
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
