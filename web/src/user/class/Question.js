import React,{Component} from 'react';
import Isvg from 'react-inlinesvg';
import {Button} from 'reactstrap';
import $ from 'jquery';
import cookie from 'react-cookie';
class Question extends Component{
  constructor(props){
    super(props);
    this.state = {
      count:0,
      optioncount:2,
      score:0,
      materialflag:true

    };
    this.opionsdata = this.opionsdata.bind(this);
    this.optionClick = this.optionClick.bind(this);
    this.questiondata =this.questiondata.bind(this);
    this.nextAnswer = this.nextAnswer.bind(this);
    this.submit = this.submit.bind(this);
  }
  optionClick(e){
    if(this.state.optioncount >0){
    this.setState({
      optioncount:this.state.optioncount - 1
    });
  }
  const option = JSON.parse(e.target.getAttribute('data-obj'));
  const key = e.target.getAttribute('data-key');
   const answer = e.target.getAttribute('data-answer');
   if(answer == option.option){
    $('li').each(function(){
      if($(this).hasClass('is-wrong')){
        $(this).removeClass('is-wrong');
        $(this).addClass('is-tried');
      }
    });
    $('.'+key).addClass('is-selected');
    this.setState({score:this.state.score+10});
   }
   else{
    if(this.state.optioncount == 2 ){
     $('.'+key).addClass('is-wrong');
    }
    else {
        $('li').each(function(){
          if($(this).hasClass('is-wrong')){
            $(this).removeClass('is-wrong');
            $(this).addClass('is-tried');
          }
        });
        $('.'+key).addClass('is-wrong');
      }
    }
  }
  opionsdata(options,answer){
    let optionarray = JSON.parse(options);
    let optionData = optionarray.map((obj,index) =>{
      return(
      <li key={index} className={index} disabled={this.state.optioncount == 0} data-key={index} data-answer={answer} data-obj={JSON.stringify(obj)} onClick={this.optionClick}>{obj.option}</li>
      );
    });
    return optionData;
  }
  questiondata(obj,count){
  return (
      <div key={count}>
        <div className="actions-wrapper-question">
        {obj.question}
        </div>
        <div className="actions-wrapper-answer">
          <ul className="actions-wrapper-answer-list">

          {this.opionsdata(obj.options,obj.answer)}
          </ul>
        </div>
      </div>
    );
  }
  nextAnswer(e){
    e.preventDefault();
    let num = this.state.count;
    this.setState({
      count:num + 1,
      optioncount:2
    });
  }
  submit(e){
    e.preventDefault();
    const obj={};
    obj.score = this.state.score;
    obj.user_id =cookie.load('user_obj').user_id;
    obj.quiz_id = this.props.quizdata[0].quiz_id;
    let data = this;
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: ' /api/quiz/savequizscores',
        dataType: "json",
        data : JSON.stringify(obj),
        success: function(response) {
          if(response){
            console.log(response.result);
            data.setState({materialflag:false});
            data.props.materialFlag(true);
          }
        }
      });

  }
  render(){
    const questions = this.props.quizdata || [];
    console.log(questions);
    return(
    <div>
    {this.state.materialflag ?
    <div>
      <div className="actions-wrapper-note">
        {this.state.optioncount == 2 ?
          <p>Only {this.state.optioncount} tries per question. XP gets halfed on the second try.</p>:
           <p>you have {this.state.optioncount} trie(s) left for this question.</p>}
      </div>
      {questions.length > 0 ?
      <div className="actions-wrapper-content">
      {this.questiondata(questions[this.state.count],this.state.count)}
      <div className="actions-wrapper-submit d-flex justify-content-between align-items-center">
        <span>XP <b>{this.state.score}</b></span>
          <div className="d-inline-block">
            <span className="mr-3">{this.state.count+1}/{questions.length}</span>
            {this.state.count+1 == questions.length ?<Button size="sm" color="primary" className="d-inline-block btn-start" onClick={this.submit}>
              <Isvg src="/assets/icon-check-white.svg" />Submit
            </Button>:
            <Button size="sm" color="primary" className="d-inline-block btn-start" onClick={this.nextAnswer}>
              <Isvg src="/assets/icon-answer-next.svg" />Answer
            </Button>}
          </div>
        </div>
      </div> : ''}
    </div>:
    <div>
    <div className="actions-wrapper-note">
      <h3>Congratulations!</h3>
      <p className="text-muted">You've Successfully Submitted this task. Your rewards is:</p>
      <h2>{this.state.score} XP</h2>
    </div>

    </div>
     }
    </div>
    );
  }
}
export default Question;
