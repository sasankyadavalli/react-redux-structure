import React, { Component} from 'react';
import {connect} from 'react-redux';
import { Button } from 'reactstrap';
import Isvg from 'react-inlinesvg';

class CarouselOverview extends Component {

  constructor(props) {
    super(props);
    this.startClass=this.startClass.bind(this);
  }
  startClass(event) {
    event.preventDefault();
    if (event.target.tagName == "BUTTON") {
        this.props.goToClassDetailsPage(event.target.getAttribute('data-class_id'));
    } else if (event.target.closest('button')) {
        this.props.goToClassDetailsPage(event.target.closest('button').getAttribute('data-class_id'));
    }
}


  render() {
    //const img = 'https://images.unsplash.com/photo-1489769811155-68b5848205ac?dpr=2&auto=format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=';

    return (
    <div className="carousel-overview">
      <div className="carousel-overview-info">
        <h5>{this.props.classDetails.class_name}</h5>
        <p>{this.props.classDetails.class_description}</p>
        <div className="mt-1">
          <Button className="btn-start" size="sm" color="primary" data-class_id={this.props.classDetails.class_id} onClick={this.startClass}><Isvg data-class_id={this.props.classDetails.class_id} src="/assets/icon-next-white.svg"></Isvg>Start</Button>
        </div>
      </div>
      <div className="carousel-overview-img">
        <div className="course-container">
          <div className="carousel-overview-img" style={{backgroundImage: 'linear-gradient(rgba(4,29,65,0.10) 0%, #041E42 100%), url(' + this.props.classDetails.class_image + ')'}}>
          </div>
        </div>
      </div>
    </div>
    );
  }
}


function mapStateToProps(state) {
  console.log(state);
  return {

  };
}

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(CarouselOverview);
