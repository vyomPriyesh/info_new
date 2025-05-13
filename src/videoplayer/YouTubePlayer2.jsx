// import React, { useEffect, useState } from 'react';
// import YouTube from 'react-youtube';
// import Location from '../utilis/Location';
// import { GoMute, GoUnmute } from 'react-icons/go';
// import Redbanner from '../utilis/Redbanner';
// import { useMyContext } from '../context/Allcontext';

// const YouTubePlayer2 = ({ profile, data }) => {

//   const { location, heroData } = useMyContext();
//   const { setFirstrefresh } = useMyContext();


//   const { fallbackVideo } = useMyContext();

//   const [isMuted, setIsMuted] = useState(true);
//   const [currentVideoId, setCurrentVideoId] = useState(null);
//   const [player, setPlayer] = useState(null);

//   const getCurrentScheduledVideo = () => {
//     const now = new Date();
//     const currentMinutes = now.getHours() * 60 + now.getMinutes();

//     for (const v of heroData) {
//       const [startHour, startMin] = v?.scheduled_at?.split(':').map(Number);
//       const [endHour, endMin] = v?.end_at?.split(':').map(Number);
//       const start = startHour * 60 + startMin;
//       const end = endHour * 60 + endMin;

//       if (currentMinutes >= start && currentMinutes <= end) {
//         return v;
//       }
//     }

//     return null;
//   };

//   // Log every minute
//   useEffect(() => {
//     const logInterval = setInterval(() => {
//       if (currentVideoId?.type === 'day_time' || currentVideoId?.type === 'default') {
//         setFirstrefresh(prev => prev + 1);
//       }
//     }, 60000);
//     return () => clearInterval(logInterval);
//   }, [currentVideoId]);

//   // Set initial video on mount or when heroData updates
//   useEffect(() => {
//     if (!fallbackVideo) return;
//     const scheduledVideo = getCurrentScheduledVideo();

//     if (scheduledVideo) {
//       setCurrentVideoId(scheduledVideo);
//     } else {
//       // const fallbackTimeout = setTimeout(() => {
//       setCurrentVideoId({ video: fallbackVideo });
//       // }, 10000);
//       // return () => clearTimeout(fallbackTimeout);
//     }
//   }, [heroData, fallbackVideo]);

//   // When video is ready
//   const onReady = (event) => {
//     const playerInstance = event.target;
//     setPlayer(playerInstance);

//     const skipSeconds = currentVideoId?.total_duration && currentVideoId?.duration
//       ? currentVideoId.total_duration - currentVideoId.duration
//       : 0;

//     if (skipSeconds > 0) {
//       playerInstance.seekTo(skipSeconds, true);
//     }

//     isMuted ? playerInstance.mute() : playerInstance.unMute();
//     playerInstance.playVideo();
//   };

//   const toggleMute = () => {
//     if (!player) return;
//     isMuted ? player.unMute() : player.mute();
//     setIsMuted(!isMuted);
//   };

//   const onEnd = () => {
//     setFirstrefresh(prev => prev + 1);
//     const scheduledVideo = getCurrentScheduledVideo();

//     setCurrentVideoId('');
//     setTimeout(() => {
//       setCurrentVideoId(scheduledVideo || { video: fallbackVideo });
//     }, 100);
//   };

//   return (
//     <div className='relative overflow-hidden hh'>
//       {profile?.logo && (
//         <img
//           loading="lazy"
//           className='md:h-16 md:w-16 h-10 w-10 absolute aspect-square right-2 top-2 logo'
//           src={profile.logo}
//           alt="logo"
//         />
//       )}

//       {currentVideoId && (
//         <YouTube
//           videoId={currentVideoId?.video}
//           onReady={onReady}
//           onEnd={onEnd}
//           opts={{
//             width: '100%',
//             height: '240px',
//             playerVars: {
//               autoplay: 1,
//               controls: 1,
//               modestbranding: 1,
//               rel: 0,
//             },
//           }}
//         />
//       )}

//       <button
//         className="absolute bg-white aspect-square left-0 bottom-10 z-50 text-2xl p-1"
//         onClick={toggleMute}
//       >
//         {isMuted ? <GoMute /> : <GoUnmute />}
//       </button>

//       {currentVideoId?.video !== fallbackVideo &&
//         <>
//           <Location data={location} />
//           <Redbanner data={data} />
//         </>
//       }
//     </div>
//   );
// };

// export default YouTubePlayer2;


import React, { useEffect, useRef, useState } from 'react'
import { useMyContext } from '../context/Allcontext';
import YouTube from 'react-youtube';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';

const YouTubePlayer2 = ({ profile, data }) => {

  const { location, heroData, cuurentId } = useMyContext();

  const [isMuted, setIsMuted] = useState(true);
  const [player, setPlayer] = useState(null);
  const [nowNext, setNownext] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  // const [videoId, setVideoId] = useState(null);
  const { fallbackVideo } = useMyContext();


  const videoId = heroData[0]?.current_video?.video ?? fallbackVideo;

  // useEffect(() => {
  //   const newVideoId = heroData?.[0]?.current_video?.video;
  //   if (newVideoId) {
  //     localStorage.setItem("current", newVideoId)
  //     setVideoId(newVideoId);
  //   }
  // }, [heroData]);



  useEffect(() => {
    if (heroData.length > 0) {
      const current = heroData?.[0]?.current_video?.name && 'Now : ' + heroData?.[0]?.current_video?.name;
      const next = heroData?.[0]?.next_video?.name && 'Next : ' + heroData?.[0]?.next_video?.name;
      setNownext([current, next].filter(Boolean));
      setCurrentIndex(0);
    }
  }, [heroData]);


  useEffect(() => {
    if (!nowNext.length) return;

    const timer = setInterval(() => {
      setVisible(false); // start exit
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % nowNext.length);
        setVisible(true); // start enter
      }, 2000); // match exit animation duration
    }, 8000); // total cycle every 4s

    return () => clearInterval(timer);
  }, [nowNext]);

  const variants = {
    initial: { x: "-100%", opacity: 1 },
    animate: { x: "0%", opacity: 1 },
    exit: { x: "-100%", opacity: 1 },
  };

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 0,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      fs: 0,
      loop: 1,
      mute: 1,
      disablekb: 1,
      playsinline: 1,
      iv_load_policy: 3,
      playlist: videoId, // loop video
    },
  };

  const onPlayerReady = (event) => {
    setPlayer(event.target);
    event.target.mute(); // default mute
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
    <div className="relative w-full h-full">
      {videoId !== cuurentId &&
        <YouTube
          key={videoId}
          videoId={videoId}
          opts={opts}
          onReady={onPlayerReady}
          className="w-full h-[240px]"
        />
      }

      <button
        onClick={toggleMute}
        className="absolute bottom-5 left-0 bg-white p-2  text-xl z-50"
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
      <AnimatePresence mode="wait">
        {visible && (
          <motion.h1
            key={nowNext[currentIndex]}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="text-black text-sm font-semibold absolute top-3 bg-white h-fit w-fit px-2 line-clamp-1"
          >
            {nowNext[currentIndex]}
          </motion.h1>
        )}
      </AnimatePresence>
    </div>
  )
}

export default YouTubePlayer2
