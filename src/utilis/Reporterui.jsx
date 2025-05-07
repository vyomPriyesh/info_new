import React from 'react'

const Reporterui = ({ data }) => {

    return (
        <div className="p-3">
            <div className='p-3 w-full shadow-[0_0px_10px_0px_gray] rounded-lg'>
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
                <div className="flex flex-row gap-2 justify-center place-items-start">
                    {data?.image ?
                        <img loading="lazy" id="profile_5" src={`${data?.image_path}`}
                            className="h-full aspect-square w-40 object-cover" alt="" />
                        :
                        <img loading="lazy" id="profile_5" src={`https://ui-avatars.com/api/?name=${data?.name}&size=20`}
                            className="h-full aspect-square w-40 object-cover" alt="" />
                    }
                    <div className="flex flex-col gap-1 w-full place-items-start">
                        {data?.name &&
                            <h1 className='font-semibold text-lg'><span className='font-normal text-sm'>Name : </span>{data?.name}</h1>
                        }
                        {data?.email &&
                            <span className='text-sm'><span className='font-normal text-sm'>E-mail : </span>{data?.email}</span>
                        }
                        {data?.mobile &&
                            <span className='text-sm'><span className='font-normal text-sm'>Mobile No. : </span>{data?.mobile}</span>
                        }
                        {data?.city &&
                            <span className='text-sm'><span className='font-normal text-sm'>City : </span>{data?.city}</span>
                        }
                        {/*
                        {data?.whatsapp &&
                            <span className='text-sm'><span className='font-normal text-sm'>Whatsapp No. : </span>{data?.whatsapp}</span>
                        } */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reporterui
