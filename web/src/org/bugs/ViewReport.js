import React, { Component }  from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Col} from 'reactstrap';

class ViewBugReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropValue:'status'
    };


    this.close = this.close.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveState = this.saveState.bind(this);
    this.navigateTo = this.navigateTo.bind(this);
  }

   handleChange(e){
        this.setState({
          dropValue: e.target.value});
    }

  close(){
    this.props.closeModal();
  }

  saveState(){
    //debugger;
      const newStatus = this.state.dropValue;
      const id = this.props.BugObj.bug_id;
      console.log(newStatus);

      this.props.updateStatus(newStatus,id);
      this.close();
  }

  navigateTo(){
    console.log("move to bug page");
  }

  render() {
   // console.log(this.props.BugObj.bug_id);
    return (
      
    <div>
    {this.props.toggleModal == true ? 
    <Modal isOpen={true}>
    <ModalHeader className="survey-modal-header">
      <span>Bug{' '}{this.props.BugObj.bug_id}</span>
      <span className="is-mandatory text-muted">{this.props.BugObj.Date}</span>
    </ModalHeader>
    <ModalBody>
    <div className="bug-modal-header">
      <div>{this.props.BugObj.cname}{' ▸ '}{this.props.BugObj.lesson_order}.{this.props.BugObj.task_order}</div>
      <div>
        <Button size="lg" color="filter" onClick={this.navigateTo}>To Task</Button>
      </div>
    </div>
    <p className="mt-3 mr-5 mb-5">{this.props.BugObj.bug_description}</p>
    </ModalBody>	
    <ModalFooter>
    <Col className="mb-2" sm="6" md={{ size: 3}}>
    <Input type="select" name="select" value={this.state.dropValue} size="sm"  onChange = {this.handleChange}>
    <option value="status" disabled>Status</option>
            <option value="inprogress">In Progress</option>
            <option value="resolved">Resolved</option>
      </Input>
      </Col>
            <Button id ="" size="lg" color="primary" onClick={this.saveState}>Save</Button>
            <Button id ="" size="lg" color="cancel" onClick={this.close}>Cancel</Button>
          </ModalFooter>
    </Modal>
    :null}
    </div>
    
    );
  }
}

export default ViewBugReport;
