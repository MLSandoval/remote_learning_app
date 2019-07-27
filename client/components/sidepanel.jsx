import React from 'react';
import ReactDOM from 'react-dom';

export default class SidePanel extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      questions: this.props.data
    }
  }

  showQueue() {
  document.getElementById('chat_embed').hidden = true;
}

  showChat() {
  document.getElementById('chat_embed').hidden = false;
}



  render(){
    console.log('sidepanel props: ',this.state);

    var questionDivs = this.state.questions.map(x =>
      <div className="question">{x.question} - {x.author}</div>
    )

    return(
      <div className="container">
        <div className="row fixed-top sidebar" style={{
          'height': 80 + 'vh',
          'width': 30 + 'vw',
          'display': 'inline-block',
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

            {questionDivs}
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
   </div>
    )
  }
}
