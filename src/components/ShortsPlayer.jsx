import React, { useRef, useEffect, useState } from "react";
import YouTube from "react-youtube";
import { useInView } from "react-intersection-observer";
import Location from "../utilis/Location";
import Redbanner from "../utilis/Redbanner";
import Nameplate from "../utilis/Nameplate";

const ShortsPlayer = ({ videoId, locations, tickers, authors = [] }) => {
  const playerRef = useRef(null);
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: false });

  const [playerReady, setPlayerReady] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // 🔇 Mute state
  const [showIcon, setShowIcon] = useState(false); // 👁 Show icon state

  const onPlayerReady = (event) => {
    playerRef.current = event.target;
    event.target.mute(); // Start muted
    setPlayerReady(true);
  };

  useEffect(() => {
    if (!playerReady || !playerRef.current || !videoId) return;
    if (inView) {
      playerRef.current.playVideo();
    } else {
      playerRef.current.pauseVideo();
    }
  }, [inView, playerReady, videoId]);

  const handleToggleMute = () => {
    if (!playerRef.current) return;

    if (isMuted) {
      playerRef.current.unMute();
    } else {
      playerRef.current.mute();
    }

    setIsMuted(!isMuted);
    setShowIcon(true);

    // Hide icon after 1 second
    setTimeout(() => setShowIcon(false), 1000);
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
      playlist: videoId,
    },
  };

  if (!videoId || typeof videoId !== "string") {
    console.error("Invalid videoId:", videoId);
    return null;
  }

  return (
    <div ref={ref} className="relative" onClick={handleToggleMute}>
      <div className="h-dvh">
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onPlayerReady}
          className="h-full w-full"
        />
      </div>

      {/* 🔇/🔊 Icon in center */}
      {showIcon && (
        <div className="absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl bg-black bg-opacity-50 rounded-full p-4 pointer-events-none">
          {isMuted ? "🔇" : "🔊"}
        </div>
      )}

      <Location data={locations} />
      <Redbanner data={tickers} />
      <div className="absolute top-2/3 z-50 right-0">
        <Nameplate data={authors} />
      </div>
    </div>
  );
};

export default ShortsPlayer;
