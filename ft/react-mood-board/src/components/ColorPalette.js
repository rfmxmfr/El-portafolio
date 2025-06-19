import React from 'react';

const ColorPalette = ({ colors }) => {
  return (
    <div className="color-palette">
      {colors.map((color, index) => (
        <div key={index} className="color-block" style={{ backgroundColor: color }} />
      ))}
    </div>
  );
};

export default ColorPalette;
