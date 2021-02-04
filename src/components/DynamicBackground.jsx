import React from 'react';
import './DynamicBackground.scss';

const getBlendedColor = (c1, c2, percent) => {
  const startRGB = c1.replace('#','').match(/..?/g).map((hex) => parseInt(`0x${hex}`));
  const endRGB = c2.replace('#','').match(/..?/g).map((hex) => parseInt(`0x${hex}`));
  const newRGB = [
    startRGB[0] + Math.floor((endRGB[0] - startRGB[0]) * percent),
    startRGB[1] + Math.floor((endRGB[1] - startRGB[1]) * percent),
    startRGB[2] + Math.floor((endRGB[2] - startRGB[2]) * percent),
  ];
  return newRGB.reduce((acc, int) => {
    let hex = int.toString(16);
    hex = hex.length === 1 ? `0${hex}` : hex;
    return `${acc}${hex}`;
  }, "");
};

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