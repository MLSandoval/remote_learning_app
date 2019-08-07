import React from 'react';
import ReactDOM from 'react-dom';

export default class SidePanel extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      visible: 'chat',
      value: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.appendQuestionDivs = this.appendQuestionDivs.bind(this);
    this.handleDeleteStudentQuestion = this.handleDeleteStudentQuestion.bind(this);
  }

  handleDeleteStudentQuestion(event){
    console.log('what is studentQuestionID:', event.currentTarget);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  setView(nextActive){
    if(['chat', 'queue'].indexOf(nextActive) >= 0){
      this.setState({ visible: nextActive });
    }
  }

  appendQuestionDivs(){
    if(this.props.userType === 'student') {
          var questionDivs = this.props.questionQueue.map(x =>
            <div className="question" key={x.id}>
            {x.question} - {x.author}
            </div>)
            return questionDivs;
    } else {

        var questionDivs = this.props.questionQueue.map(x =>
          <div className="question nopadding" style={{ 'height': 10 + 'vh' }} key={x.id}>{x.question} - {x.author}
          <i className="fas fa-times" key={x.id} onClick={this.handleDeleteStudentQuestion}></i>
        </div>)
        return questionDivs;
    }
  }


  render(){
    const { visible } = this.state;
    if (this.props.userType === 'student') {
      return (
        <div id="sidepanel" className="col-2 container-fluid nopadding" style={{'height':100 + 'vh'}}>
            <div className="row nopadding" style={{ 'height': 8 + 'vh' }}>
              <div id="chat_button" className="chat-button col-lg-6" onClick={() => this.setView('chat')}>
                <i className="fa fa-comment-o middle" aria-hidden="true"></i>
              </div>
              <div id="queue_button" className="queue-button col-lg-6 nopadding" onClick={() => this.setView('queue')}>
                <i className="fa fa-question middle" aria-hidden="true"></i>
              </div>
            </div>
          <div id="chat_container" className={visible === 'chat' ? 'row col-lg-12 nopadding fullheight' : 'hide'}>
                <iframe className="col-lg-12 nopadding" frameBorder="0" scrolling="no" id="chat_embed" src="https://www.twitch.tv/embed/hebo/chat"/>
          </div>
          <div id="queue" className={visible === 'queue' ? '' : 'hide'}>
            <div className="row col-lg-12 container-fluid nopadding">
              <div className="col-lg-12 nopadding"
                  style={{'height': 85 + 'vh', 'overflow':'scroll'}}>
                  {this.appendQuestionDivs()}</div>
                <form className="col-lg-12 row container-fluid nopadding" onSubmit={this.handleSubmit}>
                  <div className="col-lg-10">
                    <label>
                      <input
                        type="text"
                        value={this.state.value}
                        onChange={this.handleChange}
                        placeholder="Enter question" />
                    </label>
                  </div>
                  <input
                    className="col-lg-2 nopadding"
                    type="submit"
                    value="submit"
                    onClick={() => this.props.add(this.state.value)} />
                </form>
              </div>
            </div>
          </div>
        )
    } else {
      return (
        <div id="sidepanel" className="col-2 container-fluid nopadding" style={{ 'height': 100 + 'vh' }}>
          <div className="row nopadding" style={{ 'height': 8 + 'vh' }}>
            <div className="btn-group btn-group-justified"></div>
              <div id="chat_button" className="btn chat-button col-lg-6" onClick={() => this.setView('chat')}>
                <i className="fa fa-comment-o middle" aria-hidden="true"></i>
              </div>
              <div id="queue_button" className="btn queue-button col-lg-6 nopadding" onClick={() => this.setView('queue')}>
                <i className="fa fa-question middle" aria-hidden="true"></i>
              </div>
          </div>

          <div id="chat_container" className={visible === 'chat' ? 'row col-lg-12 nopadding fullheight' : 'hide'}>
            <iframe className="col-lg-12 nopadding" frameBorder="0" scrolling="no" id="chat_embed" src="https://www.twitch.tv/embed/hebo/chat"/>
          </div>
          <div id="queue" className={visible === 'queue' ? '' : 'hide'}>
            <div className="row col-lg-12 container-fluid nopadding">
              <div className="col-lg-12 nopadding fullheight"
                   style={{ 'height': 85 + 'vh', 'overflow': 'scroll' }}>
                   {this.appendQuestionDivs()}</div>
            </div>
          </div>
        </div>
      )
    }
  }
}
