import React, { useEffect, useState } from 'react'

const Nameplate = ({ data = [] }) => {

    const [text, setText] = useState(null)

    const delay2 = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    useEffect(() => {
        let isCancelled = false;
    
        const loopWithDelay = async () => {
            await delay2(7000);
    
            while (!isCancelled) {
                for (let i = 0; i < data.length && !isCancelled; i++) {
                    setText(data[i]);
                    await delay2(5000);
                }
    
                setText(null);
                await delay2(7000);
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
                <div key={text} data-aos="fade-left"  className={`overflow-hidden name bottom-[27px] right-0 z-50 bg-white absolute flex justify-center place-items-center pe-2 ps-10  capitalize`}>
                    <h1 className='text-center text-sm '>{text}</h1>
                </div>
            }
        </>
    )
}

export default Nameplate
