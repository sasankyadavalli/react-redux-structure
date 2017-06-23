import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/index';
import cookie from 'react-cookie';
import MobilePage from './MobilePage';

class App extends Component {
  componentWillMount(){
    if(cookie.load('org_obj')){
      this.props.actions.saveLoginDataToStore(cookie.load('org_obj'));
    }
  }
  render() {
    return (
      <div>
        <div>
         {window.innerWidth > 520 ? this.props.children : <MobilePage/>}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  actions: PropTypes.object.isRequired
};


function mapStateToProps(state) {
  return {
    auth:state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

