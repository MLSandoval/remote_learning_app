import React from 'react';
import AdminButton from './adminbutton.jsx';

export default class Video extends React.Component{

    render(){
        if (this.props.userType === 'admin') {
            return (
                <div id="video" className="col-lg-9">
                    <iframe
                        src="https://player.twitch.tv/?channel=dallas&muted=true"
                        height="100%"
                        width="100%"
                        frameBorder="0"
                        scrolling="no"
                        allowFullScreen={true}>
                    </iframe>
                </div>
            )
        } else {
            return (
                <div id="video" className="col-lg-9">
                    <iframe
                        src="https://player.twitch.tv/?channel=dallas&muted=true"
                        height="100%"
                        width="100%"
                        frameBorder="0"
                        scrolling="no"
                        allowFullScreen={true}>
                    </iframe>
                    <button className="button button4"
                        style={{
                            'position': 'absolute',
                            'top': 50 + '%',
                            'right': 90 + '%',
                            'backgroundColor': '#4CAF50',
                            'display': 'inline-block',
                            'fontSize': 16 + 'px'
                        }}>click me
                    </button>
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
                </div>)
        }
    }
}
