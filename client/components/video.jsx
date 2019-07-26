import React from 'react';

class Video extends React.Component{
    render(){
        return(
         <div id="video">
             <div id="twitch-embed" style={{'height': 80 + 'vh', 'width': 70 + 'vw', 'top': 40 + 'vh'}}>
             <iframe
                src="https://player.twitch.tv/?channel=dallas&muted=true"
                height="100%"
                width="100%"
                frameborder="0"
                scrolling="no"
                allowfullscreen="true"
                style={{'position':'relative',
                        'top':7 + 'vh'}}>
             </iframe>
                    <button className="button button4"
                        style={{
                            'position': 'absolute',
                            'top': 50 + '%',
                            'right': 96 + '%',
                            'background-color': '#4CAF50',
                            'display': 'inline-block',
                            'font-size': 16 + 'px'
                        }}>click me
                </button>

                <button className="button button4"
                        style={{
                            'position': 'absolute',
                            'top': 40 + '%',
                            'right': 96 + '%',
                            'backgroundColor': '#4CAF50',
                            'display': 'inline-block',
                            'font-size': 16 + 'px'
                        }}>click me
                </button>
            </div>
        </div>)
    }
}
export default Video;
