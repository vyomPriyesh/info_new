import React, { useEffect, useState } from 'react'

const Redbanner = ({ data = [] }) => {

    const [refresh, setRefresh] = useState(0)
    const [text, setText] = useState(null)

    const bannerData = async () => {

        const delay2 = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        for (let i = 0; i < data.length; i++) {
            // await delay2(2000);
            setText(data[i]);
            await delay2(5000);
            if (i + 1 == data.length) {
                setRefresh((prev) => prev + 1)
            }
        }
    };

    useEffect(() => {
        if (data.length > 0) {
            bannerData();
        }
    }, [refresh, data]);

    return (
        <>
        {text &&
            <div className='flex absolute bottom-1 justify-center place-items-center w-full'>
                <div className={`bg-red-500 banner  banner-animation text-white flex justify-center place-items-center px-8`}>
                    <span className='line-clamp-1 text-sm'>
                        {text}
                    </span>
                </div>
            </div>
        }
        </>
    )
}

export default Redbanner