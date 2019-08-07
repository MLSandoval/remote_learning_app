import React from 'react';
import ReactDOM from 'react-dom';
import ExpandedQuestionModal from './expandedQuestionModal';

export default class SidePanel extends React.Component{
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
    this.showQuestionInput =this.showQuestionInput.bind(this);
    this.resetSelectedQuestion = this.resetSelectedQuestion.bind(this);
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
          <div onClick={()=>{{this.showQuestionInput(x)}}} className="question nopadding" style={{ 'height': 10 + 'vh' }} key={x.id}> 
          {x.question} - {x.author}
            <i className="fas fa-times" onClick={()=>{deleteQuestion(x.id)}}></i>
        </div>
        )
        return questionDivs;
    }
  }

  showQuestionInput(data){
    this.setState({selectedQuestion:data})
    console.log("Inside question divs: ", data);
  }
  
  resetSelectedQuestion() {
    this.setState({ selectedQuestion : null })
  }

  render(){
    console.log('sidepanel props: ', this.props.adminData[1]);
    const { visible } = this.state;
    if (this.props.userType === 'student') {
      return (
        <div id="sidepanel" className="col-2 container-fluid nopadding fullheight">
            <div className="row btn-group btn-group-justified col-lg-12 nopadding" style={{ 'height': 8 + 'vh' }}>
            <div id="chat_button" className="btn btn-primary" onClick={() => this.setView('chat')}>
              <i className="fa fa-comment-o middle" aria-hidden="true"></i>
            </div>
            <div id="queue_button" className="btn btn-primary" onClick={() => this.setView('queue')}>
              <i className="fa fa-question middle" aria-hidden="true"></i>
            </div>
          </div>
          <div id="chat_container" className={visible === 'chat' ? 'row col-lg-12 nopadding fullheight' : 'hide'}>
                <iframe className="col-lg-12 nopadding"
                        frameBorder="0"
                        scrolling="no"
                        // id="mixmstrmike"
                        src={`https://www.twitch.tv/embed/${this.props.adminData[1]}/chat`}/>
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
        <div id="sidepanel" className="col-2 container-fluid nopadding fullheight">
          <div className="row btn-group btn-group-justified col-lg-12 nopadding" style={{ 'height': 8 + 'vh' }}>
            <div id="chat_button" className="btn btn-primary" onClick={() => this.setView('chat')}>
              <i className="fa fa-comment-o middle" aria-hidden="true"></i>
            </div>
            <div id="queue_button" className="btn btn-primary" onClick={() => this.setView('queue')}>
              <i className="fa fa-question middle" aria-hidden="true"></i>
            </div>
          </div>

          <div id="chat_container" className={visible === 'chat' ? 'row col-lg-12 nopadding fullheight' : 'hide'}>
            <iframe className="col-lg-12 nopadding"
                    frameBorder="0"
                    scrolling="yes"
                    // id="mixmstrmike"
                    src={`https://www.twitch.tv/embed/${this.props.adminData[1]}/chat`}/>
          </div>
          <div id="queue" className={visible === 'queue' ? '' : 'hide'}>
            <div className="row col-lg-12 container-fluid nopadding">
              <div className="col-lg-12 nopadding fullheight"
                   style={{ 'height': 85 + 'vh', 'overflow': 'scroll' }}>
                      {this.appendQuestionDivs()}
                      {this.state.selectedQuestion && <ExpandedQuestionModal resetSelectedQuestion={this.resetSelectedQuestion} questionTarget={this.state.selectedQuestion} />}
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}
