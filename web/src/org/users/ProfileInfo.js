import React, { Component } from 'react';


class ProfileInfo extends Component {
  render() {
  return (
    <div>
      <div className="user-info-item">
        <div className="user-info-item-label">ID</div>
        <div className="user-info-item-text">{this.props.profileData.user_id}</div>
      </div>
      <div className="user-info-item">
        <div className="user-info-item-label">Email</div>
        <div className="user-info-item-text">{this.props.profileData.email}</div>
      </div>
      <div className="user-info-item">
        <div className="user-info-item-label">Name</div>
        <div className="user-info-item-text">{this.props.profileData.name}</div>
      </div>
      <div className="user-info-item">
        <div className="user-info-item-label">Bio</div>
        <div className="user-info-item-text">Brace forward! Up helm! cried Ahab like lightning to his men. But the suddenly started Pequod was not quick enough to escape the sound of the splash that the corpse soon made as it struck the sea; not so quick, indeed, but that some of the flying bubbles might have sprinkled her hull with their ghostly baptism.</div>
      </div>
    </div>

    );
  }
}



export default ProfileInfo;
