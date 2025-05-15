import React, { useEffect, useState, useRef } from 'react';

const Redbanner = ({ data = [] }) => {
    const [text, setText] = useState(null);
    const indexRef = useRef(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (data.length > 0) {
            setText(data[0]); 
            indexRef.current = 1;

            intervalRef.current = setInterval(() => {
                setText(data[indexRef.current]);
                indexRef.current = (indexRef.current + 1) % data.length;
            }, 7000);

            return () => clearInterval(intervalRef.current); 
        }
    }, [data]);


    return (
        <>
            {text && (
                <div className='flex absolute bottom-1 justify-center place-items-center w-full'>
                    <div className='bg-red-500 banner banner-animation text-white flex justify-center place-items-center px-8'>
                        <span className='line-clamp-1 text-sm'>
                            {text}
                        </span>
                    </div>
                </div>
            )}
        </>
    );
};

export default Redbanner;
