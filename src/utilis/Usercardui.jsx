import React, { useState } from 'react'

const Usercardui = ({ data }) => {

    const imgUrl = import.meta.env.VITE_IMAGE_BASEURL;

    const tabs = ['Profile', 'Press ID'];
    const [activeTab, setActiveTab] = useState('Profile')

    return (
        <>
            <div className="p-3">
                <div className='p-3 w-full shadow-[0_0px_10px_0px_gray] rounded-lg '>
                    {data?.press_id && <div className="flex flex-row gap-3 ">
                        {tabs.map((list, i) => (
                            <button onClick={() => setActiveTab(list)} className={`${activeTab == list ? ' border-black' : 'border-transparent'} transition-all duration-300 ease-in-out border-b`} key={i}>{list}</button>
                        ))}
                    </div>}
                    <div className="flex flex-row gap-2 justify-center place-items-start mt-5">
                        <div className="w-full">
                            {data?.press_id ?
                                <div className="mb-5">
                                    {activeTab === tabs[0] ?
                                        data?.image ?
                                            <img loading="lazy" id="profile_5" src={`${data?.image_path}`}
                                                className="aspect-square w-full object-cover" alt="" />
                                            :
                                            <img loading="lazy" id="profile_5" src={`https://ui-avatars.com/api/?name=${data?.name}&size=20`}
                                                className="aspect-square w-full object-cover" alt="" />
                                        :
                                        data?.press_id ?
                                            <img loading="lazy" id="profile_5" src={`${data?.press_path}`}
                                                className="aspect-square w-full object-cover" alt="" />
                                            :
                                            <img loading="lazy" id="profile_5" src={`https://ui-avatars.com/api/?name=${data?.name}&size=20`}
                                                className="aspect-square w-full object-cover" alt="" />
                                    }
                                </div>
                                :
                                data?.image ?
                                    <img loading="lazy" id="profile_5" src={`${data?.image_path}`}
                                        className="aspect-square w-full object-cover" alt="" />
                                    :
                                    <img loading="lazy" id="profile_5" src={`https://ui-avatars.com/api/?name=${data?.name}&size=20`}
                                        className="aspect-square w-full object-cover" alt="" />
                            }
                        </div>
                        <div className="flex flex-col gap-1 w-full place-items-start">
                            {data?.name &&
                                <h1 className='font-semibold text-lg'><span className='font-normal text-sm'>Name : </span>{data?.name}</h1>
                            }
                            {data?.desegregation &&
                                <span className='text-sm'><span className='font-normal text-sm'>Desegregation : </span>{data?.desegregation}</span>
                            }
                            {data?.experience &&
                                <span className='text-sm'><span className='font-normal text-sm'>Experience : </span>{data?.experience}</span>
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Usercardui
