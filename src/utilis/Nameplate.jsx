import React, { useEffect, useState } from 'react'

const Nameplate = ({ data = [] }) => {

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
                <div className={` px-1 overflow-hidden name bottom-2 right-0 z-30 bg-white  absolute pe-10 justify-center place-items-center capitalize`}>
                    {/* <IoLocationSharp className='text-red-500' /> */}
                    <h1 className='text-center w-full ps-14'>{text?.substring(0, 8)}</h1>
                </div>
            }
        </>
    )
}

export default Nameplate
