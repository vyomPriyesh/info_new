import React, { useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';

const Check = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      // Adjust scroll trigger as needed
      if (offset > 100) {
        setIsShrunk(true);
      } else {
        setIsShrunk(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const opts = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 1,
      controls: 1,
      modestbranding: 1,
      rel: 0,
    },
  };

  return (
    <div className="sticky top-0 z-50 bg-white">
      <div
        ref={containerRef}
        className={`transition-all duration-500 ease-in-out overflow-hidden`}
        style={{
          height: isShrunk ? '240px' : '640px',
        }}
      >
        <YouTube
          videoId="HD7-SX0zSEw"
          opts={opts}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default Check;
