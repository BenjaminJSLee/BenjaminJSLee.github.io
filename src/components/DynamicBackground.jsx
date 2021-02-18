import React from 'react';
import useDynamicBackground from '../hooks/useDynamicBackground';
import './DynamicBackground.scss';

const DynamicBackground = (props) => {
  const {
    clouds,
    delay,
    backdrop,
    satellites,
  } = useDynamicBackground();

  return (
    <div className="background-container">
      <div className="background" style={{ animationDelay: `-${delay}ms` }}>
        <div className="background-svg" >
          <div className="satellites">
            {satellites}
          </div>
          <div className="backdrop">
            {backdrop}
          </div>
          <div className="clouds">
            {clouds}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicBackground;