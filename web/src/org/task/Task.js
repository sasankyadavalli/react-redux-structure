import React, { Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CoursePage from './CoursePage';
import { Button, Modal, ModalHeader} from 'reactstrap';
import {Tab,Tabs,TabPanel,TabList} from 'react-tabs';
import * as actions from '../common/actions/index';
//import {Link} from 'react-router';
import NewTask from './NewTask';
import NewAction from './NewAction';
import TaskList from './TaskList';
let _ = require('lodash');
import cookie from 'react-cookie';
import SelectMaterial from './SelectMaterialForm';
import $ from 'jquery';
//import toastr from 'toastr';

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      showCreateForm:false,
      formStatusT:'create',
      formStatusA:'create',
      actions_count:0,
      quiz_count:0,
      reflection_count:0,
      class_status:'published'
    };
    this.addNewActions=this.addNewActions.bind(this);
    this.editActionElement=this.editActionElement.bind(this);
    this.toggle=this.toggle.bind(this);
    this.selectedMaterial=this.selectedMaterial.bind(this);
    this.addTaskNew=this.addTaskNew.bind(this);
    this.editTaskElement=this.editTaskElement.bind(this);
    this.showCreateForm=this.showCreateForm.bind(this);
    this.taskWithNewmaterial=this.taskWithNewmaterial.bind(this);

  }

  componentDidMount() {
    this.props.actions.viewCourse(this.props.params.courseId);
    this.props.actions.getAllActions(this.props.params.id);
    this.props.actions.getAllTasks(this.props.params.id);
    this.props.actions.getAllMaterials(cookie.load('org_obj').org_id);
    $.post('/api/class/'+this.props.params.classId+'').done((response) =>{
       this.setState({'class_status':response.result.status});
    });
    $.post('/api/lesson/'+this.props.params.id+'').done((response) =>{
       this.setState({'lesson_name':response.result.name,'actions_count':response.result.actions_count,'quiz_count':response.result.quiz_count,'reflection_count':response.result.reflection_count});
    });
  }

  showCreateForm(event){
    event.preventDefault();
    this.setState({'showCreateForm':true,formStatusT:'create',formStatusA:'create'});
    this.setState({'description':'','action_id':''});
    this.setState({'taskTitle':'','taskId':'','taskDescription':'','materialId':'','heroImage':''});
  }
  addNewActions(obj){
    obj.lesson_id=this.props.params.id;
    if(obj.id){
    this.props.actions.updateAction(obj);
    }else{
      this.setState({'actions_count':1});
    this.props.actions.createAction(obj);
    }
  }
  addTaskNew(obj){
    obj.lesson_id=this.props.params.id;
    if(obj.task_id){
      if(obj.material_type == 'Quiz'){
        this.props.actions.updateQuizTask(obj);
      }else if(obj.material_type == 'Reflection'){
        this.props.actions.updateReflectionTask(obj);
      }else{
        this.props.actions.updateTask(obj);
      }
    }else{
    this.props.actions.createTask(obj);
    }
  }
  taskWithNewmaterial(obj){
    obj.lesson_id = this.props.params.id;
    if(obj.type == 'Quiz'){
      this.setState({'quiz_count':1});
      console.log(obj);
    this.props.actions.createQuiz(obj);
    }
    else if(obj.type == 'Reflection'){
      this.setState({'reflection_count':1});
      this.props.actions.createReflection(obj);
    } else{
      this.props.actions.createMaterialInTask(obj);
    }
  }

  editActionElement(action_id){
    this.setState({'showCreateForm':true});
     const actionObj=_.find(this.props.actionsList,{'id':parseInt(action_id)});
     this.setState({'description':actionObj.description,'action_id':actionObj.id,'formStatusA':'edit'});
  }
  editTaskElement(task_id){
    this.setState({'showCreateForm':true});
     const taskObj=_.find(this.props.tasksList,{'id':parseInt(task_id)});
     var materialObj=_.find(this.props.materials,{'id':parseInt(taskObj.material_id)});
     if(materialObj){
        this.setState({
          'taskTitle':taskObj.title,
          'taskId':taskObj.id,
          'taskDescription':taskObj.description,
          'materialId':taskObj.material_id,
          'heroImage':materialObj.hero_image,
          'formStatusT':'edit',
          'materialObj':materialObj,
          'material_type':taskObj.material_type
        });
   }else if(taskObj.material_type == 'Quiz'){
    let data= this;
      $.ajax({
        type: "GET",
        contentType: "application/json",
        url: '/api/quiz/task/getquizdetails?task_id=' + taskObj.id,
        dataType: "json",
        success: function(response) {
          if(response){
              data.setState({
                'materialObj':response.result,
                'taskTitle':taskObj.title,
                'taskId':taskObj.id,
                'taskDescription':taskObj.description,
                'formStatusT':'edit',
                'material_type':taskObj.material_type
              });
            }
          }
      });

   }else if(taskObj.material_type == 'Reflection'){
    let data= this;
      $.ajax({
        type: "GET",
        contentType: "application/json",
        url: '/api/tasks/reflection/getReflectionDetails/' + taskObj.id,
        dataType: "json",
        success: function(response) {
          if(response){
            console.log(response.result);
            data.setState({
              'materialObj':response.result[0],
              'taskTitle':taskObj.title,
              'taskId':taskObj.id,
              'taskDescription':taskObj.description,
              'formStatusT':'edit',
              'material_type':taskObj.material_type
            });
          }
        }
      });
   }
  }
  selectedMaterial(material_id){
    var materialObj=_.find(this.props.materials,{'id':parseInt(material_id)});
    this.setState({'heroImage':materialObj.hero_image,'materialId':materialObj.id});
    this.toggle();
  }

  toggle(obj) {
    if(obj){
      this.setState({
      'taskTitle': obj.tasktitle,
      'taskDescription': obj.taskdescription,
    });
    }
    this.setState({
      modal: !this.state.modal,
    });
  }
  componentWillReceiveProps(props){
    if(props.tasksList){
      this.setState({
      'taskTitle': '',
      'taskDescription': '',
      'taskId':'',
      'materialId':'',
      'heroImage':''
    });
    }
    if(props.actionsList){
      this.setState({
      'action_id': '',
      'description': ''
    });
    }
  }
  render() {
    return (
    <CoursePage courseId={this.props.params.courseId} classId={this.props.params.classId}>
      <Modal isOpen={this.state.modal} toggle={this.toggle} className="auto">
        <ModalHeader toggle={this.toggle}>Select Material</ModalHeader>
        <SelectMaterial material_selected={this.selectedMaterial} materials={this.props.materials}/>
      </Modal>

      <div className="course-page">
        <aside className="course">
          <div className="course-title">
            <div className="course-title-status">{this.state.class_status}</div>
            <h4>{this.props.viewcourses.name}</h4>
            <div className="course-title-description">{this.state.lesson_name}</div>
          </div>
          {this.state.class_status == 'published' ? '' :
          <div className="course-action"> <Button block size="lg" color="primary" onClick={this.showCreateForm}>New Task/ New Action</Button></div>}
          <TaskList editActionElement={this.editActionElement} actionsList={this.props.actionsList} editTaskElement={this.editTaskElement} tasksList={this.props.tasksList} material={false}/>
        </aside>
        <div className={!this.state.showCreateForm ? 'hide' : ''}>
        <div className="course-page-body">
          <section className="course-body pl-6 pr-6">
            <Tabs>

            <TabList>
              <Tab>New Task</Tab>
              <Tab>New Action</Tab>
            </TabList>
            <TabPanel>
              <NewTask quizCount={this.state.quiz_count}
               reflectionCount={this.state.reflection_count}
               formStatusTask={this.state.formStatusT}
                addNewTaskWithNewmaterial={this.taskWithNewmaterial}
                existingMaterial={this.toggle}
                hero_image={this.state.heroImage}
                 materialId={this.state.materialId}
                  taskdescription={this.state.taskDescription}
                  tasktitle={this.state.taskTitle}
                  taskId={this.state.taskId}
                  materialobject={this.state.materialObj}
                  addNewTask={this.addTaskNew}
                  material_type = {this.state.material_type}/>
            </TabPanel>
            <TabPanel>
              <NewAction actinonsCount={this.state.actions_count} formStatusAction={this.state.formStatusA} actionId={this.state.action_id} description={this.state.description} addNewAction={this.addNewActions}/>
            </TabPanel>
          </Tabs>
          </section>
          </div>
        </div>
      </div>
    </CoursePage>
    );
  }
}



function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    viewcourses: state.courseView,
    actionsList:state.actions,
    materials : state.materials,
    tasksList:state.tasks,
    auth:state.auth
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Task);
