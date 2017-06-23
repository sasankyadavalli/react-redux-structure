import React, {  Component } from 'react';
import Isvg from 'react-inlinesvg';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/index';
import ReactHtmlParser from 'react-html-parser';


class NotificationsPanel extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    console.log(this.props.notificationlist);
    return (
      <div>
          <div className="notifications-panel animated bounceInRight">
            <div className="notifications-panel-header">
              <h1>You have <b>4 new notifications</b></h1>
              <div onClick={this.props.close} className="close"><Isvg src="/assets/icon-close.svg"></Isvg></div>
            </div>
            <ul className="notifications-panel-list">
              {
                this.props.notificationlist.map((notification, i) => (
                  <li className={notification.is_read ? "" : "is-new"} key={i}>
                  <p>{ReactHtmlParser(notification.description)}</p>
                  <span className="timestamp">10:01 PM</span>
                  </li>
                ))
              }
            </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (NotificationsPanel);
