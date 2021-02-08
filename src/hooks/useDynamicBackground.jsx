import React, { useEffect, useState } from 'react';

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
        <path d='M 25,60 a 20,20 1 0,0 0,40 h 50 a 20,20 1 0,0 0,-40 a 10,10 1 0,0 -15,-10 a 15,15 1 0,0 -35,10 z' />
      </svg>
    ),
    (
      <svg 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d='M 40, 30 A1,2 90 0,0 40,70 H 160 A1,2 90 0,0 160,30 Z' />
      </svg>
    ),
  ];
  const style = {
    top: `${Math.floor(Math.random() * 41)}%`,
    animationDuration: `${Math.floor(Math.random() * 31) + 40}s`,
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

const useDynamicBackground = () => {
  const [clouds, setClouds] = useState([]);
  const [delay, setDelay] = useState(getCurrentTime());

  useEffect(() => {
    const GENERATION_DELAY = 5000;
    const CLOUDS_TO_GENERATE = 2;
    let cloudId = 0;
    setClouds([]);
    const updateClouds = () => {
      const newClouds = [];
      for (let i = 0; i < CLOUDS_TO_GENERATE; i++) {
        if (cloudId === Number.MAX_VALUE) cloudId = 0;
        cloudId += 1;
        const newCloud = generateCloud(cloudId, (id) => {
          setClouds(prev => prev.filter((elem) => elem.props["data-id"] !== id ));
        });
        newClouds.push(newCloud);
      }
      setClouds(prev => {
        return [...prev, ...newClouds];
      });
    };
    updateClouds();
    let interval = setInterval(updateClouds, GENERATION_DELAY);

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
      interval = setInterval(updateClouds, GENERATION_DELAY);
    };
    window.addEventListener("blur", handleTabBlur);
    window.addEventListener("focus", handleTabFocus);
    return () => {
      clearInterval(interval);
      window.removeEventListener("blur", handleTabBlur);
      window.removeEventListener("focus", handleTabFocus);
    };
  },[]);

  return {
    clouds,
    setClouds,
    delay,
    setDelay,
  };
};
export default useDynamicBackground;
