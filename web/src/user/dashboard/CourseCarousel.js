import React, { Component} from 'react';
import Slider from 'react-slick';
//import { Container } from 'reactstrap';
import CarouselRectangle from './CarouselRectangle';

class NextIcon extends Component {
  render() {
    return <button {...this.props}><img src="/assets/scroll-arrow-right.svg"/></button>;
  }
}

class PrevIcon extends Component {
  render() {
    return <button {...this.props}><img src="/assets/scroll-arrow-left.svg"/></button>;
  }
}

class CourseCarousel extends Component {

  constructor(props) {
    super(props);
    this.state={
       classDetailsId:'',
       classDetails:'',
       courseDetailsId:''
    };
    this.classDetails=this.classDetails.bind(this);
    this.closeClassDetails=this.closeClassDetails.bind(this);
  }

  componentDidMount() {

  }
  classDetails(lass,event){
    console.log(event);
    if(lass.class_id == this.state.classDetailsId){
      this.setState({'classDetailsId':'','classDetails':'','courseDetailsId':''});
    }else{
      this.setState({'classDetailsId':lass.class_id,'classDetails':lass,'courseDetailsId':lass.class_course_id});
    }
  }
  closeClassDetails(){
    this.setState({'classDetailsId':'','classDetails':'','courseDetailsId':''});
  }

  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
      variableWidth: true,
      nextArrow: <NextIcon />,
      prevArrow: <PrevIcon />,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 1366,
          settings: {
            slidesToShow: 4
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4
          }
        },
        {
          breakpoint: 1920,
          settings: {
            slidesToShow: 4
          }
        }

      ]
    };
    //const img = 'https://images.unsplash.com/photo-1489769811155-68b5848205ac?dpr=2&auto=format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=';
    let courseList=this.props.courses || [];
    let me=this;
    return (
      <div style={{marginLeft: '-40px', 'marginRight': '-20px'}}>
      {courseList.map(course => (
      <div className="mb-5">
      <div>
        <div className="pl-4">
          <h5 className="main-page-title">{course.course_name}{course.course_type == 'yes' ? <span className="tag ml-2">Supplemental</span> : ''}</h5>
          <p>{course.course_description}</p>
        </div>
       <Slider {...settings}>
       {course.classes.map((lass)=> { return(
        <div>
        {lass.class_status == 'locked' ?
         <div className="carousel-boxes">
          <div className="course-container">
                    <div className="course-container-img is-locked" style={{backgroundImage: 'linear-gradient(rgba(4,29,65,0.10) 0%, #041E42 100%), url(' +lass.class_image+ ')'}}>
                    <div className="course-container-title">{lass.class_name}</div>
                    <div className="course-container-icon"><img src="/assets/icon-lock-white.svg"/></div>
                    </div>
          </div>
          </div>
         :
          <div className="carousel-boxes">
          <div className="course-container" data-class_id={lass.class_id} >
                    <div data-class_id={lass.class_id} data-course_id={lass.class_course_id} onClick={me.classDetails.bind(me, lass)} className={lass.class_status == 'locked' ? "course-container-img is-locked" : (lass.class_status == 'completed' ? "course-container-img is-completed" : "course-container-img")} style={{backgroundImage: 'linear-gradient(rgba(4,29,65,0.10) 0%, #041E42 100%), url(' +lass.class_image+ ')'}}>
                    <div className="course-container-title">{lass.class_name}</div>
                    {lass.class_status == 'locked' ?
                    <div className="course-container-icon"><img src="/assets/icon-lock-white.svg"/></div>
                    :(lass.class_status == 'completed' ? <div className="course-container-icon"><img src="/assets/icon-check-white.svg"/></div> : <div className="course-container-icon"><img src="/assets/icon-lockopen-white.svg"/></div>)}
                    </div>
                    {me.state.classDetailsId == lass.class_id ?
                    <div className="course-container-triangle"><img src="/assets/course-rectangle-triangle.svg"/></div> :
                    <div className="course-container-triangle hide"><img src="/assets/course-rectangle-triangle.svg"/></div>}
          </div>
          </div>}
        </div>);
        }) }
      </Slider>
      </div>
      <CarouselRectangle goToClassDetailsPage={this.props.goToClassDetailsPage} closeDetailsPage={this.closeClassDetails} elementClassId={course.course_id} selectedCourseId={me.state.courseDetailsId}  classDetails={me.state.classDetails}/>

      </div>
      ))}
      </div>
    );
  }
}

export default CourseCarousel;
