import React, { Component } from 'react';
import ReactTable from 'react-table';
//import 'react-table/react-table.css';
import { Button } from 'reactstrap';
//import Collapsible from 'react-collapsible';
import ViewBugReport from './ViewReport';
let _ = require('lodash');

class ReportsTable extends Component {

constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      bugObj:undefined,
      expandedRows:[]
    };

    this.toggle = this.toggle.bind(this);
    this.viewBug = this.viewBug.bind(this);
    this.modalShow = this.modalShow.bind(this);
    this.getNewStat = this.getNewStat.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  viewBug(e){
    const bug_id = e.target.id;
    const bugObject=_.find(this.props.bugReports, { 'bug_id': parseInt(bug_id)});
    this.setState({
      'bugObj':bugObject,
      isOpen:true
    });

  }
modalShow(){
  this.setState({isOpen:false});
}
getNewStat(status,id){
  this.props.bugStatusUpdate(status,id);

}

handleRowClick(rowId) {
        const currentExpandedRows = this.state.expandedRows;
        const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);
        
        const newExpandedRows = isRowCurrentlyExpanded ? 
      currentExpandedRows.filter(id => id !== rowId) : 
      currentExpandedRows.concat(rowId);
        
        this.setState({expandedRows : newExpandedRows});
    }

        renderItem(item) {
    const clickCallback = () => this.handleRowClick(item.bug_id);
        const itemRows = [
      <tr onClick={clickCallback} key={"row-data-" + item.bug_id}>
          <td>{item.bug_id}</td>
          <td>{item.cname}</td>
          <td>{item.Date}</td>      
      </tr>
        ];
                if(this.state.expandedRows.includes(item.id)) {
            itemRows.push(
                <tr key={"row-expanded-" + item.id}>
                    <td>{item.bug_id}</td>
                    <td>{item.cname}</td>
                    <td>{item.Date}</td>
                </tr>
            );
        }
        
        return itemRows;    
    }


  render() {
      let bugsArray = [];
    if(this.props.bugReports && this.props.filterBy && this.props.filterBy != 'all'){
      let dropValue = this.props.filterBy;
      bugsArray = _.filter(this.props.bugReports, function(obj){
           if(obj.status == dropValue){
            return obj;
           }
      });

    }else{
      bugsArray = this.props.bugReports;
    }

     let allItemRows = [];
        
        bugsArray.forEach(item => {
            const perItemRows = this.renderItem(item);
            allItemRows = allItemRows.concat(perItemRows);
        });
    


    const columns = [

        {
        header: '',
        id: '',
        width: 20,
        render: (object) => {
          if(object.row.status =="unresolved"){
          return <img src="/assets/bug-unresolved.svg"/>;
        }
         if(object.row.status =="inprogress"){
          return <img src="/assets/bug-progress.svg"/>;
        }
         if(object.row.status =="resolved"){
          return <img src="/assets/bug-resolved.svg"/>;
        }
        }
      },
      {
        header: 'ID',
        accessor: 'bug_id',
        width: 100,
        sortable: false
      },
      {
        header: 'Path',
        accessor: 'cname',
        render:(object) => {
          return <p>{object.row.cname}{' '}{'▸'}{object.row.lesson_order}.{object.row.task_order}</p>
        }

      },
      {
        header: 'Date',
        accessor: 'Date'
      },
      {
        header: '',
        id: 'view_bug',
        render: (object) => {
          return <Button size="sm" data-name={object.row.status} id={object.row.bug_id} onClick={this.viewBug} color="primary">View</Button>;
        }
      }
    ];


    return (
      <div>
     
  <ReactTable className="-highlight" data={bugsArray} columns={columns}  defaultPageSize={9} showPagination={bugsArray.length > 9 ? true : false}  SubComponent={() => {
    return (
    {/*<ReactTable className="-highlight" data={bugsArray} columns={columns}/> */}
      
    )
  }}/> 
        

          <ViewBugReport BugObj={this.state.bugObj} toggleModal={this.state.isOpen} closeModal={this.modalShow} updateStatus={this.getNewStat}/>

      </div>
    );
  }
}





export default ReportsTable;
