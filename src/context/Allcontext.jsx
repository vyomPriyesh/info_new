import { createContext, useContext, useState } from "react";
import Loader from "../utilis/Loader";

const AllContext = createContext();

export const AllProvider = ({ children }) => {

    const [firstRefresh, setFirstrefresh] = useState(0)
    const [refresh, setRefresh] = useState(0)
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

    return (
        <AllContext.Provider value={{ menu, setMenu, menu2, setMenu2, loading, setLoading, refresh, setRefresh, liveData, setLivedata, allCtg, setAllctg, active, setActive, firstRefresh, setFirstrefresh, fallbackVideo, setFallbackVideo, reporterData, setReporterdata, location, setLocation, heroData, setHerodata, ourData, setOurdata }}>
            {/* {loading && <Loader />} */}
            {children}
        </AllContext.Provider>
    );
};

// ✅ Ensure This Function is AFTER Context Declaration
export const useMyContext = () => {
    return useContext(AllContext);
};