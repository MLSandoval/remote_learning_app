import React from 'react';
import AddQuestionForm from './addQuestionForm.jsx';
import BroadcastButton from './broadcastquestionbutton';

export default class Video extends React.Component{
    constructor(props){
        super(props);
        this.state={
            view : ''
        }
        this.renderBroadcastButton = this.renderBroadcastButton.bind(this);
        this.toggleAddQ =this.toggleAddQ.bind(this);
    }
    
    toggleAddQ(){
        if(this.state.view === true){
            this.setState({view : false});
        } else {
            this.setState({view: true});
        }
    }
        
    renderBroadcastButton() {
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
                    <iframe
                        src="https://player.twitch.tv/?channel=shroud&muted=true"
                        height="100%"
                        width="100%"
                        frameBorder="0"
                        scrolling="no"
                        allowFullScreen={true}>
                    </iframe>
                    <button typ="button" className="button button4"                         
                            onClick={this.toggleAddQ}>Add Q
                    </button>
                    <AddQuestionForm view={this.state.view}
                                     toggle={this.toggleAddQ}
                    />
                    <button className="button button4"
                        onClick={this.renderBroadcastButton}
                        style={{
                            'position': 'absolute',
                            'top': 50 + '%',
                            'right': 90 + '%',
                            'backgroundColor': '#4CAF50',
                            'display': 'inline-block',
                            'fontSize': 16 + 'px'
                        }}>Broadcast
                    </button>
                    <BroadcastButton view={this.state.view} data={this.props.data} load={this.props.load} />
                </div>
            )
        } else {
            return (
                <div id="video" className="col-lg-9">
                    <iframe
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
