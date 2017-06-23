import React, { PropTypes, Component } from 'react';
import PrimaryNav from '../common/components/PrimaryNav';
import SecondaryNav from '../common/components/SecondaryNav';
//import { Container } from 'reactstrap';
import BreadCrumb from './breadCrumb';

class LessonPage extends Component {
  render() {
    return (
      <div>
        <PrimaryNav />
        <SecondaryNav brandName="RWB" brandLogoUrl="/assets/brand-logo.svg"/>
        <BreadCrumb courseId={this.props.courseId}/>
        <div className="main main-sidebar">
            {this.props.children}
          </div>
      </div>
    );
  }
}

LessonPage.propTypes = {
  children: PropTypes.element
};

export default LessonPage;
