import React from 'react';
import './DynamicBackground.scss';

const getCurrentTime = () => {
  const date = new Date();
  const day = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
  return date.getTime() - day.getTime();
};

const DynamicBackground = (props) => {
  const delay = getCurrentTime();

  return (
    <div className="background" style={props.style}>
      <svg className="background-svg" style={{ animationDelay: `-${delay}ms` }}>
      </svg>
      <div className="satellites">
        <svg className="sun" style={{ animationDelay: `-${Math.floor(delay + 64800000)}ms` }}>
          <circle cx="50" cy="50" r="50"/>
        </svg>
        <svg className="moon" style={{ animationDelay: `-${Math.floor(delay + 21600000)}ms` }}>
          <circle cx="50" cy="50" r="50"/>
        </svg>
      </div>
    </div>
  );
};

export default DynamicBackground;