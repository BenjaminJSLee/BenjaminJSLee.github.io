import React from 'react';
import useDynamicBackground from '../hooks/useDynamicBackground';
import './DynamicBackground.scss';

const DynamicBackground = (props) => {
  const {
    clouds,
    delay,
  } = useDynamicBackground();

  return (
    <div className="background-container">
      <div className="background" style={{ animationDelay: `-${delay}ms` }}>
        <div className="background-svg" >
          <div className="satellites">
            <div className="sun" style={{ animationDelay: `-${delay + 64800000}ms` }}>
              <svg><circle cx="50" cy="50" r="50"/></svg>
            </div>
            <div className="moon" style={{ animationDelay: `-${delay + 21600000}ms` }}>
              <svg><circle cx="50" cy="50" r="50"/></svg>
            </div>
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