import React from 'react';
import AdminButton from './adminbutton.jsx';

export default class Video extends React.Component{

    render(){
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
    }
}
