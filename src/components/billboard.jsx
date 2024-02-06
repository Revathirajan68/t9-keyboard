// Billboard.js
import React, { useState, useEffect } from 'react';
import '../App.css';

import Image1 from '../assets/image1.jpg';
import Image2 from '../assets/image2.jpg';
import Image3 from '../assets/image3.jpg';
import Image4 from '../assets/image4.jpg';
import Video1 from '../assets/video1.mp4';
import Video2 from '../assets/video2.mp4';

const assetsData = [
  { type: 'image', source: Image1 },
  { type: 'video', source: Video1 },
  { type: 'image', source: Image2 },
  { type: 'image', source: Image3 },
  { type: 'video', source: Video2 },
  { type: 'image', source: Image4 },
];

const Billboard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % assetsData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="billboard">
      {assetsData.map((asset, index) => (
        <div
          key={index}
          className={`asset ${index === currentIndex ? 'active' : ''}`}
        >
          {asset.type === 'image' && <img src={asset.source} alt={`Asset ${index}`} />}
          {asset.type === 'video' && (
            <video controls autoPlay>
              <source src={asset.source} type="video/mp4"  />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      ))}
    </div>
  );
};

export default Billboard;