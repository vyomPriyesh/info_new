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
import YouTube from 'react-youtube';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import { useMyContext } from '../context/Allcontext';
import Customeplayer from './Customeplayer';
import { IoLocationSharp } from 'react-icons/io5';
import Redbanner from '../utilis/Redbanner';

const YouTubePlayer2 = () => {

  const { fallbackVideo, heroData, logo, setCuurentId } = useMyContext();

  const [nowNext, setNownext] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [videoId, setVideoId] = useState(null);

  const newVideoId = heroData?.[0]?.current_video?.video ?? fallbackVideo;

  useEffect(() => {
    setVideoId(newVideoId);
    setCuurentId(newVideoId)
  }, [newVideoId]);


  useEffect(() => {
    if (heroData.length > 0) {
      const location = heroData[0]?.current_video?.location && (
        <span className="flex items-center gap-1">
          <h1 className='text-red-500 text-lg'><IoLocationSharp /></h1>
          {heroData[0].current_video.location}
        </span>
      );
      const current = heroData?.[0]?.current_video?.name && 'Now : ' + heroData?.[0]?.current_video?.name;
      const next = heroData?.[1]?.next_video?.name && 'Next : ' + heroData?.[1]?.next_video?.name;
      setNownext([location, current, next].filter(Boolean));
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


  return (
    <div className="relative w-full h-full">
      {logo &&
        <img loading="lazy" className='md:h-16 md:w-16 h-12 w-12 absolute aspect-square right-2 top-2 logo z-50' src={logo} />
      }
      <Customeplayer videoId={videoId} />
      <AnimatePresence mode="wait">
        {visible && (
          <motion.h1
            key={nowNext[currentIndex]}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="text-black text-sm capitalize font-semibold absolute top-2 clipPath bg-white h-fit w-fit ps-2 pe-5 line-clamp-1"
          >
            {nowNext[currentIndex]}
          </motion.h1>
        )}
      </AnimatePresence>
        <Redbanner data={[heroData?.[0]?.current_video?.name]} />

    </div>
  )
}

export default YouTubePlayer2
