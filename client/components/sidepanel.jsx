import React from 'react';

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
    this.handleQuestionAdd = this.handleQuestionAdd.bind(this);
  }

  handleQuestionAdd(event){
    //make this dynamic at some point
    let studentID = 1;

    this.props.add(this.state.value);

    let question = {
      question: this.state.value,
      studentID
    };
    console.log('handleQuestionAdd question: ', question);

    fetch('http://localhost:3001/addQuestionQ',{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question: question.question,
        studentID: question.studentID
      })
    })
    .then(res=> res.json())
    .then(res=>{
      console.log('qq add fetch success, res: ', res);
    })
    .catch(error=>{
      console.error(error);
    });

    this.setState({value: ''});
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
    let deleteQuestion = this.props.delete;
    if(this.props.userType === 'student') {
      var questionDivs = this.props.questionQueue.map(x =>
        <div className="question" id={x.id} key={x.id}>
          {x.question} - {x.author}
r        </div>
        );

        return questionDivs;
    } else {
      var questionDivs = this.props.questionQueue.map(x =>
        <div className="question nopadding" style={{ 'height': 6 + 'vh' }} id={x.id} key={x.id}>
          {x.question} - {x.author}
          <i className="fas fa-times" onClick={()=>{deleteQuestion(x.id)}}></i>
        </div>
      );

      return questionDivs;
    }
  }

  render(){
    const { visible } = this.state;
    if (this.props.userType === 'student') {
      return (
        <div id="sidepanel" className="col-2 container-fluid nopadding fullheight">
            <div className="row btn-group btn-group-justified" style={{ 'height': 8 + 'vh' }}>
              <div id="chat_button" className="btn chat-button" onClick={() => this.setView('chat')}>
                <i className="fa fa-comment-o middle" aria-hidden="true"></i>
              </div>
              <div id="queue_button" className="btn queue-button" onClick={() => this.setView('queue')}>
                <i className="fa fa-question middle" aria-hidden="true"></i>
              </div>
            </div>
          <div id="chat_container" className={visible === 'chat' ? 'row col-lg-12 nopadding fullheight' : 'hide'}>
                <iframe className="col-lg-12 nopadding" frameBorder="0" scrolling="no" id="chat_embed" src="https://www.twitch.tv/embed/hebo/chat"/>
          </div>
          <div id="queue" className={visible === 'queue' ? '' : 'hide'}>
            <div className="row col-lg-12 container-fluid nopadding">
              <div className="col-lg-12 nopadding fullheight QQheightAndScroll">
                {this.appendQuestionDivs()}</div>
              <form className="col-lg-12 row container-fluid" onSubmit={this.handleSubmit}>
                <div className="col-lg-11">
                  <label>
                    <input
                      type="text"
                      value={this.state.value}
                      onChange={this.handleChange}
                      placeholder="Enter question" />
                  </label>
                </div>
                <input
                  className="col-lg-1 nopadding"
                  type="submit"
                  value="Add"
                  onClick={this.handleQuestionAdd} />
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
            <iframe className="col-lg-12 nopadding" frameBorder="0" scrolling="no" id="chat_embed" src="https://www.twitch.tv/embed/hebo/chat"/>
          </div>
          <div id="queue" className={visible === 'queue' ? '' : 'hide'}>
            <div className="row col-lg-12 container-fluid nopadding">
              <div className="col-lg-12 nopadding QQheightAndScroll"
                   style={{ 'height': 76 + 'vh', 'overflow': 'scroll' }}>
                   {this.appendQuestionDivs()}</div>
            </div>
          </div>
        </div>
      )
    }
  }
}