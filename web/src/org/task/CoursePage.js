import React, { PropTypes, Component } from 'react';
import PrimaryNav from '../common/components/PrimaryNav';
import SecondaryNav from '../common/components/SecondaryNav';
import BreadCrumb from './BreadCrumb';

class CoursePage extends Component {
  render() {
    return (
      <div>
        <PrimaryNav />
        <SecondaryNav brandName="RWB" brandLogoUrl="/assets/brand-logo.svg"/>
        <BreadCrumb classId={this.props.classId} courseId={this.props.courseId}/>
          <div className="main main-sidebar">
            {this.props.children}
          </div>
      </div>
    );
  }
}

CoursePage.propTypes = {
  children: PropTypes.element
};

export default CoursePage;
