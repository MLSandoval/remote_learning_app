import React from 'react';
import ReactDOM from 'react-dom';

export default class SidePanel extends React.Component{

  constructor(props) {
    super(props);

    this.appendQuestionDivs = this.appendQuestionDivs.bind(this);
  }

  componentDidUpdate() {
     console.log('1)sidepanel state: ', this.props.data);
  }

  showQueue() {
  document.getElementById('chat_embed').hidden = true;
}

  showChat() {
  document.getElementById('chat_embed').hidden = false;
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
          <div className="question nopadding" style={{ 'height': 10 + 'vh' }} key={x.id}>{x.question} - {x.author}
          <i className="fas fa-times" onClick={()=>{deleteQuestion(x.id)}}></i>
        </div>)
        return questionDivs;
    }
  }


  render(){
    return (
      <div id="sidepanel" className="col-lg-3 container-fluid nopadding" style={{'height':100 + 'vh'}}>


          <div className="row nopadding" style={{ 'height': 8 + 'vh' }}>
            <div id="chat_button" className="col-lg-6 clickable border" onClick={this.showChat}>Chat</div>

            <div id="queue_button" className="col-lg-6 clickable border" onClick={this.showQueue}>Queue</div>
          </div>


          <div id="chat_container" className="row col-lg-12 nopadding">
            <iframe className="col-lg-12 nopadding" frameBorder="0" scrolling="no" id="chat_embed" src="https://www.twitch.tv/embed/hebo/chat">
            </iframe>
          </div>

          <div id="queue" className="row col-lg-12 container-fluid nopadding">

              <div className="col-lg-12 nopadding" style={{'height': 74 + 'vh', 'overflow':'scroll'}}>{
                this.appendQuestionDivs()}
              </div>


              <div className="col-lg-12 row">
                <input className="col-lg-11 nopadding" id="question" type="text" name="question"></input>
                <input className="col-lg-1 nopadding" type="submit" value="&gt;" onClick={() => {
                  let questionInput = document.getElementById("question").value
                  this.props.add(questionInput)
                }}></input>
              </div>

          </div>

      </div>
    )
  }
}
