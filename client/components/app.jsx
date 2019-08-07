import React from 'react';
import Video from './video.jsx';
import SidePanel from './sidepanel.jsx';
class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            adminID: 1,
            adminTwitchID: null,
            adminTwitchUsername: '',
            userType: 'admin',
            questionQueue: [],
            broadcastquestions: [],
            currentQuestionTarget: null
        }
        this.switchUser = this.switchUser.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.fetchAdminQuestionData = this.fetchAdminQuestionData.bind(this);
        this.addAdminQuestionToState = this.addAdminQuestionToState.bind(this);
    };

    addAdminQuestionToState(newQuestion){
        console.log('addAdminQuestionToState called. newQuestion: ', newQuestion);
        console.log('this.state.broadcastquestions: ', this.state.broadcastquestions);

        newQuestion.answers = newQuestion.answers.join(',');
        console.log('addAdminQuestionToState called. newQuestion after join()ß: ', newQuestion);

        this.setState({broadcastquestions: this.state.broadcastquestions.concat(newQuestion)});
        console.log('new question added state: ', this.state.broadcastquestions);
    }

    getAdminUserData(adminTwitchUsername){

        adminTwitchUsername = 'mixmstrmike';

        fetch(`https://api.twitch.tv/helix/users?login=${adminTwitchUsername}`,{
            method: 'GET',
            headers:{
                "Client-Id": '1k9829yw8sqkbl0ghhao4ml6zpx33l'
            }
        })
            .then(res => res.json())
            .then(res => {

                this.setState({adminTwitchID: res.data[0].id, adminTwitchUsername: res.data[0].login});
            })
            .catch(error=>{console.error(error)});
    }
    componentDidMount() {

        this.fetchAdminQuestionData();
        this.getStudentQuestions();
        this.getAdminUserData();

    }
    componentDidUpdate() {

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
        console.log("question removed: ", id)
        let questionArr = this.state.questionQueue.filter(questionObj =>{
             return questionObj.id !== id;
        })
        console.log("fun console, ", questionArr[id]);
        this.setState({currentQuestionTarget: questionArr[id]})
        this.setState({questionQueue:questionArr})
       

    }

    render(){
        console.log("Deleted Question: ",this.state.currentQuestionTarget);
        return(
            <div id="app" className="container-fluid nopadding">
                <div className="row" style={{'height':101 + 'vh'}}>
                    <button style={{ 'position': 'absolute', 'height': 15 + 'px', 'left': 10 + 'px', 'zIndex': 10 }} onClick={this.switchUser}></button>
                    <Video userType={this.state.userType}
                        data={this.state.broadcastquestions}
                        adminData={[this.state.adminID, this.state.adminTwitchUsername]}
                        passQuestionCallback={this.addAdminQuestionToState}

                    />
                    <SidePanel userType={this.state.userType}
                        add={this.addQuestion}
                        delete={this.deleteQuestion}
                        questionQueue={this.state.questionQueue} 
                        questionTarget={this.state.currentQuestionTarget}
                        />
                </div>
            </div>
        )
    }
}
export default App;
