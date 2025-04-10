import React, { useState, useRef, useEffect } from 'react';
import Location from '../utilis/Location';
import Redbanner from '../utilis/Redbanner';
import { GoMute, GoUnmute } from 'react-icons/go';
import Nameplate from '../utilis/Nameplate';

const YouTubePlayer = ({ videoIds, profile, location, data, type }) => {

  const instanceId = useRef(`yt-${Math.random().toString(36).substr(2, 9)}`).current;

  const [isMuted, setIsMuted] = useState(true);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const playerRef = useRef(null);
  const [names, setName] = useState({})
  const [isScrolled, setIsScrolled] = useState(false);
  const playerRef_2 = useRef(null);


  useEffect(() => {
    if (type !== 1) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > playerRef_2.current); 
      playerRef_2.current = scrollY; 
    };

    // const handleScroll = throttle(() => {
    //   const scrollY = window.scrollY;
    //   setScrolly(scrollY)
    //   setIsScrolled(scrollY > scrolly); // Adjust threshold as needed
    // }, 2000); // Adjust throttle delay (in ms)

    window.addEventListener('scroll', handleScroll);

    // Cleanup on component unmount
    return () => window.removeEventListener('scroll', handleScroll);

  }, [type]);



  const onPlayerReady = (event) => {
    // Optional: Do something when player is ready
  };

  const onPlayerStateChange = (event) => {
    if (event.data === YT.PlayerState.ENDED) {
      // Calculate next index (loop back to 0 if at the end)
      const nextIndex = (currentVideoIndex + 1) % videoIds.length;
      setCurrentVideoIndex(nextIndex);

      // Load the next video (or restart from first if looped)
      playerRef.current.loadVideoById(videoIds[nextIndex]?.details);

      // If we looped back to the first video, you can add a delay or trigger an event
      // if (nextIndex === 0) {
      // console.log("Playlist looped back to the start!");
      // Optional: Add a delay before restarting
      // await new Promise(resolve => setTimeout(resolve, 2000));
      // }
    }
  };

  const onYouTubeIframeAPIReady = () => {

    if (!document.getElementById(`youtube-player${instanceId}`)) return;

    playerRef.current = new window.YT.Player(`youtube-player${instanceId}`, {
      videoId: videoIds[currentVideoIndex]?.details,
      playerVars: {
        autoplay: 1,
        mute: isMuted ? 1 : 0,
        controls: 0,
        modestbranding: 1,
        rel: 0,
        loop: 0,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
    const fileterd = videoIds.find(list => list.details === videoIds[currentVideoIndex].details)
    let authors = []
    if (fileterd?.name_1) authors.push(fileterd?.name_1);
    if (fileterd?.name_2) authors.push(fileterd?.name_2);
    if (fileterd?.name_3) authors.push(fileterd?.name_3);
    setName(authors)
  };

  useEffect(() => {

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window[`onYouTubeIframeAPIReady_${type}`] = onYouTubeIframeAPIReady;
    } else {
      onYouTubeIframeAPIReady();
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
      delete window[`onYouTubeIframeAPIReady_${type}`];
    };
  }, [videoIds, currentVideoIndex]);


  const toggleMute = () => {
    if (playerRef.current && typeof playerRef.current.getPlayerState === 'function') {
      if (isMuted) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  console.log(videoIds)

  return (
    <div className='relative overflow-hidden'>
      {profile?.logo &&
        <img loading="lazy" className='md:h-16 md:w-16 h-10 w-10 absolute aspect-square right-2 top-2 logo' src={profile?.logo} />
      }
      <div
        // ref={playerRef_2}
        // className={`flex transition-all  duration-1000 ease-in-out justify-center place-items-center mt-1  
        // ${type == 1 ? (isScrolled ? 'h-[240px]' : 'h-[620px]') :
        //   type === 2 ? 'h-[620px]' : 'h-[240px]'
        //   }
        //   `}>
        className={`flex transition-all  duration-1000 ease-in-out justify-center w-full place-items-center mt-1  
        h-[240px]
          `}
          >
        {/* <iframe width="100%" height="240" src={`https://www.youtube.com/embed/${heroData}?enablejsapi=1&rel=0&amp;autoplay=1&mute=${mute ? '1':'0'}&controls=0&modestbranding=1`} className=" not-allowed"
                        allow="autoplay;  encrypted-media;"
                        allowFullScreen ></iframe> */}
        <div
          id={`youtube-player${instanceId}`}
          className={`w-full h-full`}
        ></div>
      </div>
      <button className="absolute bg-white aspect-square left-0 bottom-2 text-2xl p-1" onClick={toggleMute}>{isMuted ? <GoMute /> : <GoUnmute />}</button>
      <Nameplate data={names} />
      <Location data={location} />
      <Redbanner data={data} />
    </div>
  );
};

export default YouTubePlayer;