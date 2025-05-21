import React, { useState, useRef, useEffect } from 'react';
import Location from '../utilis/Location';
import Redbanner from '../utilis/Redbanner';
import { GoMute, GoUnmute } from 'react-icons/go';
import Nameplate from '../utilis/Nameplate';
import { useMyContext } from '../context/Allcontext';

const YouTubePlayer = ({ type, data }) => {

  const { heroData, setFirstrefresh, location, logo } = useMyContext();

  const [isMuted, setIsMuted] = useState(true);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [locationShow, setLocationShow] = useState(false);
  const [nameShow, setNameShow] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false);
  const [names, setNames] = useState([]);

  const playerRef = useRef(null);
  const instanceId = useRef(`yt-${Math.random().toString(36).substr(2, 9)}`).current;

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsShrunk(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Player Ready
  const onPlayerReady = () => {
    setLocationShow(false);
    setNameShow(false);
  };

  // Player State Change
  const onPlayerStateChange = (event) => {
    if (event.data === YT.PlayerState.ENDED) {
      const nextIndex = (currentVideoIndex + 1) % heroData.length;
      setCurrentVideoIndex(nextIndex);
      playerRef.current.loadVideoById(heroData[nextIndex]?.details);
      if (nextIndex === 0) setFirstrefresh(prev => prev + 1);
    }
  };

  // Initialize Player
  const initPlayer = () => {
    if (!document.getElementById(`youtube-player${instanceId}`)) return;

    const currentVideo = heroData[currentVideoIndex];

    playerRef.current = new window.YT.Player(`youtube-player${instanceId}`, {
      videoId: currentVideo?.details,
      playerVars: {
        autoplay: 1,
        mute: isMuted ? 1 : 0,
        controls: 1,
        modestbranding: 1,
        rel: 0,
        fs: 0,
        iv_load_policy: 3,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });

    const authors = [currentVideo?.name_1, currentVideo?.name_2, currentVideo?.name_3].filter(Boolean);
    setNames(authors);
  };

  // Load YouTube API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      window[`onYouTubeIframeAPIReady_${type}`] = initPlayer;
    } else {
      initPlayer();
    }

    return () => {
      playerRef.current?.destroy();
      delete window[`onYouTubeIframeAPIReady_${type}`];
    };
  }, [heroData, currentVideoIndex]);

  // Toggle mute
  const toggleMute = () => {
    if (playerRef.current?.getPlayerState) {
      isMuted ? playerRef.current.unMute() : playerRef.current.mute();
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative overflow-hidden hh">
      {logo && (
        <img
          loading="lazy"
          className="md:h-16 md:w-16 h-10 w-10 absolute top-2 right-2 aspect-square"
          src={logo}
          alt="Logo"
        />
      )}

      <div className={`flex justify-center items-center w-full overflow-hidden transition-all duration-500 ${type === 3 ? (isShrunk ? 'h-[240px]' : 'h-[450px]') : 'h-[240px]'}`}>
        <div id={`youtube-player${instanceId}`} className="w-full h-full" />
      </div>

      <button className="absolute left-0 bottom-10 bg-white p-1 text-2xl" onClick={toggleMute}>
        {isMuted ? <GoMute /> : <GoUnmute />}
      </button>

      <Nameplate data={names} />
      <Location data={location} />
      <Redbanner data={data} />
    </div>
  );
};

export default YouTubePlayer;
