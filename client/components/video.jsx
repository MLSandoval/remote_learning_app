import React from 'react';
import AddAdminQuestionForm from './addAdminQuestionForm.jsx';
import BroadcastModal from './broadcastquestionmodal';
import StudentModal from './studentModal';
import ExpandedQuestionModal from "./expandedQuestionModal";
import socketIOClient from "socket.io-client";


export default class Video extends React.Component{
    constructor(props){
        super(props);
        this.state={
            view : '',
            selectedQuestion: '',
            displayQuestion: false,
            sentQuestion: ''
        }

        this.handleQuestionSelect = this.handleQuestionSelect.bind(this);
        this.handleSendQuestion = this.handleSendQuestion.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.resetSelect = this.resetSelect.bind(this);
        this.handleQuestionToBroadcast = this.handleQuestionToBroadcast.bind(this);
        this.handleAnswerData = this.handleAnswerData.bind(this);
        this.handleStudentAnswerClicks = this.handleStudentAnswerClicks.bind(this);
    }

    resetSelect(){
      this.setState({ selectedQuestion: '' });

    }

    toggleModal(event){
        
        if (this.state.view === '' && event.target.id === 'addButton' || this.state.view === 'saved' && event.target.id === 'addButton'){
            this.setState({ view: 'add' });
        } else if (this.state.view === '' || this.state.view === 'add' && event.target.id === 'savedButton') {
                this.setState({ view: 'saved' })
        }else{
            this.setState({
                view: '',
                selectedQuestion: ''
            });
        }
    }  

    handleQuestionSelect(event) {
        this.setState({selectedQuestion: event});
    }

    handleSendQuestion() {
  
        this.socket.emit('broadcast', this.state.selectedQuestion); 
    }

    handleQuestionToBroadcast(question){
        console.log('compare question:', question);
        console.log('compare this.state.selectedQuestion', this.state.selectedQuestion);
        this.setState({ displayQuestion: true, sentQuestion: question });

         //setTimeout(() => { this.setState({ displayQuestion: false, sentQuestion: '' }) }, 25000);
    }

    handleAnswerData(answerData){
        //setState from here for updating the graph, answerData is the object
        console.log('handleAnswerData called properly, answerData: ', answerData);
    }

    handleStudentAnswerClicks(answer){
        
        console.log('handleStudentAnswerClicks called, answer: ', answer);

        this.socket.emit('answerData', answer);

    }
    
    componentDidMount(){
        this.socket = socketIOClient('http://0.0.0.0:3001');
        // this.socket = socketIOClient('/');

        this.socket.on('questionToBroadcast', question =>{
            console.log('socket on questionToBroadcast pinged correctly, question: ', question);
            this.handleQuestionToBroadcast(question);
        });

        this.socket.on('answer', (answerData)=>{
            console.log('socket on answer pinged correctly, answer: ', answerData);
            this.handleAnswerData(answerData);
        });
    }

    componentWillUnmount(){
        this.socket.off('questionToBroadcast');
        this.socket.off('answer');

    }

    renderModalSwitch(){
        if (this.state.view === 'add'){
            return(
                <div className="container">
                    <AddAdminQuestionForm
                        view={this.state.view}
                        toggle={this.toggleModal}
                        callback={this.props.passQuestionCallback}
                        adminData={this.props.adminData}
                        setStateCallback={this.toggleModal}
                        theme={this.props.theme}
                    />
                </div>   
            );
        }else if(this.state.view === 'saved'){
            return(
                <div className="container">
                    <BroadcastModal view={this.state.view}
                        handleSendQuestion={this.handleSendQuestion}
                        options={this.props.data}
                        toggle={this.toggleModal}
                        question={this.state.selectedQuestion}
                        handleSelect={this.handleQuestionSelect}
                        deleteAdminQuestion={this.props.deleteAdminQuestion}
                        resetSelect={this.resetSelect}
                        theme={this.props.theme}
                        />
                </div>
            );
        }else{
            return(
                <React.Fragment/>
            );
        }
    }

    render() {
        const { view } = this.state;
        if (this.props.userType === 'admin') {
            return (
                <div id="video" className="col-10">
                    <iframe src={`https://player.twitch.tv/?channel=${this.props.adminData[1]}&muted=true`} height="100%" width="100%" frameBorder="0" scrolling="no" allowFullScreen={true}> </iframe>
                    <div className="front btn-group-vertical"
                        style={{ 'bottom': 70 + 'vh', "height": 150 + 'px' }}>
                        <div id="addButton" type="button" className={view === 'add' ? "btn selectedButton" : 'btn lightButton'} onClick={this.toggleModal}>
                            <i id="addButton" className="fa fa-plus-square-o"></i>
                        </div>
                        <div id="savedButton" type="button" className={view === 'saved' ? "btn selectedButton" : 'btn lightButton'} onClick={this.toggleModal}>
                            <i id="savedButton" className="fa fa-list-ul"></i>
                        </div>
                    </div>
                    {this.renderModalSwitch()}
                    {/* <ExpandedQuestionModal/> */}
                </div>
            )
        } else {
            if (this.state.displayQuestion) {
                return (
                    <div id="video" className="col-10">
                        <iframe src={`https://player.twitch.tv/?channel=${this.props.adminData[1]}&muted=true`} height="100%" width="100%" frameBorder="0" scrolling="no" allowFullScreen={true}></iframe>
                        <StudentModal
                            adminQuestion={this.state.sentQuestion}
                            handleStudentAnswerClicks={this.handleStudentAnswerClicks}
                        />
                    </div>
                )
            } else {
                return (
                    <div id="video" className="col-10">
                        <iframe src={`https://player.twitch.tv/?channel=${this.props.adminData[1]}&muted=true`} height="100%" width="100%" frameBorder="0" scrolling="no" allowFullScreen={true}></iframe>
                    </div>
                )
            }
        }
    }
}