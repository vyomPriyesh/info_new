import React, { useEffect, useState } from 'react'
import { IoLocationSharp } from 'react-icons/io5'

const Location = ({ data = [] }) => {

    const [text, setText] = useState(null)
    const [refresh, setRefresh] = useState(0)

    const delay2 = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const loopWithDelay = async () => {
        for (let i = 0; i < data.length; i++) {
            setText(data[i]);
            await delay2(5000);
            if (i + 1 == data.length) {
                setRefresh((prev) => prev + 1)
            }
        }
    };

    useEffect(() => {
        loopWithDelay()
    }, [data?.length > 0, refresh])

    return (
        <>
            {text &&
                <div className={`flex flex-row gap-2 px-1 overflow-hidden top-2 bg-white  absolute location pe-10 justify-center place-items-center capitalize`}>
                    <IoLocationSharp className='text-red-500' />
                    <h1>{text}</h1>
                </div>
            }
        </>
    )
}

export default Location