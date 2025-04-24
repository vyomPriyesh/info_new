import React, { useEffect, useRef, useState } from 'react'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { IoShareSocial } from 'react-icons/io5';
import { RiFacebookFill } from 'react-icons/ri'
import { useMyContext } from '../context/Allcontext';

const Reporterdata = ({  }) => {

    const {reporterData} = useMyContext();

    const protocol = window.location.protocol;  // 'http:' or 'https:'
    const host = window.location.hostname;      // e.g., '192.168.29.202'
    const port = window.location.port;
    const [share, setShare] = useState(false)

    const dropdownRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShare(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        reporterData &&
        <div className="p-3">
            <div className='p-3 w-full shadow-[0_0px_10px_0px_gray] rounded-lg '>
                {/* <div className="flex justify-end" ref={dropdownRef}>
                    <button onClick={() => setShare(!share)} className="text-lg text-blue-500 relative ">
                        <IoShareSocial />
                        {share &&
                            <div
                                className="absolute flex rounded-md z-40 flex-row gap-3 text-2xl left-0 -translate-x-[100%] top-7 bg-white border border-gray-300 p-2">
                                <a
                                    target='_blank'
                                    href={`https://api.whatsapp.com/send?text=${protocol}//${host}${port ? `:${port}` : ''}/?rid=${reporterData?.id}`}
                                    id="whatsapp-share"
                                    className="text-green-600"><FaWhatsapp /></a>
                                
                            </div>
                        }
                    </button>
                </div> */}
                <div className="flex flex-col gap-2 justify-center place-items-center">
                    {reporterData?.image ?
                        <img loading="lazy" id="profile_5" src={`${reporterData?.image_path}/${reporterData?.image}`}
                            className="aspect-square w-48 object-cover" alt="" />
                        :
                        <img loading="lazy" id="profile_5" src={`https://ui-avatars.com/api/?name=${reporterData?.name}&size=20`}
                            className="aspect-square w-48 object-cover" alt="" />
                    }
                    <div className="flex flex-col gap-1 w-full place-items-center">
                        {reporterData?.name &&
                            <h1 className='font-semibold text-lg'><span className='font-normal text-sm'>Name : </span>{reporterData?.name}</h1>
                        }
                        {reporterData?.email &&
                            <span className='text-sm'><span className='font-normal text-sm'>E-mail : </span>{reporterData?.email}</span>
                        }
                        {reporterData?.mobile &&
                            <span className='text-sm'><span className='font-normal text-sm'>Mobile No. : </span>{reporterData?.mobile}</span>
                        }
                        {/* {reporterData?.address &&
                            <span className='text-sm'><span className='font-normal text-sm'>Address : </span>{reporterData?.address}</span>
                        }
                        {reporterData?.whatsapp &&
                            <span className='text-sm'><span className='font-normal text-sm'>Whatsapp No. : </span>{reporterData?.whatsapp}</span>
                        } */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reporterdata
