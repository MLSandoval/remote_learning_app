import React from 'react';
import AddQuestionForm from './addQuestionForm.jsx';
import BroadcastModal from './broadcastquestionmodal';

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
        console.log('video.state.answers: ',this.state.answers)
    }

    toggleModal(event){
        console.log('event: ',event.target.id);
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
        if (this.props.userType === 'admin') {
            return (
                <div id="video" className="col-lg-9">
                    <iframe src="https://player.twitch.tv/?channel=shroud&muted=true" height="100%" width="100%" frameBorder="0" scrolling="no" allowFullScreen={true}> </iframe>
                    <button
                            id="addButton"
                            className="button button4"
                            onClick={this.toggleModal}
                            style={{
                                'position': 'absolute',
                                'top': 40 + '%',
                                'right': 90 + '%',
                                'backgroundColor': '#4CAF50',
                                'display': 'inline-block',
                                'fontSize': 16 + 'px'
                            }}>Add Q
                    </button>
                    <AddQuestionForm
                        view={this.state.view}
                        toggle={this.toggleModal}
                        callback={this.props.passQuestionCallback}
                    />
                    <button
                        id="savedButton"
                        className="button button4"
                        onClick={this.toggleModal}
                        style={{
                            'position': 'absolute',
                            'top': 50 + '%',
                            'right': 90 + '%',
                            'backgroundColor': '#4CAF50',
                            'display': 'inline-block',
                            'fontSize': 16 + 'px'
                        }}>Broadcast
                    </button>
                    <BroadcastModal view={this.state.view}
                                    options={this.props.data}
                                    toggle={this.toggleModal}
                                    answers={this.state.answers}
                                    handleSelect={this.handleQuestionSelect} />
                </div>
            )
        } else {
            return (
                <div id="video" className="col-lg-9">
                    <iframe src="https://player.twitch.tv/?channel=shroud&muted=true" height="100%" width="100%" frameBorder="0" scrolling="no" allowFullScreen={true}></iframe>
                </div>)
        }
    }
}
