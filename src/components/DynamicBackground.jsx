import React, { useEffect, useState } from 'react';
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

const getColorByTime = () => {
  const date = new Date();
  const day = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
  const time = date.getTime() - day.getTime();
  const timeInMinutes = Math.floor(Math.floor(time / 1000) / 60);
  console.log(timeInMinutes);
  // "#00000c" // rgba(0,0,12,0);
  // "#020111" // rgba(2,1,17,0);
  // "#020111" // rgba(2,1,17,0);
  // "#020111" // rgba(2,1,17,0);
  // "#20202c" // rgba(32,32,44,0.5);
  // "#40405c" // rgba(64,64,92,.8);
  // "#4a4969" // rgb(74,73,105);
  // "#757abf" // rgb(117,122,191);
  // "#82addb" // rgb(130,173,219);
  // "#94c5f8" // rgb(148,197,248);
  // "#b7eaff" // rgb(183,234,255);
  // "#90dffe" // rgb(144,223,254);
  // "#57c1eb" // rgb(87,193,235);
  // "#2d91c2" // rgb(45,145,194);
  // "#2473ab" // rgb(36,115,171);
  // "#1e528e" // rgb(30,82,142);
  // "#1e528e" // rgb(30,82,142);
  // "#154277" // rgb(21,66,119);
  // "#163c52" // rgba(22,60,82,0.8);
  // "#071b26" // rgba(7,27,38,.5);
  // "#010a10" // rgba(1,10,16,.3);
  // "#090401" // rgba(9,4,1,0);
  // "#00000c" // rgba(0,0,12,0);
  // "#00000c" // rgba(0,0,12,0);
};

const DynamicBackground = (props) => {
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    const interval = setInterval(() => {
      setColor((prev) => {
        return prev;
      });
      //getColorByTime();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="background" style={props.style || { background: color }}>
      <svg className="background-svg">
      </svg>
    </div>
  );
};

export default DynamicBackground;