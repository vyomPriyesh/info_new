import React, { useEffect, useRef, useState } from 'react';
import { useMyContext } from '../context/Allcontext';
import ReactPlayer from 'react-player';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

// 👇 Child component only re-renders if videoId changes
const MemoizedPlayer = React.memo(({ videoId, muted, onEnded }) => {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    const playerRef = useRef(null);

    return (
        <ReactPlayer
            ref={playerRef}
            url={url}
            width="100%"
            height="100%"
            playing
            muted={muted}
            onEnded={onEnded}
        />
    );
});


const Customeplayer = ({ videoId }) => {
    const { setCuurentId, setFirstrefresh } = useMyContext();
    const [muted, setMuted] = useState(true);
    const [currentVideoId, setCurrentVideoId] = useState(videoId);

    useEffect(() => {
        if (videoId && videoId !== currentVideoId) {
            setCurrentVideoId(videoId);
            setCuurentId(videoId)
        }
    }, [videoId, currentVideoId]);

    const toggleMute = () => setMuted((prev) => !prev);

    return (
        <div className="relative w-full h-full">
            <div className="w-full h-[240px]">
                <MemoizedPlayer onEnded={() => setFirstrefresh(prev => prev + 1)} videoId={currentVideoId} muted={muted} />
            </div>
            <button
                onClick={toggleMute}
                className="absolute bottom-5 left-0 bg-white p-2  text-xl z-50"
                title={muted ? "Unmute" : "Mute"}
            >
                {muted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
        </div>
    );
};

export default Customeplayer;
