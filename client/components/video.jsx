import React from 'react';

class Video extends React.Component{

    fakeFetch(){
        fetch('/test', {
            method: 'get'
        })
        .then(res=> res.json())
        .then(res=>{
            console.log('fakeFetch Success, res: ', res);
        })
        .catch(err=>{
            console.log('fakeFetch error: ', err);
        })

    }

    render(){

        if(this.props.UserType === 'admin'){
            return (
                <div className="float-left" id="video">
                    <div className="row">
                        <div className="col-xl-"
                            id="twitch-embed"
                            style={{ 'height': 80 + 'vh', 'width': 72 + 'vw', 'top': 40 + 'vh' }}>
                            <iframe
                                src="https://player.twitch.tv/?channel=shroud&muted=true"
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
                                    'right': 96 + '%',
                                    'backgroundColor': '#4CAF50',
                                    'display': 'inline-block',
                                    'fontSize': 16 + 'px'
                                }}>click me
                            </button>

                            <button className="button button4"
                                style={{
                                    'position': 'absolute',
                                    'top': 40 + '%',
                                    'right': 96 + '%',
                                    'backgroundColor': '#4CAF50',
                                    'display': 'inline-block',
                                    'fontSize': 16 + 'px'
                                }}>click me
                            </button>
                        </div>
                    </div>
                </div>)
        } else {
            return (
                <div className="float-left" id="video">
                    <div className="row">
                        <div className="col-xl-"
                            id="twitch-embed"
                            style={{ 'height': 80 + 'vh', 'width': 72 + 'vw', 'top': 40 + 'vh' }}>
                            <iframe
                                src="https://player.twitch.tv/?channel=shroud&muted=true"
                                height="100%"
                                width="100%"
                                frameBorder="0"
                                scrolling="no"
                                allowFullScreen={true}>
                            </iframe>
                        </div>
                    </div>
                </div>)
        }
    }
}
export default Video;
