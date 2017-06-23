import React,{Component,PropTypes} from 'react';
import {ModalBody, Button} from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../libraries/actions/index';
import MaterialType from './MaterialType';
import Isvg from 'react-inlinesvg';
import Quiz from '../../class/Quiz';
import Reflection from '../../class/Reflection';


class ViewMaterial extends Component{
  constructor(props){
    super(props);
    this.state = {
      modal:false

    };
    this.renderform =this.renderform.bind(this);
    this.completeTask=this.completeTask.bind(this);
    this.materialflag = this.materialflag.bind(this);
  }
  materialflag(flag){
    this.setState({materialFlag:flag});
    this.props.materialFlag(flag);
  }
  renderform(materialObj){
    if(materialObj.material_type == 'Quiz'){

      return (<Quiz materialobj= {materialObj} materialflag={this.materialflag}/> );

    }else if(materialObj.material_type == 'Reflection'){

      return (<Reflection materialobj={materialObj}  materialflag={this.materialflag} />);

    }else{

      if(materialObj.material_type == 'Video'){
        materialObj.url = materialObj.url.replace("watch?v=", "embed/");
        //materialObj.url = materialObj.url + "&output=embed";
      }
      return(<MaterialType url={materialObj.url} />);
    }
  }
  completeTask(materialObj){
    this.props.completeTaskAction(materialObj);
  }
  render(){

    return(
      <div>
        <ModalBody >
          <div className="-modal-complete">
            <div className="-modal-complete-name">
              <h1>{this.props.materialObj.lesson_order}.{this.props.materialObj.task_order} — {this.props.materialObj.task_name}</h1>
              <p>by Bennet Knight — 2 min Read</p>
            </div>
            {this.props.matrialFrom == 'classPage' && this.props.materialObj.task_status != 'completed'  && (this.state.materialFlag || this.props.materialObj.materialFlag) ?
            <div className="-modal-complete-action">
              <Button size="sm" className="btn-start" color="primary" onClick={this.completeTask.bind(this,this.props.materialObj)}><Isvg src="/assets/icon-check-white.svg"></Isvg>Complete</Button>
            </div> : ''}
          </div>
          {this.renderform(this.props.materialObj)}
        </ModalBody>
      </div>
    );
  }
}
ViewMaterial.contextTypes = {
  router: React.PropTypes.object.isRequired
};

ViewMaterial.propTypes = {
 actions: PropTypes.object.isRequired,
 userLibrary:PropTypes.array
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    auth:state.auth,
    userLibrary : state.userLibrary


  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewMaterial);
