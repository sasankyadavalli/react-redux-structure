import React, { Component} from 'react';
import { Row, Col, FormGroup, Label, Input,Form,FormFeedback } from 'reactstrap';
import ChildPage from '../common/components/ChildPage';
import cookie from 'react-cookie';
import moment from 'moment';
import {validate} from '../../validators';
import Button from 'react-bootstrap-button-loader';
import toastr from 'toastr';



class UserSettings extends Component {

  constructor(props) {
    super(props);

    this.state = {
      'errors': {},
      'buttonDisable':true,
      'buttonloading':false,
      imageloading:false

    };

    this.save = this.save.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.checkTheFields = this.checkTheFields.bind(this);
  }
  componentWillMount(){
    let dob = cookie.load('user_obj').dob;
    let val = dob.split('/');

    this.setState({
      userObj:cookie.load('user_obj'),
      name:cookie.load('user_obj').name,
      profile_pic:cookie.load('user_obj').profile_pic,
      gender:cookie.load('user_obj').gender,
      address:cookie.load('user_obj').address,
      city:cookie.load('user_obj').city,
      state:cookie.load('user_obj').state,
      zip:cookie.load('user_obj').zip,
      phonenumber:cookie.load('user_obj').phonenumber,
      chapter:cookie.load('user_obj').chapter,
      position:cookie.load('user_obj').position,
      day:val[2],
      month:val[1],
      year:val[0]
     });
    this.checkTheFields();

  }


  onChange(e,validators = []){
    let errors = validate(e.target.name, e.target.value, validators, this.state.errors);
    this.setState({errors, [e.target.name]: e.target.value});
    if(this.state.month && this.state.day && this.state.year && this.state.gender && this.state.address && this.state.city && (this.state.state || e.target.value ) && this.state.zip && this.state.chapter && this.state.position && (Object.keys(this.state.errors).length) == 0){
       this.setState({'buttonDisable':false});
    }else{
       this.setState({'buttonDisable':true});
    }

  }
  getRecentYears(count) {
    let currentYear = new Date().getFullYear(),
        years = [];

    while (count--) {
        years.push(currentYear--);
    }

    return years;
  }

  getDays(count) {

    //let initialYear = 1;
    let days = [];

    for(let i=1; i<=count; i++) {
      days.push(i);
    }

    return days;
  }
  fileUpload(e) {
    e.preventDefault();
    const file = e.target.files[0];
    this.setState({'imageloading':true});
    if (file.type.indexOf('image/') === 0) {
      // This is a post request to server endpoint with image as `image`
      const formData = new FormData();
      formData.append('image', file);
      fetch('/api/fileupload', {
        method: 'POST',
        body: formData,
        headers:{
          'Access-Control-Allow-Origin':''
        },
      }).then((response) => {
        if (response.status === 200) {
          // Assuming server responds with
          // `{ "url": "http://example-cdn.com/image.jpg"}`
          return response.json().then(data => {
            if (data) {
              this.setState({'profile_pic' :data.files[0].url});
             this.setState({'imageloading':false});
              this.checkTheFields();
            }
          });
        }
      });
    }

  }
  checkTheFields(){
    if(this.state.month && this.state.day && this.state.year && this.state.gender && this.state.address && this.state.city && this.state.state && this.state.zip && this.state.chapter && this.state.position && (Object.keys(this.state.errors).length) == 0){
       this.setState({'buttonDisable':false});
    }else{
       this.setState({'buttonDisable':true});
    }
  }
  save() {
    const obj={
      name:cookie.load('user_obj').name,
      profile_pic:this.state.profile_pic,
      gender:this.state.gender,
      address:this.state.address,
      city:this.state.city,
      state:this.state.state,
      zip:this.state.zip,
      phonenumber:this.state.phonenumber,
      chapter:this.state.chapter,
      position:this.state.position,
      dob:this.state.year + '/' + this.state.month + '/' + this.state.day,
      bio : this.state.bio,
      twitter:this.state.twitter,
      facebook : this.state.facebook
    };
    console.log(obj);
    this.setState({buttonloading:true});
    fetch('/api/updateuser',{
        method:'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        body:JSON.stringify(obj)
      }).then((response)=>{
        if(response.status === 200){
          return response.json().then(data => {
            cookie.save('user_obj', data.result, { path: '/' });
            toastr.success("Profile Uploaded Succesfully", "Success");
            this.setState({buttonloading:false});

          });

        }
      });
  }
  resetImage(e){
    e.preventDefault();
    this.setState({profile_pic:'',buttonDisable:true});
  }

  render() {
    let {errors} = this.state;

    return (
    <div>
    <ChildPage childPageType="userChild" backLink="/user/dashboard" backText="Back to Dashboard">
      <Row className="justify-content-md-center m-5">
        <Col sm="12" md="10">
          <div className="usersettings-top">
            <div className="usersettings-top-right">
              <div className="mr-3">
                <h3>{this.state.name}</h3>
                <p className="text-muted">43,000,000 XP</p>
              </div>
              <div className="leaderboard-user-top-avatar" style={{backgroundImage: `url(${this.state.profile_pic})`}}/>
            </div>
            <div className="usersettings-top-left">
              <Label className="btn btn-primary btn-sm mb-0">
                    <Input type="file" onChange={this.fileUpload}/>
                    Upload New Image
              </Label>
              <div className={this.state.imageloading ? '' : 'hide'}>
                  <div sm={{size: 4, push: 3, pull: 2, offset: 1}} className="mt-5">
                    <img src="/assets/icon-loading.svg"/>
                  </div>
                </div>
              <span style={{cursor:'pointer'}} onClick={this.resetImage}>
                <img src="/assets/icon-close.svg"/>Remove Image
              </span>

            </div>

          </div>
          <div className="usersettings-wrapper">
            <div className="right">
            <Form onChange={this.checkTheFields}>
              <FormGroup>
                <Label>Date of Birth**</Label>
                  <FormGroup row>
                    <Col md="5">
                     <FormGroup color={errors.month ? "danger" : ""}>
                      <Input type="select" name="month" id="month" size="sm" onChange={(e) => this.onChange(e, ['required'])} value={this.state.month}>
                      <option selected disabled>Month</option>
                      <option value="01">Jan</option>
                      <option value="02">Feb</option>
                      <option value="03">March</option>
                      <option value="04">April</option>
                      <option value="05">May</option>
                      <option value="06">June</option>
                      <option value="07">July</option>
                      <option value="08">August</option>
                      <option value="09">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </Input>
                    </FormGroup>
                    </Col>


                      <Col md="3" >
                       <FormGroup color={errors.day ? "danger" : ""}>
                        <Input type="select" name="day" id="day" size="sm" onChange={(e) => this.onChange(e, ['required'])} value={this.state.day}>
                          <option selected disabled>Day</option>
                          {this.getDays(moment(this.state.year + '-' + this.state.month).daysInMonth()).map(day => <option value={day} key={day}>{day}</option>)
                            }
                        </Input>
                       </FormGroup>
                       </Col>
                      <Col md="4">
                      <FormGroup color={errors.year ? "danger" : ""}>
                        <Input type="select" name="year" id="year" size="sm" onChange={(e) => this.onChange(e, ['required'])} value={this.state.year}>
                          <option disabled value="year">Year</option>
                            {this.getRecentYears(80).map(year => <option value={year} key={year}>{year}</option>)}
                        </Input>
                      </FormGroup>
                      </Col>

                  </FormGroup>
              </FormGroup>
              <FormGroup color={errors.gender ? "danger" : ""}>
                <Label>Gender**</Label>
                <Input type="select" name="gender" size="sm"  value={this.state.gender} onChange={(e) => this.onChange(e, ['required'])}>
                  <option selected disabled>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Input>
                {errors.gender ? <FormFeedback>{errors.gender}</FormFeedback> : "" }
              </FormGroup>
              <FormGroup>
                <Label>Address**</Label>
                <Input type="text" placeholder="Street and number, apartment, suite, unit, etc." name="address" value={this.state.address} onChange={(e) => this.onChange(e, ['required'])}/>
                {errors.address ? <FormFeedback>{errors.address}</FormFeedback> : "" }
              </FormGroup>
              <FormGroup>
                  <FormGroup row>
                    <Col md="5">
                    <FormGroup color={errors.city? "danger":""}>
                    <label>City</label>
                    <Input type="text" name="city" value={this.state.city} onChange={(e) => this.onChange(e, ['required'])}/>
                  </FormGroup>
                  </Col>
                  <Col md="3">
                  <FormGroup color={errors.state ? "danger" : ""}>
                    <label>State**</label>
                    <Input type="select" name="state" value={this.state.state} onChange={(e) => this.onChange(e, ['required'])} size="sm">
                    <option selected disabled>State</option>
                    <option value="New York">NY</option>
                      <option value="Massachusetts">MC</option>
                      <option value="Pennsylvania">PE</option>
                      <option value="Delaware">DE</option>
                      <option value="District of Columbia">DI</option>
                      <option value="Virginia">VI</option>
                      <option value="Maryland">MA</option>
                      <option value="West Virginia">WV</option>
                      <option value="North Carolina">NC</option>
                     <option value="Rhode Island">RI</option>
                     <option value="Georgia">GE</option>
                     <option value="New Hampshire">NH</option>
                     <option value="Florida">FL</option>
                     <option value="Alabama">AL</option>
                     <option value="Tennessee">TE</option>
                     <option value="Mississippi">MI</option>
                     <option value="Maine">ME</option>
                     <option value="Kentucky">KE</option>
                     <option value="Ohio">OH</option>
                     <option value="Indiana">IN</option>
                     <option value="Michigan">MG</option>
                     <option value="Iowa">IO</option>
                     <option value="Vermont">VE</option>
                     <option value="Wisconsin">WI</option>
                     <option value="Minnesota">MN</option>
                     <option value="South Dakota">SD</option>
                     <option value="North Dakota">ND</option>
                     <option value="Montana">MO</option>
                     <option value="Illinois">IL</option>
                     <option value="Connecticut">CO</option>
                     <option value="Puerto Rico">PR</option>
                     <option value="Missouri">MS</option>
                     <option value="Kansas">KA</option>
                     <option value="Nebraska">NE</option>
                     <option value="Louisiana">NY</option>
                     <option value="New Jersey">NJ</option>
                     <option value="Arkansas">AR</option>
                     <option value="Oklahoma">OK</option>
                     <option value="Texas">TX</option>
                     <option value="Colorado">CL</option>
                     <option value="Virgin Islands">VL</option>
                     <option value="Wyoming">WY</option>
                     <option value="Idaho">ID</option>
                     <option value="Utah">UT</option>
                     <option value="Arizona">AR</option>
                     <option value="New Mexico">NM</option>
                     <option value="Nevada">NE</option>
                     <option value="California">CA</option>
                     <option value="Hawaii">HA</option>
                     <option value="American Samoa">AS</option>
                     <option value="Guam">GU</option>
                    </Input>
                  </FormGroup>
                  </Col>
                  <Col md="4">
                  <FormGroup color={errors.zip ? "danger":""}>
                    <label>ZIP**</label>
                    <Input type="text" maxLength="5" name="zip" value={this.state.zip} onChange={(e) => this.onChange(e, ['required'])}/>
                  </FormGroup>
                  </Col>
                  </FormGroup>
              </FormGroup>
              <FormGroup>
                <Label>Phone Number**</Label>
                  <Col md="6">
                  <FormGroup row color={errors.phonenumber ? "danger":""}>
                    <Input type="text" name="phonenumber" maxLength="10" value={this.state.phonenumber} onChange={(e) => this.onChange(e, ['required'])}/>
                  </FormGroup>
                  </Col>
              </FormGroup>
              <FormGroup>
                  <FormGroup row>
                    <Col md="6">
                    <FormGroup color={errors.chapter ? "danger" : ""}>
                     <label>Chapter*</label>
                    <Input type="text" name="chapter" value={this.state.chapter} onChange={(e) => this.onChange(e, ['required'])}/>
                    {errors.chapter ? <FormFeedback>{errors.chapter}</FormFeedback> : "" }
                  </FormGroup>
                  </Col>
                  <Col md="6">
                  <FormGroup>
                   <label>Position*</label>
                    <Input type="text" name="position" value={this.state.position} onChange={(e) => this.onChange(e, ['required'])}/>
                    {errors.position ? <FormFeedback>{errors.position}</FormFeedback> : "" }
                  </FormGroup>
                  </Col>
                  </FormGroup>
              </FormGroup>
              <FormGroup>
                <Label>Bio</Label>
                <FormGroup row>
                  <Col md="12">
                    <Input type="textarea" name="bio" onChange={this.onChange} value={this.state.bio}  maxLength="150"/>
                  </Col>
                </FormGroup>
              </FormGroup>
              <FormGroup>
                <Label>Twitter</Label>
                <Input type="text" name="twitter" value={this.state.twitter} onChange={this.onChange} placeholder=""/>
              </FormGroup>
              <FormGroup>
                <Label>Facebook</Label>
                <Input type="text" name="facebook" value={this.state.facebook} onChange={this.onChange} placeholder=""/>
              </FormGroup>
              <FormGroup>
                <p className="text-muted mb-1 font-italic">* Required fields</p>
                <p className="text-muted font-italic">** Required, won’t show on public profile</p>
              </FormGroup>
              <FormGroup>
                <Button  size="sm" color="primary" className="btn-primary btn-lg" onClick={this.save} loading={this.state.buttonloading} disabled={this.state.buttonDisable|| this.state.buttonloading ? true : false}>Save</Button>
              </FormGroup>
              </Form>
            </div>
            <div className="left">
              <label>Ribbons</label>
              <ul>
                <li className="r-1">
                  <div className="r-1-image"/>
                </li>
                <li className="r-1">
                  <div className="r-1-image"/>
                </li>
                <li className="r-1">
                  <div className="r-1-image"/>
                </li>
                <li className="r-1">
                  <div className="r-1-image"/>
                </li>
              </ul>

            </div>
          </div>
        </Col>
      </Row>
    </ChildPage>
    </div>

    );
  }
}

export default UserSettings;
