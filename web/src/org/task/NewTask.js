import React, { Component } from 'react';
import { Button, Input, FormGroup, Label, Form,Row,Col  } from 'reactstrap';
import cookie from 'react-cookie';
import CreateMaterial from '../libraries/CreateMaterial';
import EditMaterial from './EditMaterialInTask';

class NewTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      material:false,
      questions:[],
      materialflag:false

    };
    this.addTask=this.addTask.bind(this);
    this.materialModel=this.materialModel.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.addMaterial = this.addMaterial.bind(this);
    this.addingMaterialFun=this.addingMaterialFun.bind(this);
    this.questionsdata =this.questionsdata.bind(this);
    this.material = this.material.bind(this);
    this.resetaction = this.resetaction.bind(this);
    this.createTask = this.createTask.bind(this);

  }

  handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
  }

  addingMaterialFun(obj){
   const taskObj={};
    taskObj.task_title=this.state.task_name;
    taskObj.description=this.state.description;
    taskObj.type = obj.type;
    taskObj.modified_user=cookie.load('org_obj').user_id;
    taskObj.user_id = cookie.load('org_obj').user_id;
    taskObj.created_user = cookie.load('org_obj').user_id;
    taskObj.organization_id = cookie.load('org_obj').org_id;
    if(obj.type == 'Quiz'){
     taskObj.questions = this.state.questions;
     taskObj.points=100;

    }else if(obj.type == 'Reflection'){
      taskObj.question=obj.question;
    } else {
    taskObj.title = obj.title;
    taskObj.author = obj.author;
    taskObj.estimated_time = obj.estimated_time;
    taskObj.url = obj.url;
    taskObj.hero_image = obj.hero_image;
    taskObj.content = obj.content;

    }
    this.props.addNewTaskWithNewmaterial(taskObj);
    this.setState({materialflag:false,material:false,questions:[]});
  }

  addTask(object){
    const taskObj={};
    taskObj.task_title=this.state.task_name;
    taskObj.task_description=this.state.description;
    taskObj.points=100;
    taskObj.material_id=this.props.materialId;
    taskObj.created_user=cookie.load('org_obj').user_id;
    taskObj.modified_user=cookie.load('org_obj').user_id;
    taskObj.user_id = cookie.load('org_obj').user_id;
    taskObj.material_title = object.title;
    taskObj.content = object.content;
    taskObj.author = object.author;
    taskObj.hero_image = object.hero_image;
    taskObj.estimated_time = object.estimated_time;
    taskObj.questions = object.questions;
    taskObj.material_type = object.material_type;
    taskObj.question = object.question;
    if(this.state.taskId){
      taskObj.task_id=this.state.taskId;
    }

    this.props.addNewTask(taskObj);

  }
  createTask(e){
  e.preventDefault();
   const taskObj={};
    taskObj.title=this.state.task_name;
    taskObj.description=this.state.description;
    taskObj.points=100;
    taskObj.material_id=this.props.materialId;
    taskObj.created_user=cookie.load('org_obj').user_id;
    taskObj.modified_user=cookie.load('org_obj').user_id;
    if(this.state.taskId){
      taskObj.id=this.state.taskId;
    }

    this.props.addNewTask(taskObj);
  }
  materialModel(event){
    event.preventDefault();
    const obj={};
    obj.tasktitle=this.state.task_name;
    obj.taskdescription=this.state.taskdescription;
    this.props.existingMaterial(obj);
  }
  addMaterial(e){
    e.preventDefault();
    this.setState({'material':true});
  }
  questionsdata(questions){
    const questiondata = questions.map((obj) => {
      return obj.answer = obj.options[0].option;
    });
    console.log(questiondata);
    this.setState({questions:JSON.stringify(questions)});

  }
  componentWillReceiveProps(props) {
    this.setState({
      'task_name':props.tasktitle,
      'taskId':props.taskId,
      'description':props.taskdescription,
      'materialId':props.materialId,
      'hero_image':props.hero_image,
      'materialobj':props.materialobject,
      'formStatusTask':props.formStatusTask,
      'material':false,
      'materialflag':(props.formStatusTask == 'edit')? true : false,
      'material_type':props.material_type
    });
  }
  material (){
    this.setState({materialflag:true,questions:[]});

  }
  resetaction(){
    this.setState({
      task_name:'',
      description:'',
      materialflag:false,
      material:false
    });
  }
  render() {
     return (
      <div>
    <Form>
     <FormGroup>
      <Label for="task_name">Title</Label>
      <Input type="text" name="task_name" disabled={this.state.materialflag} value={this.state.task_name} onChange={this.handleChange}/>
    </FormGroup>
    <FormGroup>
      <Label for="description">Task Description</Label>
      <Input type="textarea" name="description"  value={this.state.description} onChange={this.handleChange}/>
    </FormGroup>
    <FormGroup>
      <Label for="exampleEmail">XP: <b>100</b></Label>
    </FormGroup>
    <FormGroup>
    <div className="pt-1 text-right text-muted font-italic">*Additional Content</div>
     <div className="mt-3">
      <Button size="lg" color="primary" disabled={this.state.materialflag} onClick={this.addMaterial}>Add New Material</Button>{' '}
      <Button size="lg" color="primary" disabled={this.state.materialflag} onClick={this.materialModel}>Select from Library*</Button>{' '}
      {this.props.formStatusTask == 'create' ? <Button size="lg" color="primary" className={this.state.hero_image ? '' : 'hide'} onClick={this.createTask}>Create</Button>:''}{' '}
     {this.props.formStatusTask == 'create' ? <Button size="lg" color="cancel" className={this.state.hero_image ? '' : 'hide'}>Cancel</Button>: ''}
    </div>
    </FormGroup>
    </Form>

    <section className="course-body">
      <Row>
        <Col>
        {this.props.formStatusTask == 'create'?
        <div className={this.state.material? "show p-0":"hide"}>
        <CreateMaterial quizCount={this.props.quizCount} resetClick={this.resetaction}
        reflectionCount={this.props.reflectionCount}
        from="tasks" materialshow={this.state.materialflag}
        materialaction={this.material}
        addMaterialsToTask={this.addingMaterialFun}
        questionslist={this.questionsdata}/>
        </div>
        : <EditMaterial materialdata={this.state.materialobj} title={this.state.title} content={this.state.content}
        author={this.state.author} material_type={this.state.material_type} estimated_time={this.state.estimated_time}  updateMaterialdata={this.addTask}/>
         }
        </Col>

      </Row>
    </section>
  </div>
    );
  }
}



export default NewTask;
