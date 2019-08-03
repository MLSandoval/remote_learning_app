import React from 'react';
import AddQuestionForm from './addQuestionForm.jsx';
import BroadcastModal from './broadcastquestionmodal';

export default class Video extends React.Component{
    constructor(props){
        super(props);
        this.state={
            view : ''
        }
        this.renderBroadcastModal = this.renderBroadcastModal.bind(this);
        this.toggleAddQ =this.toggleAddQ.bind(this);
    }

    toggleAddQ(){
        console.log('click');
        if(this.state.view === ''){
            this.setState({view : 'add'});
        } else {
            this.setState({view: ''});
        }
    }

    renderBroadcastModal() {
        console.log('click');
        if (this.state.view === '') {
            this.setState({ view: 'broadcast' })
        } else {
            this.setState({ view: ''})
        }
    }

    render(){
        if (this.props.userType === 'admin') {
            return (
                <div id="video" className="col-lg-9">
                    {/* <iframe
                        src="https://player.twitch.tv/?channel=shroud&muted=true"
                        height="100%"
                        width="100%"
                        frameBorder="0"
                        scrolling="no"
                        allowFullScreen={true}>
                    </iframe> */}
                    <button className="button button4"
                            onClick={this.toggleAddQ}
                            style={{
                                'position': 'absolute',
                                'top': 40 + '%',
                                'right': 90 + '%',
                                'backgroundColor': '#4CAF50',
                                'display': 'inline-block',
                                'fontSize': 16 + 'px'
                            }}>Add Q
                    </button>
                    <AddQuestionForm view={this.state.view}
                        toggle={this.toggleAddQ}
                        callback={this.props.passQuestionCallback}
                    />
                    <button className="button button4"
                        onClick={this.renderBroadcastModal}
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
                                    toggle={this.toggleAddQ} />
                </div>
            )
        } else {
            return (
                <div id="video" className="col-lg-9">
                    {/* <iframe
                        src="https://player.twitch.tv/?channel=shroud&muted=true"
                        height="100%"
                        width="100%"
                        frameBorder="0"
                        scrolling="no"
                        allowFullScreen={true}>
                    </iframe> */}
                </div>)
        }
    }
}
