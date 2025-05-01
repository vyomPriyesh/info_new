import React, { useEffect, useState } from 'react'
import { IoLocationSharp } from 'react-icons/io5'

const Location = ({ data = [] }) => {

    const [text, setText] = useState(null)

    const delay2 = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    useEffect(() => {
        let isCancelled = false;

        const loopWithDelay = async () => {
            await delay2(5000);

            while (!isCancelled) {
                for (let i = 0; i < data.length && !isCancelled; i++) {
                    setText(data[i]);
                    await delay2(5000);
                }

                setText(null);
                await delay2(5000);
            }
        };

        loopWithDelay();

        return () => {
            isCancelled = true;
        };
    }, [data]);

    return (
        <>
            {text &&
                <div
                    // data-aos="fade-right" 
                    key={text} className={`flex flex-row gap-2 px-1 overflow-hidden top-2 bg-white absolute location pe-10 justify-center place-items-center capitalize`}>
                    <IoLocationSharp className='text-red-500' />
                    <h1 className='text-sm '>{text}</h1>
                </div>
            }
        </>
    )
}

export default Location