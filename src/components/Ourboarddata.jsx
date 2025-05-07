import React from 'react'
import { useMyContext } from '../context/Allcontext';
import Ourboardui from '../utilis/Ourboardui';

const Ourboarddata = () => {

    const { ourData } = useMyContext();
    return (
        ourData &&
        <Ourboardui data={ourData} />
    )
}

export default Ourboarddata
