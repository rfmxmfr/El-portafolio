import React from 'react';

const MoodboardCard = ({ image, title }) => {
  return (
    <div className="moodboard-card">
      <img src={image} alt={title} />
      <div className="overlay">
        <h3>{title}</h3>
      </div>
    </div>
  );
};

export default MoodboardCard;
