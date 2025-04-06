import React, { createContext, useState } from 'react'

const Userdata = createContext();

const Userstate = ({ children }) => {

    const [id, setId] = useState('1');

    return (
        <Userdata.Provider value={{ id, setId }}>
            {children}
        </Userdata.Provider>
    )
}

export { Userdata, Userstate };