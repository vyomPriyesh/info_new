import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import Location from '../utilis/Location';
import { GoMute, GoUnmute } from 'react-icons/go';
import Redbanner from '../utilis/Redbanner';

const YouTubePlayer2 = ({ heroData, location, profile, data }) => {
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

    return 'T9A3N7OPUt8'; // fallback video
  };

  // Set the video on mount and update every 1 minute
  useEffect(() => {
    const updateVideo = () => {
      const newVideoId = getCurrentVideo();
      if (newVideoId && newVideoId !== currentVideoId) {
        setCurrentVideoId(newVideoId);
      }
    };

    updateVideo(); // Initial check
    const interval = setInterval(updateVideo, 60000); // Check every minute

    return () => clearInterval(interval); // Clean up on unmount
  }, [heroData]); // only re-run if heroData changes

  const onReady = (event) => {
    setPlayer(event.target);
    isMuted ? event.target.mute() : event.target.unMute();
    event.target.playVideo();
  };

  const toggleMute = () => {
    if (!player) return;
    isMuted ? player.unMute() : player.mute();
    setIsMuted(!isMuted);
  };

  return (
    <div className='relative overflow-hidden'>
      {profile?.logo &&
        <img loading="lazy" className='md:h-16 md:w-16 h-10 w-10 absolute aspect-square right-2 top-2 logo' src={profile?.logo} />
      }
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
      <button className="absolute bg-white aspect-square left-0 bottom-10 z-50 text-2xl p-1" onClick={toggleMute}>{isMuted ? <GoMute /> : <GoUnmute />}</button>
      {/* <Nameplate data={names} /> */}
      <Location data={location} />
      <Redbanner data={data} />
    </div>
  );
};

export default YouTubePlayer2;
