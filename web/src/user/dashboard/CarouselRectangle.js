import React, { Component} from 'react';
import { Container } from 'reactstrap';
import {Tab,Tabs,TabPanel,TabList} from 'react-tabs';
import CarouselOverview from './CarouselOverview';
import CarouselLessons from './CarouselLessons';

class CarouselRectangle extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      {this.props.classDetails && this.props.classDetails.class_id && (this.props.elementClassId == this.props.selectedCourseId) ?
    <Container fluid={true} className="pl-0 pr-0">
      <div className="carousel-rectangle">
        <Tabs>
          <TabList className="carousel-rectangle-tablist">
            <Tab>Overview</Tab>
            <Tab>Lessons</Tab>
          </TabList>
          <TabPanel>
            <CarouselOverview goToClassDetailsPage={this.props.goToClassDetailsPage} classDetails={this.props.classDetails}/>
          </TabPanel>
          <TabPanel>
            <CarouselLessons goToClassDetailsPage={this.props.goToClassDetailsPage} lessonsList={this.props.classDetails.lessons}/>
          </TabPanel>
          </Tabs>
          <div className="carousel-rectangle-close" onClick={this.props.closeDetailsPage}>
            <img onClick={this.props.closeDetailsPage} src="/assets/icon-close.svg"/>
          </div>
      </div>
    </Container>
    : ''}
    </div>
    );
  }
}



export default CarouselRectangle;
