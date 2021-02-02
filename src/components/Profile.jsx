import React from 'react';
import Icon from './Icon';
import './Profile.scss';

const Profile = (props) => {
  const color = props.color || "#ffffff";

  return (
    <div className="profile">
      <header style={{background: `linear-gradient(90deg, #000000 2%, ${color} 2% 98%, #000000 98%)`}}>
        <div className="icons">
          <Icon svg logo="github" link="https://github.com/BenjaminJSLee" 
            width="50px" height="50px"
          />
          <Icon svg logo="linkedin" link="https://www.linkedin.com/in/ben-lee-2a92871b1/" 
            width="50px" height="50px"
          />
          <Icon svg logo="gmail" email="benjaminjslee@gmail.com" 
            width="50px" height="50px"
          />
        </div>
        <div className="profile-avatar-container">
          <img className="profile-avatar" alt="profile-pic" src={`${props.avatar}`} />
        </div>
      </header>
      <h1 className="profile-name">{props.name}</h1>
      <h2 className="profile-title">{props.title}</h2>
    </div>
  );
};

export default Profile;