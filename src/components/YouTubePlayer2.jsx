import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';

const YouTubePlayer2 = ({ heroData }) => {

  const [isMuted, setIsMuted] = useState(true);
  const [currentVideoId, setCurrentVideoId] = useState('T9A3N7OPUt8');
  const [player, setPlayer] = useState(null);

  const getCurrentVideo = () => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    for (const v of heroData) {
      const [startHour, startMin] = v?.scheduled_at?.split(':').map(Number);
      const [endHour, endMin] = v?.end_at?.split(':').map(Number);
      const start = startHour * 60 + startMin;
      const end = endHour * 60 + endMin;

      if (currentMinutes >= start && currentMinutes <= end) {
        return v.video;
      }
    }

    return 'T9A3N7OPUt8'; // fallback
  };

  // Update current video based on time
  useEffect(() => {
    const updateVideo = () => {
      const newVideoId = getCurrentVideo();
      if (newVideoId !== currentVideoId) {
        setCurrentVideoId(newVideoId);
      }
    };

    updateVideo(); // initial check
    const interval = setInterval(updateVideo, 60000);
    return () => clearInterval(interval);
  }, [currentVideoId]);

  const onReady = (event) => {
    setPlayer(event.target);
    if (isMuted) {
      event.target.mute();
    } else {
      event.target.unMute();
    }
    event.target.playVideo();
  };

  const toggleMute = () => {
    if (!player) return;
    if (isMuted) {
      player.unMute();
    } else {
      player.mute();
    }
    setIsMuted(!isMuted);
  };

  return (
    <div className='w-full'>
      <YouTube
        videoId={currentVideoId}
        onReady={onReady}
        opts={{
          width: '100%',
          height: '240px',
          playerVars: {
            autoplay: 1,
            controls: 1,
            modestbranding: 1,
            rel: 0,
          },
        }}
      />
      {/* <button onClick={(toggleMute)}>
        {isMuted ? 'Unmute' : 'Mute'}
      </button> */}
    </div>
  );
};

export default YouTubePlayer2;
