import React from 'react';
import ReactDOM from 'react-dom';

export default class SidePanel extends React.Component{

  showQueue() {
  document.getElementById('chat_embed').hidden = true;
}

  showChat() {
  document.getElementById('chat_embed').hidden = false;
}

  render(){
    return(
      <div className="sidebar" style={{
        'height': 80 + 'vh',
        'width': 25 + 'vw', display: 'inline-block',
        'position': 'absolute',
        'left': 71 + 'vw',
        'bottom': 12 + 'vh'}}>
        <div>
            <div id="chat_button" style={{
                    'height': 10 + '%',
                    'width': 50 + '%',
                    'display': 'inline-block',
                    'position': 'absolute',
                    'lineHeight': 2.6,
                    'textAlign': 'center',
                    'backgroundColor':'aqua'}} onClick={this.showChat}>Chat
            </div>

            <div id="queue_button" style={{
                    'height': 10 + '%',
                    'width': 50 + '%',
                    'left': 50 + '%',
                    'display': 'inline-block',
                    'position': 'absolute',
                    'lineHeight': 2.6,
                    'textAlign': 'center',
                    'backgroundColor':'darkgoldenrod'}} onClick={this.showQueue}>Queue
            </div>

        </div>
        <div id="queue"
          style={{
            'height': 90 + '%',
            'width': 100 + '%',
            'display': 'inline-block',
            'position': 'absolute',
            'top': 8 + 'vh',
            'backgroundColor': 'salmon'}}>
          <div className="question">What are the values for display?</div>
          <div className="question">How do you hide an element?</div>
          <div className="question">Why isn't this working?</div>
        </div>

        <div id="chat_container" style={{
          'height': 90 + '%',
          'width': 100 + '%',
          'display': 'inline-block',
          'position': 'absolute',
          'top': 8 + 'vh'}}>
          <iframe frameBorder="0" scrolling="no" id="chat_embed" src="https://www.twitch.tv/embed/hebo/chat" height="100%"
            width="100%">
          </iframe>
        </div>

   </div>
    )
  }
}
