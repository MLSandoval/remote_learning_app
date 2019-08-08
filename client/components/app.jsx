import React from 'react';
import Video from './video.jsx';
import SidePanel from './sidepanel.jsx';
import Header from './header.jsx';


class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            adminID: 1,
            adminTwitchID: null,
            channelName: '',
            userType: 'admin',
            questionQueue: [],
            broadcastquestions: [],
            userName: '',
        }
        this.switchUser = this.switchUser.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.fetchAdminQuestionData = this.fetchAdminQuestionData.bind(this);
        this.addAdminQuestionToState = this.addAdminQuestionToState.bind(this);
        this.getUserLoginData = this.getUserLoginData.bind(this);
        this.deleteAdminQuestion = this.deleteAdminQuestion.bind(this);
        this.handleChannelNameInput = this.handleChannelNameInput.bind(this);
        this.handleUsernameInput = this.handleUsernameInput.bind(this);
        this.handleSelectUser = this.handleSelectUser.bind(this);
    };

    componentDidUpdate(){
        console.log('app state: ', this.state);
        this.deleteAdminQuestion = this.deleteAdminQuestion.bind(this);
    };

    deleteAdminQuestion(adminQuestionID){
      const broadcastquestions = this.state.broadcastquestions;
      console.log('what is broadcastquestions', broadcastquestions);

      fetch(`http://localhost:3001/adminQuestion?adminQuestionID=${adminQuestionID}`, {
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(res => {
        this.setState({ broadcastquestions: broadcastquestions.filter(broadcastquestions => broadcastquestions.value !== adminQuestionID) });
      })
      .catch(error=>{console.error(error)});

    }

    addAdminQuestionToState(newQuestion){
        console.log('addAdminQuestionToState called. newQuestion: ', newQuestion);
        console.log('this.state.broadcastquestions: ', this.state.broadcastquestions);

        newQuestion.answers = newQuestion.answers.join(',');
        console.log('addAdminQuestionToState called. newQuestion after join()ß: ', newQuestion);

        this.setState({broadcastquestions: this.state.broadcastquestions.concat(newQuestion)});
        console.log('new question added state: ', this.state.broadcastquestions);
    }


    handleChannelNameInput(event) {
    this.setState({channelName: event.target.value})
  }

  handleUsernameInput(event) {
    this.setState({userName: event.target.value})
  }

  handleSelectUser(event) {
    this.setState({userType: event.target.value})
  }
  

    getUserLoginData(channelName, userType, userName){
        this.setState({'userName': userName});
        this.setState({'userType': userType});
        console.log('entered getUserLoginData');
        let x = this;
        fetch(`https://api.twitch.tv/helix/users?login=${channelName}`,{
            method: 'GET',
            headers:{
                "Client-Id": '1k9829yw8sqkbl0ghhao4ml6zpx33l'
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log('response: ',res.data[0]);

                x.setState({adminTwitchID: res.data[0].id});
                x.setState({channelName: res.data[0].login});
                console.log('app state: ', this.state);

            })
            .catch(error=>{console.error(error)});
    }
    componentDidMount() {
        this.fetchAdminQuestionData();
        this.getStudentQuestions();
        this.getUserLoginData();
    }
    
    getStudentQuestions() {

        fetch('http://localhost:3001/getStudentsQuestions', {
            method: 'GET'
        })
            .then(promiseObj => promiseObj.json())
            .then(successObj =>{
                this.setState({ questionQueue: successObj.data });
            })
            .catch((error) => {console.error(error)});
    }
    fetchAdminQuestionData() {

        fetch('http://localhost:3001/getAdminQuestions',{
            method: 'GET'
        })
            .then(promiseObj => promiseObj.json())
            .then(successObj => {
                console.log('admin question object: ', successObj);
                this.setState({
                    broadcastquestions: successObj.data.map(element =>
                        element = { 'value': element.id,
                                    'label': element.question,
                                    'admin_id': element.admin_id,
                                    'answer_ids': element.answer_ids,
                                    'answers': element.answers }
                    )
                });
            }
            ).catch((error) => { console.error(error) });
    }


    switchUser(event){
        console.log('radio button event: ',event);
        if (this.state.userType === 'admin'){
            this.setState({ userType: 'student' })
        } else {
            this.setState({ userType: 'admin' })
        }
    }

    setuserName(name){
        this.setState({userName: name});
    }

    addQuestion(question) {
        let newQuestion = [{ 'id': this.state.questionQueue.length+1, 'question': question, 'author': this.state.userName }];
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
                <div className="row" style={{'height':7 + 'vh'}}>
                    <Header switchUser={this.switchUser} 
                    loginFunction={this.getUserLoginData} 
                    setuserName={this.setuserName}
                    handleChannelNameInput={this.handleChannelNameInput}
                    handleUsernameInput={this.handleUsernameInput}
                    handleSelectUser={this.handleSelectUser}
                    />
                </div>
                <div className="row" style={{'height':93 + 'vh'}}>
                    <button style={{ 'position': 'absolute', 'height': 15 + 'px', 'left': 10 + 'px', 'zIndex': 10 }} onClick={this.switchUser}></button>
                    <Video userType={this.state.userType}
                        hostUser={this.state.channelName}
                        data={this.state.broadcastquestions}
                        adminData={[this.state.adminID, this.state.channelName]}
                        passQuestionCallback={this.addAdminQuestionToState}
                        deleteAdminQuestion={this.deleteAdminQuestion}

                    />
                    <SidePanel userType={this.state.userType}
                                adminData={[this.state.adminID, this.state.channelName]}
                                add={this.addQuestion}
                                delete={this.deleteQuestion}
                                questionQueue={this.state.questionQueue} />
                </div>
            </div>
        )
    }
}
export default App;
