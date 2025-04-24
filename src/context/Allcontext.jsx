import { createContext, useContext, useState } from "react";

const AllContext = createContext();

export const AllProvider = ({ children }) => {

    const [firstRefresh, setFirstrefresh] = useState(0)
    const [reporterData, setReporterdata] = useState()
    const [location, setLocation] = useState([])
    const [heroData, setHerodata] = useState([])


    return (
        <AllContext.Provider value={{ firstRefresh, setFirstrefresh, reporterData, setReporterdata, location, setLocation, heroData, setHerodata }}>
            {children}
        </AllContext.Provider>
    );
};

// ✅ Ensure This Function is AFTER Context Declaration
export const useMyContext = () => {
    return useContext(AllContext);
};