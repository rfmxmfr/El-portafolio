import React from 'react';
import MoodboardCard from './MoodboardCard';
import ColorPalette from './ColorPalette';
import './styles.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="hero">
        <h1>Inspire Your Vision</h1>
        <p>Curated moodboards and color stories for creative professionals.</p>
      </header>

      <section className="moodboard-gallery">
        <MoodboardCard image="/images/mood1.jpg" title="Modern Minimalism" />
        <MoodboardCard image="/images/mood2.jpg" title="Earthy Elegance" />
        <MoodboardCard image="/images/mood3.jpg" title="Bold Contrast" />
      </section>

      <section className="palette-section">
        <h2>Brand Color Palette</h2>
        <ColorPalette colors={['#D8CFC4', '#A39193', '#E3D0B8', '#C3B299', '#7E6651']} />
      </section>
    </div>
  );
};

export default HomePage;
