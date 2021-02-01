import React from 'react';
import './Profile.scss';

const Profile = (props) => {
  return (
    <div className="profile">
      <img alt="profile-pic" src="" />
      <h1>{props.name}</h1>
      <h2>{props.title}</h2>
    </div>
  );
};

export default Profile;