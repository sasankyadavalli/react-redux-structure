import React, { Component} from 'react';
import {connect} from 'react-redux';
import { Row, Col, Button, FormGroup, Input } from 'reactstrap';
import Isvg from 'react-inlinesvg';
import cookie from 'react-cookie';


class ClassRoom extends Component {

  constructor(props) {
    super(props);
    this.state={
      activeLessonObj:{},
      activeTaskObj:{},
      showLessonPoints:'hide',
      overlay:true,
      showClassPoints:'hide'
    };
    this.taskTypeIcon=this.taskTypeIcon.bind(this);
    this.readTaskMaterial=this.readTaskMaterial.bind(this);
    this.showlessonpoints=this.showlessonpoints.bind(this);
    this.takeAction=this.takeAction.bind(this);
    this.actionSubmit=this.actionSubmit.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.showClasspoints=this.showClasspoints.bind(this);
  }

  handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
  }

  showClasspoints(){
    this.setState({'showClassPoints':'show'});
  }

  actionSubmit(obj){
    const actionObj = {};
    actionObj.action_id = obj.action_id;
    actionObj.user_id = cookie.load('user_obj').user_id;
    actionObj.action_response = this.state.action_responce;
    actionObj.modified_user =cookie.load('user_obj').user_id;
    actionObj.lesson_id=obj.lesson_id;
    this.props.updateActions(actionObj);
  }

  readTaskMaterial(task_obj){
   this.props.readMaterial(task_obj);
  }
  takeAction(event){
    event.preventDefault();
    this.setState({'overlay':!this.state.overlay});
  }
  showlessonpoints(){
    this.setState({'showLessonPoints':'show'});
  }

  taskTypeIcon(material_type){
    if(material_type == 'Video'){
      return(
        <div>
        <img className="mb-2" src="/assets/video-white.svg"/>
                <p>Watch video</p>
                </div>
        );
    }
    if(material_type == 'PDF'){
      return(
        <div>
        <img className="mb-2" src="/assets/pdf-white.svg"/>
                <p>Read a pdf</p>
                </div>
        );
    }
    if(material_type == 'Link'){
      return(
        <div>
        <img className="mb-2" src="/assets/link-white.svg"/>
                <p>See the link</p>
                </div>
        );
    }
    if(material_type == 'Article'){
      return(
        <div>
        <img className="mb-2" src="/assets/article-white.svg"/>
                <p>Read an article</p>
                </div>
        );
    }
    if(material_type == 'Editor'){
      return(
        <div>
        <img className="mb-2" src="/assets/editor-white.svg"/>
                <p>Read an article</p>
                </div>
        );
    }
    if(material_type == 'Quiz'){
      return(
        <div>
        <img className="mb-2" src="/assets/quiz-white.svg"/>
                <p>Take a quiz</p>
                </div>
        );
    }
    if(material_type == 'Reflection'){
      return(
        <div>
        <img className="mb-2" src="/assets/reflection-white.svg"/>
                <p>Take a reflection</p>
                </div>
        );
    }
    if(material_type == 'Podcast'){
      return(
        <div>
        <img className="mb-2" src="/assets/audio-white.svg"/>
                <p>Listion the audio</p>
                </div>
        );
    }

  }

  render() {
    return (
    <div className={this.props.classListStatus ? "classroom-wrapper w-50" : "classroom-wrapper"}>
      {this.props.lessonCompleted == 'completed' ?
      <div className="classroom-header is-completed" >
      {this.state.showLessonPoints == 'show' ?
       <div>
         <img src="/assets/icon-check-white.svg"/>
         <h6 className="mt-2">{this.props.activeLesson.lesson_total_points} XP earned</h6></div>
      :
      <div onClick={this.showlessonpoints}>
        <label>Lesson</label>
        <h1>{this.props.activeLesson.lesson_order}. {this.props.activeLesson.lesson_name}</h1>
        <img src="/assets/icon-check-white.svg"/></div>
        }
      </div>
      :
      <div className="classroom-header">
        <label>Lesson</label>
        <h1>{this.props.activeLesson.lesson_order}. {this.props.activeLesson.lesson_name}</h1>
        <p>{this.props.activeLesson.lesson_description}</p>
        {this.props.classDetails.class_status == 'completed' ?
        <div className="classroom-header-completed">
          <span>COMPLETED •</span>
          <span>{this.props.classDetails.class_total_points} earned</span>
        </div>
        : ''}
      </div>
    }



      <div className="classroom-content">
      {this.props.activeAction && this.props.activeAction.action_id ?
        <h1 className="classroom-content-title">{this.props.activeLesson.lesson_order}.{this.props.activeAction.action_order} Action Time</h1>
        :
        <h1 className="classroom-content-title">{this.props.activeLesson.lesson_order}.{this.props.activeTask.task_order} {this.props.activeTask.task_name}</h1>
      }
      <div className="classroom-scroller">
            <div>
              <Isvg src="/assets/classroom-arrow-up.svg"></Isvg>
            </div>
            <div>
              <Isvg src="/assets/classroom-arrow-down.svg"></Isvg>
            </div>
          </div>

        <Row>
         {this.props.activeAction && this.props.activeAction.action_id ?
          <Col md="10" lg="10" xl="8" className="mx-auto">

           <div className={this.state.overlay ? "actions-wrapper" : "actions-wrapper in-progress"} >
           {this.state.overlay ?
            <div className="actions-wrapper-overlay">
              <div className="take-action" onClick={this.takeAction}>
                <Isvg src="/assets/icon-actions.svg"></Isvg>
                <p>Take an action</p>
              </div>
            </div>: ''}
            <div className="actions-wrapper-header">
              <div className="actions-wrapper-header-name">05 - Action Time!</div>
              <div className="actions-wrapper-header-actions">
                <span className="report-bug"><Isvg src="/assets/icon-report-bug.svg"></Isvg> Report a bug</span>
                <span onClick={this.takeAction}><Isvg src="/assets/icon-close.svg" ></Isvg></span>
              </div>
            </div>
            <div className="actions-wrapper-content">
              <div className="actions-wrapper-question">
              {this.props.activeAction.action_description}
              </div>
              <div className="actions-wrapper-answer">
                <FormGroup>
                  <Input type="textarea" name="action_responce" placeholder="Reflect on this expirence to complete this action.." value={this.state.action_responce} onChange={this.handleChange} />
                </FormGroup>
                <small className="text-danger">Please input at least 100 characters</small>
              </div>
              <div className="actions-wrapper-submit float-right">
                <Button size="sm" color="primary" className="btn-start" onClick={this.actionSubmit.bind(this,this.props.activeAction)}>
                  <Isvg src="/assets/icon-check-white.svg"></Isvg>Submit
                </Button>
              </div>
            </div>
          </div>


          </Col>
          :
          <Col md="10" lg="10" xl="7" className="mx-auto">
          {this.props.completedTaskId == this.props.activeTask.task_id ?
            <div className="classroom-content-material-completed">
              <div>
                <h3>Congratulations!</h3>
                <p className="text-muted">You've successfully completed this task. Your rewards is:</p>
                <h2>{this.props.activeTask.task_points} XP</h2>
              </div>
            </div>
          :<div className={this.props.activeTask.task_status == 'completed' ? "classroom-content-material is-completed" : "classroom-content-material"} >
              <div onClick={this.readTaskMaterial.bind(this,this.props.activeTask)}>
                {this.taskTypeIcon(this.props.activeTask.material_type)}

                <div className={this.props.activeTask.bookmarked == 1 ? "bookmark is-active" : "bookmark"}><Isvg src="/assets/icon-bookmark-white.svg"></Isvg></div>
                <div className="time">
                  <Isvg src="/assets/article-time.svg"></Isvg>
                  <span className="ml-2">2 min read</span>
                </div>
              </div>
            </div>}
          </Col>
        }
        </Row>
        {this.props.activeAction && this.props.activeAction.action_id ? '':
        <Row>
          <Col md="8" className="mx-auto mt-2">
            <p className="text-muted">Watch the below video from Joe to learn more about what Empathetic Leadership is.
There is a second row here too</p>
          </Col>
        </Row>
       }

      </div>
    </div>

    );
  }
}


function mapStateToProps() {
  return {

  };
}


export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(ClassRoom);
