import React, { useEffect, useRef, useState } from 'react'
import { BsFillShareFill } from "react-icons/bs";
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { RiFacebookFill } from 'react-icons/ri';
import { styled, Tooltip, Typography } from '@mui/material';
import { IoShareSocial } from 'react-icons/io5';


const Usercardui = ({ data, share, shareId }) => {

    const [open, setOpen] = useState(false);

    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} arrow />
    ))(({ theme }) => ({
        '& .MuiTooltip-tooltip': {
            backgroundColor: 'white',
            color: 'black',
            fontSize: '0.7rem !important',
            borderRadius: '5px',
            boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.19), 0px 3px 6px rgba(0, 0, 0, 0.23)',
        },
        '& .MuiTooltip-arrow': {
            color: 'white', // Must match tooltip background
            '&:before': {
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' // Optional shadow for arrow
            }
        },
    }));

    const dropdownRef = useRef();

    const protocol = window.location.protocol;
    const host = window.location.hostname;
    const port = window.location.port;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const shareUrl = `${protocol}//${host}${port ? `:${port}` : ''}/?${shareId}=${data?.id}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`;

    return (
        <>
            <div className="p-3">
                <div className='p-3 w-full shadow-[0_0px_10px_0px_gray] rounded-lg '>
                    {/* {data?.press_id &&
                        <div className="flex flex-row gap-3 ">
                            {tabs.map((list, i) => (
                                <button onClick={() => setActiveTab(list)} className={`${activeTab == list ? ' border-black' : 'border-transparent'} transition-all duration-300 ease-in-out border-b`} key={i}>{list}</button>
                            ))}
                        </div>
                    } */}
                    <div className="flex flex-row gap-2 justify-center place-items-start ">
                        <div className="w-full">
                            {/* {data?.press_id ?
                                <div className="my-5">
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
                                : */}
                            {data?.image ?
                                <img loading="lazy" id="profile_5" src={`${data?.image_path}`}
                                    className="aspect-square w-full object-cover" alt="" />
                                :
                                <img loading="lazy" id="profile_5" src={`https://ui-avatars.com/api/?name=${data?.name}&size=20`}
                                    className="aspect-square w-full object-cover" alt="" />
                            }
                            {/* } */}
                        </div>
                        <div className="flex flex-col gap-1 w-full place-items-start">
                            {data?.name &&
                                <div className="flex flex-col place-items-center w-full">
                                    <span className='font-normal text-neutral-400 text-sm '>Name</span>
                                    <span className='font-semibold text-lg line-clamp-2'>{data?.name}</span>
                                </div>
                            }
                            {data?.desegregation &&
                                <div className="flex flex-col place-items-center w-full">
                                    <span className='font-normal text-neutral-400 text-sm '>Desegregation</span>
                                    <span className='font-semibold text-lg line-clamp-2'>{data?.desegregation}</span>
                                </div>
                            }
                            {/* {data?.desegregation &&
                                <span className='text-sm'><span className='font-normal text-sm'>Desegregation : </span>{data?.desegregation}</span>
                            } */}
                            {/* {data?.experience &&
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
                            } */}
                            {data?.experience &&
                                <div className="flex flex-col place-items-center w-full">
                                    <span className='font-normal text-neutral-400 text-sm '>Experience</span>
                                    <span className='text-lg line-clamp-2'>{data?.experience}</span>
                                </div>
                            }
                            {data?.mobile &&
                                <div className="flex flex-col place-items-center w-full">
                                    <span className='font-normal text-neutral-400 text-sm '>Mobile No</span>
                                    <span className='text-sm'>{data?.mobile}</span>
                                </div>
                            }
                            {/* {data?.name &&
                                <div className="flex flex-col place-items-center w-full">
                                    <span className='font-normal text-neutral-400 text-sm '>Desegregation</span>
                                    <span className='text-lg line-clamp-2'>{data?.desegregation}</span>
                                </div>
                            } */}
                            {/* {data?.name &&
                                <div className="flex flex-col place-items-center w-full">
                                    <span className='font-normal text-neutral-400 text-sm '>Desegregation</span>
                                    <span className='text-lg line-clamp-2'>{data?.desegregation}</span>
                                </div>
                            } */}

                        </div>
                    </div>
                    <div className="mt-2 flex flex-row justify-between gap-5 place-items-start">
                        <div className="space-y-2">
                            {data?.email &&
                                <div className="flex flex-row gap-2  place-items-center w-full">
                                    <span className='font-normal text-neutral-400 text-sm '>E-mail</span>
                                    <span className='text-sm line-clamp-2'>{data?.email}</span>
                                </div>
                            }
                            {data?.city &&
                                <div className="flex flex-row  gap-2 place-items-center w-full">
                                    <span className='font-normal text-neutral-400 text-sm '>Location</span>
                                    <span className='text-sm line-clamp-2'>{data?.city}</span>
                                </div>
                            }
                        </div>
                        {share &&
                            <HtmlTooltip
                                open={open}
                                // onClose={() => setShare(false)}
                                className={'z-important'}
                                title={
                                    <Typography color="inherit">
                                        <div ref={dropdownRef}
                                            className={`
                                                    flex flex-row gap-6  text-4xl
                                                    bg-white
                                                `}
                                        >
                                            <a
                                                target='_blank'
                                                href={whatsappUrl}
                                                // data-title={title}
                                                // data-description={moreData}
                                                data-image={data?.image_path}
                                                data-url={whatsappUrl}
                                                id="whatsapp-share"
                                                className="text-green-600"
                                            >
                                                <FaWhatsapp />
                                            </a>
                                            <a href="#" className="text-yellow-700"><FaInstagram /></a>
                                            <a href="#" className='text-blue-600'><RiFacebookFill /></a>
                                        </div>

                                    </Typography>
                                }
                            >
                                <button
                                    className=" justify-center place-items-center py-1 text-blue-600 inline-block cursor-pointer"
                                    onClick={() => setOpen(!open)}
                                >
                                    <IoShareSocial />
                                </button>
                            </HtmlTooltip>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Usercardui
