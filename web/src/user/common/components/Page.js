import 'babel-polyfill';
import React, { PropTypes, Component } from 'react';
import PrimaryNav from './PrimaryNav';
import SecondaryNav from './SecondaryNav';
import { Container } from 'reactstrap';
import * as actions from '../actions/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ChannelReplyBox from '../../forums/ChannelReplyBox';
import cookie from 'react-cookie';
import io from 'socket.io-client';


class Page extends Component {

  constructor(props) {
    super(props);
    this.state = {
        isReplyBoxOpen: true,
        notificationObj: {}
    };

    this.toggleReplyBox = this.toggleReplyBox.bind(this);

  }


  toggleReplyBox() {
    this.setState({
      isReplyBoxOpen: !this.state.isReplyBoxOpen
    });
  }


  componentDidMount() {
    console.log(cookie.load('user_obj').org_id)
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

    let notificationObj = {
      'user_id': cookie.load('user_obj').user_id,
      'org_id': cookie.load('user_obj').org_id
    }

    console.log(this.props.actions);
    this.props.actions.getNotificationList(notificationObj)
  }

  render() {
    return (
      <div>
        <PrimaryNav />
        <SecondaryNav notificationlist={this.props.notificationsList} notification={this.state.notificationObj} brandName="RWB" brandLogoUrl="/assets/brand-logo.svg"/>
        <div className="main">
          <Container fluid={true} className="main-inner">
            <div className="main-page-header">
              <h1 className="main-page-title">{this.props.pageTitle}</h1>
              {this.props.pageAction}
            </div>
            <p className="main-page-description">
              {this.props.pageDescription}
              {this.props.pageDescriptionAction}
            </p>

          </Container>
          <Container fluid={true} className="main-inner">
            {this.props.children}
          </Container>
        </div>

        {this.state.isReplyBoxOpen ? <ChannelReplyBox toggle={this.toggleReplyBox}/> : ''}

      </div>
    );
  }
}

Page.propTypes = {
  children: PropTypes.node,
  pageAction: PropTypes.element,
  pageTitle: PropTypes.string,
  pageDescription: PropTypes.string,
  pageDescriptionAction: PropTypes.element
};

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (Page);
