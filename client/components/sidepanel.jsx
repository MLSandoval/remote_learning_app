import React from 'react';
import ExpandedQuestionModal from './expandedQuestionModal';
import socketIOClient from "socket.io-client";

export default class SidePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: 'chat',
      value: '',
      selectedQuestion: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.appendQuestionDivs = this.appendQuestionDivs.bind(this);
    this.showQuestionInput = this.showQuestionInput.bind(this);
    this.resetSelectedQuestion = this.resetSelectedQuestion.bind(this);
    this.handleQuestionAdd = this.handleQuestionAdd.bind(this);
    this.questionAddSocket = this.questionAddSocket.bind(this);
  }

  questionAddSocket(){
    
    let question = this.state.value;
    console.log(' sidepanel questionAddSocket called. question: ', question);
    this.socket.emit('QQadd', question);

  }

  handleQuestionAdd(questionAdd) {
    //make this dynamic at some point
    let studentID = 1;

    this.props.add(questionAdd);

    let question = {
      question: questionAdd,
      studentID
    };
    console.log('handleQuestionAdd (not socket function) question: ', question);

    fetch('http://localhost:3001/addQuestionQ', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question: question.question,
        studentID: question.studentID
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log('qq add fetch success, res: ', res);
      })
      .catch(error => {
        console.error(error);
      });

    this.setState({ value: '' });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  setView(nextActive) {
    if (['chat', 'queue'].indexOf(nextActive) >= 0) {
      this.setState({ visible: nextActive });
    }
  }
  

  appendQuestionDivs() {
    if (this.props.userType === 'student') {
      var questionDivs = this.props.questionQueue.map(x =>
        <li className={this.props.theme === '?darkpopout' ? 'darkbutton list-group-item text-truncate' : 'list-group-item text-truncate'} id={x.id} key={x.id} id={x.id} key={x.id}>
          {x.question} - {x.author}
        </li>)
      return questionDivs;
    } else {
      var questionDivs = this.props.questionQueue.map(x =>
        <li onClick={() => { { this.showQuestionInput(x) } }} className={this.props.theme === '?darkpopout' ? 'darkbutton list-group-item text-truncate' : 'list-group-item text-truncate'} id={x.id} key={x.id}>
          {x.question} - {x.author}
        </li>
      );
      return questionDivs;
    }
  }

  showQuestionInput(data) {
    this.setState({ selectedQuestion: data })
    console.log("Inside question divs: ", data);
  }

  componentDidUpdate() {
  }

  resetSelectedQuestion() {
    this.setState({ selectedQuestion: null })
  }

  componentDidMount(){
    this.socket = socketIOClient('http://0.0.0.0:3001');

    this.socket.on('Qsend', (question)=>{
      console.log('sidepanel component socket listen reached. question: ', question);
      this.handleQuestionAdd(question);
    });
  }

  componentWillUnmount(){
    this.socket.off('Qsend');
  }

  render() {
    const { theme } = this.props;
    const { visible } = this.state;
    if (this.props.userType === 'student') {
      return (
        <div id="sidepanel" className="col-2 container-fluid nopadding fullheight">
          <div className={theme === '?darkpopout' ? 'black row btn-group btn-group-justified col-lg-12 nopadding top' : 'row btn-group btn-group-justified col-lg-12 nopadding top'}>
            <div id="chat_button" className={visible === 'chat' ? 'btn selectedButton' : 'btn lightButton'} onClick={() => this.setView('chat')}>
              <i className="fa fa-comment-o middle" aria-hidden="true"></i>
            </div>
            <div id="queue_button" className={visible === 'queue' ? 'btn selectedButton' : 'btn lightButton'} onClick={() => this.setView('queue')}>
              <i className="fa fa-question middle" aria-hidden="true"></i>
            </div>
          </div>
          <div id="chat_container" className={visible === 'chat' ? 'row col-lg-12 nopadding panel' : 'hide'}>
            <iframe className="col-lg-12 nopadding"
              frameBorder="0"
              scrolling="no"
              src={`https://www.twitch.tv/embed/${this.props.adminData[1]}/chat${this.props.theme}`} />
          </div>
          <div id="queue" className={visible === 'queue' ? '' : 'hide'}>
            <div className={theme === '?darkpopout' ? 'black row col-lg-12 container-fluid nopadding panel lightgrey' : 'row col-lg-12 container-fluid nopadding panel lightgrey'}>
              <div className="col-lg-12 nopadding fullheight QQheightAndScroll">
                {this.appendQuestionDivs()}
              </div>
              <form className="col-lg-12 container-fluid bottomright" onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col-lg-10 p-0">
                  <label>
                    <input
                      className={theme === '?darkpopout' ? "darkInput col-lg-12 p-0" : "col-lg-12 p-0"}
                      type="text"
                      value={this.state.value}
                      onChange={this.handleChange}
                      placeholder="Enter question" />
                  </label>
                  </div>
                  <button className={theme === '?darkpopout' ? "darkInput col-lg-2 p-0" : 'col-lg-2 p-0'} type="submit" onClick={this.questionAddSocket} style={{ 'height': '28px'}}>
                    &gt;
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div id="sidepanel" className="col-2 container-fluid nopadding fullheight">
          <div className={theme === '?darkpopout' ? 'black row btn-group btn-group-justified col-lg-12 nopadding top' : 'row btn-group btn-group-justified col-lg-12 nopadding top'}>
            <div id="chat_button" className={visible === 'chat' ? 'btn selectedButton' : 'btn lightButton'} onClick={() => this.setView('chat')}>
              <i className="fa fa-comment-o middle" aria-hidden="true"></i>
            </div>
            <div id="queue_button" className={visible === 'queue' ? 'btn selectedButton' : 'btn lightButton'} onClick={() => this.setView('queue')}>
              <i className="fa fa-question middle" aria-hidden="true"></i>
            </div>
          </div>

          <div id="chat_container" className={visible === 'chat' ? 'row col-lg-12 nopadding panel' : 'hide'}>
            <iframe className="col-lg-12 nopadding"
              frameBorder="0"
              scrolling="yes"
              src={`https://www.twitch.tv/embed/${this.props.adminData[1]}/chat${this.props.theme}`} />
          </div>
          <div id="queue" className={visible === 'queue' ? '' : 'hide'}>
            <div className={theme === '?darkpopout' ? 'black row col-lg-12 container-fluid nopadding panel lightgrey' : 'row col-lg-12 container-fluid nopadding panel lightgrey'}>
              <div className="col-lg-12 nopadding QQheightAndScroll">
                {this.appendQuestionDivs()}
              </div>
              {this.state.selectedQuestion &&
                <ExpandedQuestionModal
                  resetSelectedQuestion={this.resetSelectedQuestion}
                  questionTarget={this.state.selectedQuestion}
                  deleteStudentQuestion={this.props.delete}
                  theme={this.props.theme}
                />}
            </div>
          </div>
        </div>
      )
    }
  }
}