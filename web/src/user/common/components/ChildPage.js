import React, {Component } from 'react';
import PrimaryNav from './PrimaryNav';
import SecondaryNav from './SecondaryNav';
import BreadCrumb from './BreadCrumb';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/index';
import cookie from 'react-cookie';
import io from 'socket.io-client';

//const socket = io('http://localhost:3000');

class ChildPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReplyBoxOpen: true,
      notificationObj:{}
    };
    this.toggleClassList = this.toggleClassList.bind(this);
  }
  toggleClassList(event){
    event.preventDefault();
    this.props.toggleClassList();
  }
  componentDidMount() {
    console.log('Page mounted!');
    console.log(cookie.load('user_obj').org_id);
    let me = this;
    this.socket = io.connect('/');
    //this.socket = io.connect('http://localhost:3000');
    this.socket.on(cookie.load('user_obj').org_id, function(data) {
            console.log(data);
            if (cookie.load('user_obj').user_id != data.data.user_id) {
                me.setState({ 'notificationObj': data.data });
                console.log('Came to emitted');
                setTimeout(() => {
                    me.setState({
                        notificationObj: {}
                    });
                }, 8000);
            }
    });
    let notificationObj1 = {
      'user_id': cookie.load('user_obj').user_id,
      'org_id': cookie.load('user_obj').org_id
    }

    console.log(this.props.actions);
    this.props.actions.getNotificationList(notificationObj1)
  }

  render() {
    return (
      <div>
        <PrimaryNav />
        <SecondaryNav notificationlist={this.props.notificationsList} notification={this.state.notificationObj} brandName="RWB" brandLogoUrl="/assets/brand-logo.svg"/>
        {this.props.childPageType == 'classPage' ?
        <span onClick={this.toggleClassList} className="-hamburger">{this.props.classListStatus ? <img src="/assets/icon-hamburger-close.svg"/> : <img src="/assets/icon-hamburger.svg"/>}</span> : ''}
        <BreadCrumb backLink={this.props.backLink} backText={this.props.backText}/>
          <div className="main main-sidebar">
            {this.props.children}
          </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    notificationsList: state.notificationsList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}
// CoursePage.propTypes = {
//   children: PropTypes.element
// };
export default connect(
  mapStateToProps,
  mapDispatchToProps
) (ChildPage);

