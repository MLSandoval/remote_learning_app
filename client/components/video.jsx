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
        console.log(' video component mounted. video.state.answers: ',this.state.answers)
    }

    toggleModal(event){
        console.log('add admin question button event: ',event.target);
        if(this.state.view === ''){
            if(event.target.id === 'addButton'){
                this.setState({ view: 'add' });
            } else {
                this.setState({ view: 'saved' })
            }
        }else {
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


    handleQuestionSelect(event) {

        const answers = event.answers.split(",");
        console.log('answers: ',answers);

        const answerIDs = event.answer_ids.split(",")
        console.log('answerIDs: ',answerIDs);

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
        console.log('video render switch, this.props.userType: ', this.props.userType);
        if (this.props.userType === 'admin') {
            return (
                <div id="video" className="col-10">
                    {/* <iframe src="https://player.twitch.tv/?channel=shroud&muted=true" height="100%" width="100%" frameBorder="0" scrolling="no" allowFullScreen={true}> </iframe> */}
                    <div className="front btn-group btn-group-vertical" 
                    // style={{'bottom':70 + 'vh', "height":150 + 'px'}}
                        >
                        <button id="addButton" type="button" className="front btn btn-primary" onClick={this.toggleModal}>
                            <i id="addButton" className="admin-button fa fa-plus-square-o"></i>
                        </button>
                        <button id="savedButton" type="button" className="front btn btn-primary" onClick={this.toggleModal}>
                            <i id="savedButton" className="admin-button fa fa-list-ul"></i>
                        </button>
                    </div>
                    <AddAdminQuestionForm
                        view={this.state.view}
                        toggle={this.toggleModal}
                        callback={this.props.passQuestionCallback}
                    />
                    <BroadcastModal view={this.state.view}
                                    options={this.props.data}
                                    toggle={this.toggleModal}
                                    answers={this.state.answers}
                                    handleSelect={this.handleQuestionSelect} />
                </div>
            )
        } else {
            return (
                <div id="video" className="col-10">
                    {/* <iframe src="https://player.twitch.tv/?channel=shroud&muted=true" height="100%" width="100%" frameBorder="0" scrolling="no" allowFullScreen={true}></iframe> */}
                <StudentModal questionList={this.props.data}/>
                </div>
                )
        }
    }
}
