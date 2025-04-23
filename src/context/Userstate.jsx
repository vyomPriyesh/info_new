import React, { createContext, useContext, useState } from 'react'

const Userdata = createContext();

export const Userstate = ({ children }) => {

    const [id, setId] = useState('1');

    return (
        <Userdata.Provider value={{ id, setId }}>
            {children}
        </Userdata.Provider>
    )
}

export const useMyContext = () => {
    return useContext(Userdata);
  };
