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
        viewBox="0 0 200 100"
      >
        <path d='M 40, 50 A1,2 90 0,0 40,80 H 160 A5,4 90 0,0 160,50 A3,2 0 0,0 80,50 A2,1 0 0,0 40,50 Z' />
      </svg>
    ),
    (
      <svg 
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 100"
      >
        <path d='M 40,80 H 160 A1,2 90 0,0 140,50 A3,2 0 0,0 60,50 A2,1 0 0,0 40,80 Z' />
      </svg>
    ),
    (
      <svg 
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 100"
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

const generateBuilding = (opts = {}) => {
  const buildings = [
    (
      <g>
        <rect
          x="0"
          y="200"
          width="50"
          height="100"
        />
      </g>
    ),
  ];
  const building = buildings[Math.floor(Math.random() * buildings.length)];
  return building;
};

const useDynamicBackground = (options = {}) => {
  const [clouds, setClouds] = useState([]);
  const [delay, setDelay] = useState(getCurrentTime());

  useEffect(() => {
    const GENERATION_DELAY = options.delay || 5000;
    const CLOUDS_TO_GENERATE = options.clouds || 1;
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

  const satellites = (
    <>
      <div className="sun" style={{ animationDelay: `-${delay + (1000 * 60 * 60 * 18)}ms` }}>
        <svg><circle cx="50" cy="50" r="50"/></svg>
      </div>
      <div className="moon" style={{ animationDelay: `-${delay + (1000 * 60 * 60 * 6)}ms` }}>
        <svg><circle cx="50" cy="50" r="50"/></svg>
      </div>
    </>
  );

  const backdrop = (
    <>
      <div className="city">
        <svg>
          
        </svg>
      </div>
      <div className="forest">
        <svg viewBox="0 0 1098 300">

        </svg>
      </div>
    </>
  );

  return {
    clouds,
    setClouds,
    delay,
    setDelay,
    satellites,
    backdrop,
  };
};
export default useDynamicBackground;
