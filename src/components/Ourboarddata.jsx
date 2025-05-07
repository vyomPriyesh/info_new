import React from 'react'
import { useMyContext } from '../context/Allcontext';
import Usercardui from '../utilis/Usercardui';

const Ourboarddata = () => {

    const { ourData } = useMyContext();
    return (
        ourData &&
        <Usercardui data={ourData} />
    )
}

export default Ourboarddata
