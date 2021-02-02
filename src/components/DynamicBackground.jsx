import React from 'react';
import './DynamicBackground.scss';

const DynamicBackground = (props) => {
  return (
    <div className="background" style={props.style || {}}>
      
    </div>
  );
};

export default DynamicBackground;