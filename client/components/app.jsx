import React from 'react';
import Video from './video.jsx';
import SidePanel from './sidepanel.jsx';
import Header from './header.jsx';
import socketIOClient from "socket.io-client";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adminID: 1,
      adminTwitchID: null,
      channelName: '',
      userType: '',
      questionQueue: [],
      broadcastquestions: [],
      userName: '',
      theme: ''
    }
    this.switchUser = this.switchUser.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.deleteStudentQuestion = this.deleteStudentQuestion.bind(this);
    this.fetchAdminQuestionData = this.fetchAdminQuestionData.bind(this);
    this.addAdminQuestionToState = this.addAdminQuestionToState.bind(this);
    this.getUserLoginData = this.getUserLoginData.bind(this);
    this.deleteAdminQuestion = this.deleteAdminQuestion.bind(this);
    this.handleChannelNameInput = this.handleChannelNameInput.bind(this);
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handleSelectUser = this.handleSelectUser.bind(this);
    this.switchTheme = this.switchTheme.bind(this);
    this.socketToDeleteQQ = this.socketToDeleteQQ.bind(this);
  };

  componentDidUpdate() {
    console.log('app state: ', this.state);
    this.deleteAdminQuestion = this.deleteAdminQuestion.bind(this);
  };

  deleteAdminQuestion(adminQuestionID) {
    const broadcastquestions = this.state.broadcastquestions;
    fetch(`http://localhost:3001/adminQuestion?adminQuestionID=${adminQuestionID}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ broadcastquestions: broadcastquestions.filter(broadcastquestions => broadcastquestions.value !== adminQuestionID) });
      })
      .catch(error => { console.error(error) });

  }

    addAdminQuestionToState(newQuestion){
        newQuestion.answers = newQuestion.answers.join(',');
        this.setState({broadcastquestions: this.state.broadcastquestions.concat(newQuestion)});
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

      console.log('channelName: ',channelName,'userType: ',userType,'userName: ',userName);
        this.setState({'userName': userName});
        this.setState({'userType': userType});
        let x = this;
        fetch(`https://api.twitch.tv/helix/users?login=${channelName}`,{
            method: 'GET',
            headers:{
                "Client-Id": '1k9829yw8sqkbl0ghhao4ml6zpx33l'
            }
        })
        .then(res => res.json())
        .then(res => {
            x.setState({adminTwitchID: res.data[0].id});
            x.setState({channelName: res.data[0].login});
        })
        .catch(error=>{console.error(error)});
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
          this.setState({
              broadcastquestions: successObj.data.map(element =>
                  element = { 
                      'value': element.id,
                      'label': element.question,
                      'admin_id': element.admin_id,
                      'answer_ids': element.answer_ids,
                      'answers': element.answers 
                  }
              )
          })
      })
      .catch(error=>{
          console.error(error);
      });
  }


  switchUser(event){
      if (this.state.userType === 'admin'){
          this.setState({ userType: 'student' })
      } else {
          this.setState({ userType: 'admin' })
      }
  }

  setuserName(name) {
      this.setState({ userName: name });
  }

  addQuestion(question) {
      let newQuestion = [{ 'id': this.state.questionQueue.length + 1, 'question': question.question, 'author': question.author }];
      this.setState({ questionQueue: this.state.questionQueue.concat(newQuestion) })
  }

  deleteStudentQuestion(adminQuestionID) {
    console.log('app deleteStudentQuestion reached, adminQuestionID: ', adminQuestionID);

    const questionQueue = this.state.questionQueue;
    fetch(`http://localhost:3001/studentQuestion?studentQuestionID=${adminQuestionID}`, {
    method: 'DELETE'
    })
    .then(res => res.json())
    .then(res => {
        this.setState({ questionQueue: questionQueue.filter(questionObj => questionObj.id !== adminQuestionID) });
    })
    .catch(error => { console.error(error) });
  }

  switchTheme() {
    if (this.state.theme === '?darkpopout'){
          this.setState({ theme: '' })
      } else {
          this.setState({ theme: '?darkpopout' })
      }
  }

  socketToDeleteQQ(questionID){
    console.log(' app socketToDeleteQQ reached, questionID', questionID);
    this.socket.emit('QQdelete', questionID);
  }

  componentDidMount(){
    this.fetchAdminQuestionData();
    this.getStudentQuestions();
    this.getUserLoginData();

    this.socket = socketIOClient('http://0.0.0.0:3001');
    this.socket.on('deleteQQ', (questionID)=>{
      console.log('app socket to delete QQ question reached, question to delete: ', questionID);
      this.deleteStudentQuestion(questionID);
    });
  }

  render() {
    return (
      <div id="app" className="container-fluid p-0">
        <i className="fas fa-moon clickable" style={{ 'position': 'absolute', 'height': 15 + 'px', 'top': 10 + 'px','left': 10 + 'px', 'zIndex': 10 }} onClick={this.switchTheme}></i>
        <div className={this.state.theme === '?darkpopout' ? "black row top" : "row top"}>
          <Header switchUser={this.switchUser}
            loginFunction={this.getUserLoginData}
            setuserName={this.setuserName}
            handleChannelNameInput={this.handleChannelNameInput}
            handleUsernameInput={this.handleUsernameInput}
            handleSelectUser={this.handleSelectUser}
            theme={this.state.theme}
          />
        </div>
        <div className="row" style={{ 'height': 93 + 'vh' }}>
          <Video userType={this.state.userType}
            hostUser={this.state.channelName}
            data={this.state.broadcastquestions}
            adminData={[this.state.adminID, this.state.channelName]}
            passQuestionCallback={this.addAdminQuestionToState}
            deleteAdminQuestion={this.deleteAdminQuestion}
            theme={this.state.theme}
          />
          <SidePanel 
            userType={this.state.userType}
            adminData={[this.state.adminID, this.state.channelName]}
            add={this.addQuestion}
            delete={this.socketToDeleteQQ}
            questionQueue={this.state.questionQueue} 
            theme={this.state.theme}
            username={this.state.userName}
          />
            
        </div>
      </div>
    )
  }
}
export default App;