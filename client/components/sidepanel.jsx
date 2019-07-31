import React from 'react';
import ReactDOM from 'react-dom';

export default class SidePanel extends React.Component{

  constructor(props) {
    super(props);

    this.appendQuestionDivs = this.appendQuestionDivs.bind(this);
    this.toggleView = this.toggleView.bind(this);

    this.state = {visible: 'chat'}
  }

  setView(nextActive){
    if(['chat', 'queue'].indexOf(nextActive) >= 0){
      this.setState({ visible: nextActive });
    }
  }

  toggleView(){
    const { visible } = this.state;
    let nextState = 'chat';

    if(visible === nextState){
      nextState = 'queue';
    }

    this.setState({ visible: nextState });
  }
  

  appendQuestionDivs(){
    let deleteQuestion = this.props.delete;
    if(this.props.userType === 'student') {
          var questionDivs = this.props.data.map(x =>
            <div className="question" key={x.id}>
            {x.question} - {x.author}
            </div>)
            return questionDivs;
    } else {
        var questionDivs = this.props.data.map(x =>
        <div className="question" key={x.id}>{x.question} - {x.author}
          <i className="fas fa-times" onClick={()=>{deleteQuestion(x.id)}}></i>
        </div>)
        return questionDivs;
    }
  }


  render(){
    const { visible } = this.state;
      if (this.props.userType === 'student') {
        return (
          <div className="container">
            <div className="row fixed-top sidebar" 
                 style={{
                    'height': 80 + 'vh',
                    'width': 30 + 'vw',
                    'display': 'inline-block',
                    'position': 'absolute',
                    'left': 71 + 'vw',
                    'bottom': 12 + 'vh'}}>

              <div>
                <div id="chat_button" onClick={() => this.setView('chat')}>Chat</div>
                <div id="queue_button" onClick={() => this.setView('queue')}>Queue</div>
              </div>

              <div id="queue" className={visible === 'queue' ? '' : 'hide'}>
                <div>{this.appendQuestionDivs()}</div>

                    <input type="text" name="question" id="question" autoComplete="off"/> 
                    <input type="submit" value="Submit" 
                      onClick={()=> {
                      let questionInput = document.getElementById("question").value;
                      this.props.add(questionInput)}}
                      />
              </div>
                    
                <div id="chat_container" className={visible === 'chat' ? '' : 'hide'}>
                  <iframe frameBorder="0" 
                          scrolling="no" 
                          id="chat_embed" 
                          src="https://www.twitch.tv/embed/hebo/chat" 
                          height="100%"
                          width="100%">
                    </iframe>
                  </div>
                </div>
          </div>
        )

      } else {
        
        return (
          <div className="container">
            <div className="row fixed-top sidebar"
                 style={{
                    'height': 80 + 'vh',
                    'width': 30 + 'vw',
                    'display': 'inline-block',
                    'position': 'absolute',
                    'left': 71 + 'vw',
                    'bottom': 12 + 'vh'}}>

              <div>
                <div id="chat_button" onClick={() => this.setView('chat')}>Chat</div>
                <div id="queue_button" onClick={() => this.setView('queue')}>Queue</div>
              </div>

              <div id="queue" className={visible === 'queue' ? '' : 'hide'}>
                <div>{this.appendQuestionDivs()}</div>
              </div>

              <div id="chat_container" className={visible === 'chat' ? '' : 'hide'}>
                <iframe frameBorder="0" 
                        scrolling="no" 
                        id="chat_embed" 
                        src="https://www.twitch.tv/embed/hebo/chat" 
                        height="100%"
                         width="100%">
                  </iframe>
              </div>
            </div>
          </div>
        )
      }

  }
}
