import React, { useRef, useState } from 'react';
import YouTube from 'react-youtube';
import { useMyContext } from '../context/Allcontext';
import { GoMute, GoUnmute } from 'react-icons/go';
import Customeplayer from './Customeplayer';

const YoutubeLive = () => {
    const { setFirstrefresh, liveData, logo } = useMyContext();
    const playerRef = useRef(null);
    const [muted, setMuted] = useState(true);

    const opts = {
        width: '100%',
        height: '240px',
        playerVars: {
            autoplay: 1,
            controls: 1,
            modestbranding: 1,
            rel: 0,
            mute: 1, // ensure initial mute to allow autoplay
        },
    };

    const onReady = (event) => {
        playerRef.current = event.target;
        playerRef.current.mute(); // required for autoplay in most browsers
        playerRef.current.playVideo(); // force play
    };

    const toggleMute = () => {
        if (!playerRef.current) return;

        if (muted) {
            playerRef.current.unMute();
        } else {
            playerRef.current.mute();
        }
        setMuted(!muted);
    };

    const onEnd = () => {
        setFirstrefresh(prev => prev + 1);
    };

    return (
        <div className="relative overflow-hidden hh">
            {logo &&
                <img loading="lazy" className='md:h-16 md:w-16 h-10 w-10 absolute aspect-square right-2 top-2 logo z-50' src={logo} />
            }
            {liveData?.[0]?.live_link && (
                <Customeplayer videoId={liveData[0].live_link} />
            )}
        </div>
    );
};

export default YoutubeLive;
