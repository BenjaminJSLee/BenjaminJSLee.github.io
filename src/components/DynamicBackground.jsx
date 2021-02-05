import React, { useEffect, useState } from 'react';
import './DynamicBackground.scss';

const getCurrentTime = () => {
  const date = new Date();
  const day = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
  return date.getTime() - day.getTime();
};

const generateCloud = (id, removeCloud) => {
  const clouds = [
    (
      <svg 
        xmlns="http://www.w3.org/2000/svg"
        viewBox='0 0 100 100'
      >
        <path d='M 25,60 a 20,20 1 0,0 0,40 h 50 a 20,20 1 0,0 0,-40 a 10,10 1 0,0 -15,-10 a 15,15 1 0,0 -35,10  z' />
      </svg>
    ),
    (
      <div>Lorem, ipsum.</div>
    ),
  ];
  const style = {
    top: `${Math.floor(Math.random() * 41)}%`,
    animationDuration: `${Math.floor(Math.random() * 5) * 10 + 20}s`,
  };
  const cloud = clouds[Math.floor(Math.random() * clouds.length)];
  
  return (
    <div
      data-id={id}
      key={id}
      className="cloud" 
      style={style}
      onAnimationEnd={() => removeCloud(id)}
    >
      {cloud}
    </div>
  );
};

const DynamicBackground = (props) => {
  const [clouds, setClouds] = useState([]);
  const delay = getCurrentTime();

  useEffect(() => {
    let cloudId = 0;
    setClouds([]);
    const updateClouds = () => {
      if (cloudId === Number.MAX_VALUE) cloudId = 0;
      cloudId += 1;
      setClouds(prev => {
        const newCloud = generateCloud(cloudId, (id) => {
          setClouds(prev => {
            return prev.filter((elem) => elem.props["data-id"] !== id);
          });
        });
        return [...prev, newCloud];
      });
    };
    let interval = setInterval(updateClouds, 2000);
    const handleTabBlur = () => {
      clearInterval(interval);
      setClouds(prev => {
        return prev.map((elem) => {
          return React.cloneElement(elem, {
            ...elem.props,
            style: {
              ...elem.props.style,
              animationPlayState: "paused",
            }
          });
        });
      });
    };
    const handleTabFocus = () => {
      clearInterval(interval);
      setClouds(prev => {
        return prev.map((elem) => {
          return React.cloneElement(elem, {
            ...elem.props,
            style: {
              ...elem.props.style,
              animationPlayState: "running",
            }
          });
        });
      });
      interval = setInterval(updateClouds, 2000);
    };
    window.addEventListener("blur", handleTabBlur);
    window.addEventListener("focus", handleTabFocus);
    return () => {
      clearInterval(interval);
      window.removeEventListener("blur", handleTabBlur);
      window.removeEventListener("focus", handleTabFocus);
    };
  },[]);

  return (
    <div className="background" style={props.style}>
      <svg className="background-svg" style={{ animationDelay: `-${delay}ms` }}>
      </svg>
      <div className="satellites">
        <div className="sun" style={{ animationDelay: `-${Math.floor(delay + 64800000)}ms` }}>
          <svg><circle cx="50" cy="50" r="50"/></svg>
        </div>
        <div className="moon" style={{ animationDelay: `-${Math.floor(delay + 21600000)}ms` }}>
          <svg><circle cx="50" cy="50" r="50"/></svg>
        </div>
      </div>
      <div className="clouds">
        {clouds}
      </div>
    </div>
  );
};

export default DynamicBackground;