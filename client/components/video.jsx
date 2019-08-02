import React from 'react';
import AddQuestionForm from './addQuestionForm.jsx'

export default class Video extends React.Component{
    constructor(props){
        super(props);
        this.state={
            view : false
        }

        this.toggleAddQ =this.toggleAddQ.bind(this);
    }
    

    toggleAddQ(){
        if(this.state.view === true){
            this.setState({view : false});
        } else {
            this.setState({view: true});
        }
    }


    render(){
      console.log('current State: ', this.state.view)
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
                    <button typ="button" className="button button4"                         
                            onClick={this.toggleAddQ}>Add Q
                    </button>
                    <AddQuestionForm view={this.state.view}/>
                    <button className="button button4"
                        style={{
                            'position': 'absolute',
                            'top': 40 + '%',
                            'right': 90 + '%',
                            'backgroundColor': '#4CAF50',
                            'display': 'inline-block',
                            'fontSize': 16 + 'px'}}
                        >click me
                    </button>
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
                </div>)
        }
    }
}
