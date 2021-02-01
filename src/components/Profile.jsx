import React from 'react';
import Icon from './Icon';
import './Profile.scss';

const Profile = (props) => {
  const color = props.color || "#ffffff";

  return (
    <div className="profile">
      <header>
        <div className="icons">
          <Icon svg github="https://github.com/BenjaminJSLee" />
          <Icon svg linkedin="https://www.linkedin.com/in/ben-lee-2a92871b1/" />
          <Icon svg email="benjaminjslee@gmail.com" />
        </div>
        <div className="profile-avatar-container"
          style={{background: `conic-gradient( ${color} 0%, black 25% 75%, ${color} 100%)`}}
        >
          <img className="profile-avatar" alt="profile-pic" src={`${props.avatar}`} />
        </div>
      </header>
      <h1 className="profile-name">{props.name}</h1>
      <h2 className="profile-title">{props.title}</h2>
    </div>
  );
};

export default Profile;