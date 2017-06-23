import React, { Component,PropTypes } from 'react';
//import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Page from '../common/components/Page';
import { Button, Row, Col, Modal,ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import UsersTable from './UsersTable';
import * as actions from '../common/actions/index';
import cookie from 'react-cookie';
import UserDropdown from './UserDropdown';
let _ = require('lodash');
//import (filter) from lodash;
// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class Users extends Component {

    constructor(props) {
    super(props);
    this.state = {
       filterFlag : true,
       elements: [],
       filterInputs:[],
       modal: false
    };

    // This binding is necessary to make `this` work in the callback
   // this.handleClick = this.handleClick.bind(this);
    this.addFilter = this.addFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.liveFiltering = this.liveFiltering.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount(){

   this.props.actions.usersList(cookie.load('org_obj').org_id);
  }


  /*handleClick(e) {
    e.preventDefault();
     this.setState({
      modal: !this.state.modal,
      });
    
      fetch('/api/user/userlist/exports',{
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body:JSON.stringify({"user_list" : this.state.usersList})
             
      }).then((response)=>{
              console.log(response);
      }); 
  }*/

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }


  removeFilter(id,removeOption){
    let sliceArray = this.state.elements;
    delete sliceArray[id];
    // let total = this.state.filterInputs;
    // total=_.pullAllBy(total,[{'type':removeOption}],'type');
    // total.push(obj[0]);

    // //_.pullAll(array, ['a', 'c']);
    // this.setState({'filterInputs':total});

    this.liveFiltering(removeOption);


  }

  liveFiltering(obj){
    if(obj.length > 0){
    let total = this.state.filterInputs;
    total=_.pullAllBy(total,[{'type':obj[0].type}],'type');
    if(Object.keys(obj[0]).length > 1){
    total.push(obj[0]);
    }

    //_.pullAll(array, ['a', 'c']);
    this.setState({'filterInputs':total});
    let sortedUsers=[];
    let me=this;
    sortedUsers=me.props.usersList;
    let sortedeach=_.each(total, function (val){

      if(val.type == 'gender'){
        
        sortedUsers=_.filter(sortedUsers,_.matches({gender:parseInt(val.gender)}));
      }
      if(val.type == 'chapter'){
        sortedUsers=_.filter(sortedUsers,_.matches({chapter:val.chapter}));
      }
      if(val.type == 'state'){
        sortedUsers=_.filter(sortedUsers,_.matches({state:val.state}));
      }
      if(val.type == 'city'){
        sortedUsers=_.filter(sortedUsers,_.matches({city:val.state}));
      }
      if(val.type == 'dob' && val.fromYear && val.toYear){

        let years = [parseInt(val.fromYear)];
        let yearNumber = parseInt(val.fromYear);
        const yrLen = val.toYear - val.fromYear ;
        for(var i=0; i<yrLen; i++){
          yearNumber = yearNumber+1;
          years.push(yearNumber);
        }
        //var searchStr= years;
        
         sortedUsers = _.filter(sortedUsers, function (obj) {
            if(obj.dob!= null){
                  let x = parseInt(obj.dob.substr(obj.dob.length-4));
                  for(var i=0; i<= years.length; i++){
                  if(x == years[i]){
                    return obj
                  }
                  }
                  }
        });
      }

    });
    console.log(sortedeach);

    this.setState({'filteredUserList':sortedUsers});
}
  }

  addFilter(){
    var newState = this.state.elements;
     newState.push(<UserDropdown filterCount= {newState.length} close={this.removeFilter} filteringMethod={this.liveFiltering} existingFilters={this.state.filterInputs}/>);
     //console.log(newState);
     this.setState({'elements':newState});
     //let newStateLen ;
     // {newState.length!=null ?
     //   newStateLen = newState.length
     //   :''}
     this.setState({
        filterFlag:false,
        elementLength:newState.length
     })
  }

  componentWillReceiveProps(props){
     if(props.usersList){
      this.setState({'usersList':props.usersList});
    
    
     }
  }

  render() {
     //console.log(this.state.usersList);
    //let url = '/api/user/userlist/exports/'+ cookie.load('org_obj').org_id;
    return (
    <Page pageTitle="Users" pageAction={<Button size ="sm" color="primary" onClick={this.toggle}> Exports </Button>}>

    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
      <ModalBody>
          <a href="http://localhost:3000/api/user/list/download/38" >click here</a>
     </ModalBody>

        <ModalFooter>
            
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
       
      
        <div>{this.state.elements}</div>

        <Row className="mb-3">
          <Col sm="4">
            <Button size="lg" color="filter" onClick={this.addFilter}>+ Add Filter</Button>
          </Col>
        </Row>
        <UsersTable usersList={this.state.usersList || []} filretList = {this.state.filteredUserList} />
        
      </Page>
       

    );
    
  }

}
Users.contextTypes = {
  router: React.PropTypes.object.isRequired
};

Users.propTypes = {
  auth: PropTypes.object,
  usersList: PropTypes.array,
  actions: PropTypes.object.isRequired
};


function mapStateToProps(state) {
    //console.log(state.usersList);
  return {
    auth:state.auth,
    usersList: state.usersList

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  size: PropTypes.string,
  backdrop: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['static'])
  ]),
  keyboard: PropTypes.bool,
  zIndex: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  className: PropTypes.string,
  wrapClassName: PropTypes.string,
  modalClassName: PropTypes.string,
  backdropClassName: PropTypes.string,
  contentClassName: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
