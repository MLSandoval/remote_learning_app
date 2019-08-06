import React from 'react';
import AddAdminQuestionForm from './addAdminQuestionForm.jsx';
import BroadcastModal from './broadcastquestionmodal';
import StudentModal from './studentModal';

export default class Video extends React.Component{
    constructor(props){
        super(props);
        this.state={
            view : '',
            answers: {
                answerA: '',
                answerB: '',
                answerC: '',
                answerD: ''
            }
        }
        this.handleQuestionSelect = this.handleQuestionSelect.bind(this);
        this.toggleModal =this.toggleModal.bind(this);
    }

    componentDidUpdate() {

    }

    toggleModal(event){
        console.log('toggle modal called.');
        if (this.state.view === '' && event.target.id === 'addButton' || this.state.view === 'saved' && event.target.id === 'addButton'){
            this.setState({ view: 'add' });
        } else if (this.state.view === '' || this.state.view === 'add' && event.target.id === 'savedButton') {
                this.setState({ view: 'saved' })
        }else{
            this.setState({
                view: '',
                answers: {
                    answerA: '',
                    answerB: '',
                    answerC: '',
                    answerD: ''
                }
            });
        }
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
                    />
                </div>
                    
                  
            );
        }else if(this.state.view === 'saved'){
            return(
                <div className="container">
                    <BroadcastModal view={this.state.view}
                        options={this.props.data}
                        toggle={this.toggleModal}
                        answers={this.state.answers}
                        handleSelect={this.handleQuestionSelect} />
                </div>
            );
        }else{
            return(
                <React.Fragment/>
            );
        }
    }


    handleQuestionSelect(event) {
        console.log('handlequestionselect in video, event.target: ', event.target);
        const answers = event.answers.split(',');

        const answerIDs = event.answer_ids;

        this.setState({
            answers: {
                answerA: [answers[0], answerIDs[0]],
                answerB: [answers[1], answerIDs[1]],
                answerC: [answers[2], answerIDs[2]],
                answerD: [answers[3], answerIDs[3]]
            }
        })
    }


    render(){

        if (this.props.userType === 'admin') {
            return (
                <div id="video" className="col-10">
                    <iframe src="https://player.twitch.tv/?channel=shroud&muted=true" height="100%" width="100%" frameBorder="0" scrolling="no" allowFullScreen={true}> </iframe>
                    <div className="front btn-group btn-group-vertical" 
                        style={{ 'bottom': 70 + 'vh', "height": 150 + 'px' }}>
                        <button id="addButton" type="button" className="front btn btn-primary" onClick={this.toggleModal}>
                            <i id="addButton" className="admin-button fa fa-plus-square-o"></i>
                        </button>
                        <button id="savedButton" type="button" className="front btn btn-primary" onClick={this.toggleModal}>
                            <i id="savedButton" className="admin-button fa fa-list-ul"></i>
                        </button>
                    </div> 
                    {this.renderModalSwitch()}    
                </div>
            )
        } else {
            return (
                <div id="video" className="col-10">
                    <iframe src="https://player.twitch.tv/?channel=shroud&muted=true" height="100%" width="100%" frameBorder="0" scrolling="no" allowFullScreen={true}></iframe>
                <StudentModal questionList={this.props.data}/>
                </div>
                )
        }
    }
}
