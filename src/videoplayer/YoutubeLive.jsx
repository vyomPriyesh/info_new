import React, { useRef, useState } from 'react';
import YouTube from 'react-youtube';
import { useMyContext } from '../context/Allcontext';
import { GoMute, GoUnmute } from 'react-icons/go';

const YoutubeLive = () => {
    const { setFirstrefresh, liveData } = useMyContext();
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
            {liveData?.[0]?.live_link && (
                <>
                    <YouTube
                        videoId={liveData[0].live_link}
                        opts={opts}
                        onReady={onReady}
                        onEnd={onEnd}
                    />
                    <button
                        onClick={toggleMute}
                        className="absolute bg-white aspect-square left-0 bottom-10 z-50 text-2xl p-1"
                    >
                        {muted ? <GoMute /> : <GoUnmute />}
                    </button>
                </>
            )}
        </div>
    );
};

export default YoutubeLive;
