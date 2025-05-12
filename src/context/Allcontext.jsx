import { createContext, useContext, useEffect, useState } from "react";
import Loader from "../utilis/Loader";

const AllContext = createContext();

export const AllProvider = ({ children }) => {

    const [firstRefresh, setFirstrefresh] = useState(0)
    const [reporterData, setReporterdata] = useState()
    const [location, setLocation] = useState([])
    const [heroData, setHerodata] = useState([])
    const [ourData, setOurdata] = useState()
    const [fallbackVideo, setFallbackVideo] = useState(null)
    const [allCtg, setAllctg] = useState([])
    const [active, setActive] = useState({
        to: 0
    })
    const [liveData, setLivedata] = useState([])
    const [loading, setLoading] = useState(false)
    const [menu, setMenu] = useState([])
    const [menu2, setMenu2] = useState([])
    const [allShorts, setAllshorts] = useState([])
    const [cuurentId, setCuurentId] = useState(null)

    const currentPlaying = localStorage.getItem("current")

    useEffect(() => {
        if (currentPlaying) {
            setCuurentId(currentPlaying)
        }
    }, [cuurentId])

    useEffect(() => {
        const interval = setInterval(() => {
            setFirstrefresh(prev => prev + 1);
        }, 10000); // every 60 seconds

        return () => clearInterval(interval); // clean up on unmount
    }, []);

    return (
        <AllContext.Provider value={{ cuurentId, setCuurentId, allShorts, setAllshorts, menu, setMenu, menu2, setMenu2, loading, setLoading, liveData, setLivedata, allCtg, setAllctg, active, setActive, firstRefresh, setFirstrefresh, fallbackVideo, setFallbackVideo, reporterData, setReporterdata, location, setLocation, heroData, setHerodata, ourData, setOurdata }}>
            {/* {loading && <Loader />} */}
            {children}
        </AllContext.Provider>
    );
};

// ✅ Ensure This Function is AFTER Context Declaration
export const useMyContext = () => {
    return useContext(AllContext);
};