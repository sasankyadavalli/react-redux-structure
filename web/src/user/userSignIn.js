import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
//import Page from './common/components/Page';
//import { Route, Link, IndexLink } from 'react-router';
//import { Button , Form, FormGroup , Label,Col, Row , Container, Input} from 'reactstrap';
//import HomeNav from './HomeNav';
import * as actions from './common/actions/index';
import cookie from 'react-cookie';
import AuthService from './authService';
import LandingPage from './landingpage/LandingPage';

const shadeColor2 =  function(color, percent) {
    let R = parseInt(color.substring(1,3),16);
    let G = parseInt(color.substring(3,5),16);
    let B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;
    G = (G<255)?G:255;
    B = (B<255)?B:255;

    let RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    let GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    let BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}

class UserSignIn extends Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
    this.onSubmit=this.onSubmit.bind(this);
    this.auth = undefined;
  }
  componentWillMount(){
    if(cookie.load('user_obj')){
      this.context.router.push('/user/dashboard');
    }
    actions.getOrgDetails(window.location.origin).done((response) => {
      console.log(response);
        document.documentElement.style.setProperty('--color-primary', response.result.primary_color);
        document.documentElement.style.setProperty('--color-primary-light-50', shadeColor2(response.result.primary_color, '50'));
        document.documentElement.style.setProperty('--color-primary-light-20', shadeColor2(response.result.primary_color, '20'));
        document.documentElement.style.setProperty('--color-primary-dark-10', shadeColor2(response.result.primary_color, '-10'));
        document.documentElement.style.setProperty('--color-secondary-57', shadeColor2(response.result.primary_color, '57'));
        document.documentElement.style.setProperty('--color-primary-light-55', shadeColor2(response.result.primary_color, '55'));
      cookie.save('org_details', response.result, {path: '/'});
      this.auth = new AuthService(response.result.auth0clientid, response.result.auth0domain);
      this.auth.on('fetching_user', (state) => {
        this.setState({loading: state});
      });
    });

  }

  onSubmit (event) {
    event.preventDefault();
    this.setState({loading: true});
    const email=event.target.email.value;
    const password=event.target.password.value;
    const obj={
      'email':email,
      'password':password
    };
    cookie.save('user_obj', obj, { path: '/' });
    this.props.actions.saveUserLoginDataToStore(obj);
    this.context.router.push('/user/dashboard');
    // actions.orgLogin(obj).done((response) => {
    //   this.setState({loading: false});
    //   this.props.actions.saveLoginDataToStore(response.result);
    //   cookie.save('org_obj', response.result, { path: '/' });
    //   this.context.router.push('/app/dashboard');
    // });
  }
  render(){
    return(
		<div>
      <LandingPage onClick={() => this.auth.login()} loading={this.state.loading}/>
    </div>
		);
	}
}

UserSignIn.contextTypes = {
  router: React.PropTypes.object.isRequired
};

UserSignIn.propTypes = {
 userAuth: PropTypes.object,
 actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    userAuth: state.userAuth
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
)(UserSignIn);
