import React from 'react';

export default class Question extends React.Component{

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
}