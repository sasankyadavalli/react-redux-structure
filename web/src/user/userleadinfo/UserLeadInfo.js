import React, { Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Row, Col} from 'reactstrap';
import ChildPage from '../common/components/ChildPage';
import { SocialIcon } from 'react-social-icons';
import * as actions from './actions/index';
import cookie from 'react-cookie';
var _ = require('lodash')


class UserLeadInfo extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  this.props.actions.getUsersLeadInfo(cookie.load('user_obj').org_id);
  }

  render() {
    //const imgUrl = "https://s3.amazonaws.com/uifaces/faces/twitter/brad_frost/128.jpg";
        var me =this;
        let userObj;
        if(this.props.usersBio !=undefined){
       userObj = _.filter(this.props.usersBio, function(obj){
           if(obj.user_id == me.props.routeParams.id){
            return obj;
           }

         });
      }
    return (

      <div>
    <ChildPage childPageType='userChild' backLink='/user/leaderboard' backText='Back to Leaderboard'>
    {this.props.usersBio ?
      <Row className="justify-content-md-center m-5 mx-auto">
        <Col sm="12" md="8" lg="6" xl="4">

          <div className="leaderboard-user-top">
            <div className="leaderboard-user-top-avatar" style={{backgroundImage: `url(${userObj[0].profile_pic})`}}></div>
            <div className="leaderboard-user-top-name">
              <h1>{userObj[0].name}</h1>
              <h2>Eagle leader</h2>
            </div>
          </div>

          <div className="leaderboard-user">
          <section className="leaderboard-user-stats">
            <div>
              <h1>{userObj[0].total_points}</h1>
              <p>XP</p>
            </div>
            <div>
              <h1>{userObj[0].actions_count}</h1>
              <p>Actions Completed</p>
            </div>
            <div>
              <h1>NYC</h1>
              <p>Chapter</p>
            </div>
          </section>
          <section className="leaderboard-user-info">
            <div className="leaderboard-user-stats-bio">
              <label>Bio</label>
              <p>{userObj[0].profile_bio}</p>
            </div>
            <div className="leaderboard-user-stats-social">
              <label>Social</label>
              <section>
                <SocialIcon className="mr-1" network="pinterest" style={{ height: 25, width: 25 }} />
                <SocialIcon className="mr-1" network="facebook" style={{ height: 25, width: 25 }} />
                <SocialIcon className="mr-1" network="twitter" style={{ height: 25, width: 25 }} />
              </section>
            </div>
            <div className="leaderboard-user-stats-ribbons">
              <label>Ribbons</label>
              <section>
                <div className="r-1-image"></div>
                <div className="r-1-image"></div>
              </section>
            </div>
          </section>
        </div>
        </Col>
      </Row>
      :null}
    </ChildPage>
    </div>

    );
  }
}


function mapStateToProps(state) {
  return {
    userLeadInfo:state.userLeadInfo,
    usersBio:state.usersBio
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
)(UserLeadInfo);
