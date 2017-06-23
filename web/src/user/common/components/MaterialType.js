import React,{Component} from 'react';
import Iframe from 'react-iframe';

class MaterialType extends Component{
  constructor(props){
    super(props);
    this.state = {

    };

  }
  componentWillMount(){
    this.setState({
      url:this.props.url
    });
  }

render() {
    return (
      <div>
        <Iframe url={this.state.url}
        width="100%"
        height="400px"
        display="initial"
        position="relative"
        allowFullScreen />
      </div>
      );
  }

}
export default MaterialType;
