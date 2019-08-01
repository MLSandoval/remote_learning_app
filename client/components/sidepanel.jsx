import React from 'react';
import ReactDOM from 'react-dom';

export default class SidePanel extends React.Component{

  constructor(props) {
    super(props);

    this.appendQuestionDivs = this.appendQuestionDivs.bind(this);

    this.state = {visible: 'chat',
                  value: ''}

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }


  handleChange(event) {
    this.setState({ value: event.target.value })
    console.log('handleChange state: ', this.state.value);
  }

  setView(nextActive){
    console.log('click');
    if(['chat', 'queue'].indexOf(nextActive) >= 0){
      this.setState({ visible: nextActive });
    }
  }


  appendQuestionDivs(){
    let deleteQuestion = this.props.delete;
    if(this.props.userType === 'student') {
          var questionDivs = this.props.data.map(x =>  // change these variable names
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
    console.log('this.state: ',this.state);
    const { visible } = this.state;
    if (this.props.userType === 'student') {
      return (
        <div id="sidepanel" className="col-lg-3 container-fluid nopadding" style={{'height':100 + 'vh'}}>


            <div className="row nopadding" style={{ 'height': 8 + 'vh' }}>
              <div id="chat_button" className="col-lg-6 clickable border" onClick={() => this.setView('chat')}>Chat</div>
              <div id="queue_button" className="col-lg-6 clickable border" onClick={() => this.setView('queue')}>Queue</div>
            </div>


          <div id="chat_container" className={visible === 'chat' ? 'row col-lg-12 nopadding fullheight' : 'hide'}>
                <iframe className="col-lg-12 nopadding" frameBorder="0" scrolling="no" id="chat_embed" src="https://www.twitch.tv/embed/hebo/chat">
                </iframe>
              </div>

          <div id="queue" className={visible === 'queue' ? '' : 'hide'}>
            <div className="row col-lg-12 container-fluid nopadding">

                  <div className="col-lg-12 nopadding" style={{'height': 85 + 'vh', 'overflow':'scroll'}}>{
                    this.appendQuestionDivs()}
                  </div>


              <form className="col-lg-12 row" onSubmit={this.handleSubmit}>
                <label>
                  <input type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                    placeholder="Enter question" />
                </label>
                <input type="submit"
                  value="submit" onClick={() => this.props.add(this.state.value)} />
              </form>

              </div>
            </div>

      </div>
    )
  } else {
      return (
        <div id="sidepanel" className="col-lg-3 container-fluid nopadding" style={{ 'height': 100 + 'vh' }}>


          <div className="row nopadding" style={{ 'height': 8 + 'vh' }}>
            <div id="chat_button" className="col-lg-6 clickable border" onClick={() => this.setView('chat')}>Chat</div>
            <div id="queue_button" className="col-lg-6 clickable border" onClick={() => this.setView('queue')}>Queue</div>
          </div>


          <div id="chat_container" className={visible === 'chat' ? 'row col-lg-12 nopadding fullheight' : 'hide'}>
            <iframe className="col-lg-12 nopadding" frameBorder="0" scrolling="no" id="chat_embed" src="https://www.twitch.tv/embed/hebo/chat">
            </iframe>
          </div>

          <div id="queue" className={visible === 'queue' ? '' : 'hide'}>
            <div className="row col-lg-12 container-fluid nopadding">

              <div className="col-lg-12 nopadding" style={{ 'height': 50 + 'vh', 'overflow': 'scroll' }}>{
                this.appendQuestionDivs()}
              </div>


              <div className="col-lg-12 row">
              </div>

            </div>
          </div>

        </div>
      )
    }
  }
}
