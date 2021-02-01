import React from 'react';
import './Profile.scss';

const Profile = (props) => {
  return (
    <div className="profile">
      <div className="profile-avatar-container">
        <img className="profile-avatar" alt="profile-pic" src={`${props.avatar}`} />
      </div>
      <h1 className="profile-name">{props.name}</h1>
      <h2 className="profile-title">{props.title}</h2>
    </div>
  );
};

export default Profile;