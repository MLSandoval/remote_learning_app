import React from 'react';
import BroadcastButton from './broadcastquestionbutton';

export default class Video extends React.Component{

    constructor() {
        super();
        this.state = {
            view: ''
        }
        this.renderBroadcastButton = this.renderBroadcastButton.bind(this);
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
                    {/* <iframe
                        src="https://player.twitch.tv/?channel=dallas&muted=true"
                        height="100%"
                        width="100%"
                        frameBorder="0"
                        scrolling="no"
                        allowFullScreen={true}>
                    </iframe> */}
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
                    <button className="button button4"
                        style={{
                            'position': 'absolute',
                            'top': 40 + '%',
                            'right': 90 + '%',
                            'backgroundColor': '#4CAF50',
                            'display': 'inline-block',
                            'fontSize': 16 + 'px'
                        }}>click me
                    </button>
                </div>
            )
        } else {
            return (
                <div id="video" className="col-lg-9">
                    {/* <iframe
                        src="https://player.twitch.tv/?channel=dallas&muted=true"
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
