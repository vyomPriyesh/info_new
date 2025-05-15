import React, { useEffect, useRef, useState } from 'react'
import Nameplate from '../utilis/Nameplate';
import Location from '../utilis/Location';
import Redbanner from '../utilis/Redbanner';
import { GoMute, GoUnmute } from 'react-icons/go';
import { useMyContext } from '../context/Allcontext';

const Modalyoutubeplayer = ({ type, data, heroData, location }) => {

    const instanceId = useRef(`yt-${Math.random().toString(36).substr(2, 9)}`).current;

    const [isMuted, setIsMuted] = useState(true);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const playerRef = useRef(null);
    const [names, setName] = useState({})
    const { logo } = useMyContext();


    const [isShrunk, setIsShrunk] = useState(false);

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

    // useEffect(() => {
    //   if (type !== 1) return;

    //   const handleScroll = () => {
    //     const scrollY = window.scrollY;
    //     setIsScrolled(scrollY > playerRef_2.current);
    //     playerRef_2.current = scrollY;
    //   };

    //   // const handleScroll = throttle(() => {
    //   //   const scrollY = window.scrollY;
    //   //   setScrolly(scrollY)
    //   //   setIsScrolled(scrollY > scrolly); // Adjust threshold as needed
    //   // }, 2000); // Adjust throttle delay (in ms)

    //   window.addEventListener('scroll', handleScroll);

    //   // Cleanup on component unmount
    //   return () => window.removeEventListener('scroll', handleScroll);

    // }, [type]);



    const onPlayerReady = (event) => {
        // Optional: Do something when player is ready
    };

    const onPlayerStateChange = (event) => {
        // setName([])
        if (event.data === YT.PlayerState.ENDED) {
            // Calculate next index (loop back to 0 if at the end)
            const nextIndex = (currentVideoIndex + 1) % heroData.length;
            setCurrentVideoIndex(nextIndex);

            // Load the next video (or restart from first if looped)
            playerRef.current.loadVideoById(heroData[nextIndex]?.details);

            const loopedBackToStart = nextIndex === 0;

            // if (loopedBackToStart) {
            //     setHerodata([])
            //     setTitle(""); // Reset title when all videos are completed
            // }

            // If we looped back to the first video, you can add a delay or trigger an event
            // if (nextIndex === 0) {
            // console.log("Playlist looped back to the start!");
            // Optional: Add a delay before restarting
            // await new Promise(resolve => setTimeout(resolve, 2000));
            // }
        }
    };

    const onYouTubeIframeAPIReady = () => {
        // setName([])
        if (!document.getElementById(`youtube-player${instanceId}`)) return;

        playerRef.current = new window.YT.Player(`youtube-player${instanceId}`, {
            videoId: heroData[currentVideoIndex]?.details,
            playerVars: {
                autoplay: 1,
                mute: isMuted ? 1 : 0,
                controls: 1,
                modestbranding: 1,
                rel: 0,
                loop: 0,
            },
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange,
            },
        });
        const fileterd = heroData.find(list => list.details === heroData[currentVideoIndex].details)
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
    }, [heroData, currentVideoIndex]);


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

    // console.log(names)
    // console.log(heroData)


    return (
        <div className='relative overflow-hidden'>
            {logo &&
                <img loading="lazy" className='md:h-16 md:w-16 h-10 w-10 absolute aspect-square right-2 top-3 logo z-50' src={logo} />
            }
            <div
                // ref={playerRef_2}
                // className={`flex transition-all  duration-1000 ease-in-out justify-center place-items-center mt-1  
                // ${type == 1 ? (isScrolled ? 'h-[240px]' : 'h-[620px]') :
                //   type === 2 ? 'h-[620px]' : 'h-[240px]'
                //   }
                //   `}>
                className={`flex transition-all duration-500 ease-in-out overflow-hidden justify-center w-full place-items-center mt-1  
        ${type == 3 ? isShrunk ? 'h-[240px]' : 'h-[350px]' : 'h-[240px]'} `}
            >
                {/* <iframe width="100%" height="240" src={`https://www.youtube.com/embed/${heroData}?enablejsapi=1&rel=0&amp;autoplay=1&mute=${mute ? '1':'0'}&controls=0&modestbranding=1`} className=" not-allowed"
                        allow="autoplay;  encrypted-media;"
                        allowFullScreen ></iframe> */}
                <div
                    id={`youtube-player${instanceId}`}
                    className={`w-full h-full`}
                ></div>
            </div>
            <button className="absolute bg-white aspect-square left-0 bottom-10 text-2xl p-1" onClick={toggleMute}>{isMuted ? <GoMute /> : <GoUnmute />}</button>
            <Nameplate data={names} />
            <Location data={location} />
            <Redbanner data={data} />
        </div>
    );
};

export default Modalyoutubeplayer
