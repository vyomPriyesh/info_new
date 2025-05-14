import React, { useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';
import { useMyContext } from '../context/Allcontext';
import { GoMute, GoUnmute } from 'react-icons/go';
import Customeplayer from './Customeplayer';
import { AnimatePresence, motion } from 'framer-motion';
import Redbanner from '../utilis/Redbanner';
import Location from '../utilis/Location';


const YoutubeLive = () => {

    const { liveData, logo } = useMyContext();

    const [location, setLocation] = useState([])

    useEffect(() => {
        setLocation([liveData[0]?.live_location])
    }, [liveData[0]?.live_location])

    return (
        <div className="relative overflow-hidden hh">
            {/* {logo &&
                <img loading="lazy" className='md:h-16 md:w-16 h-10 w-10 absolute aspect-square right-2 top-2 logo z-50' src={logo} />
            } */}
            {liveData?.[0]?.live_link && (
                <Customeplayer videoId={liveData[0].live_link} />
            )}
            <Location data={location} />
            <Redbanner data={[liveData[0]?.live_title]} />
        </div>
    );
};

export default YoutubeLive;
