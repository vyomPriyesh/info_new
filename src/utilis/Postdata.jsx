import { styled, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet';
import { FaEye, FaInstagram, FaStopwatch, FaWhatsapp } from 'react-icons/fa';
import { IoShareSocial } from 'react-icons/io5';
import { RiFacebookFill } from 'react-icons/ri';
// import Head from 'next/head';

const Postdata = ({ show, title, profile, moreData }) => {


    const [more, setMore] = useState(false)
    const [share, setShare] = useState(false)

    const protocol = window.location.protocol;
    const host = window.location.hostname;
    const port = window.location.port;

    const description = typeof moreData === 'string' ? moreData.replace(/(<([^>]+)>)/gi, '') : ''; // Strip HTML tags

    const updateOGTags = () => {

        // document.querySelector('meta[property="og:title"]').setAttribute("content", title);
        // document.querySelector('meta[property="og:site_name"]').setAttribute("content", 'Info Gujarat');
        // document.querySelector('meta[property="og:description"]').setAttribute("content", description);
        // document.querySelector('meta[property="og:image"]').setAttribute("content", `https://img.youtube.com/vi/${profile?.video_img}/mqdefault.jpg`);
        // document.querySelector('meta[property="og:url"]').setAttribute("content", `${protocol}//${host}${port ? `:${port}` : ''}/?nid=${profile?.share}`);

        // document.querySelector('meta[name="title"]').setAttribute("content", title);
        // document.querySelector('meta[name="site_name"]').setAttribute("content", 'Info Gujarat');
        // document.querySelector('meta[name="description"]').setAttribute("content", description);
        // document.querySelector('meta[name="image"]').setAttribute("content", `https://img.youtube.com/vi/${profile?.video_img}/mqdefault.jpg`);
        // document.querySelector('meta[name="url"]').setAttribute("content", `${protocol}//${host}${port ? `:${port}` : ''}/?nid=${profile?.share}`);
        // document.title = title;
    };

    const shareUrl = `${protocol}//${host}${port ? `:${port}` : ''}/?nid=${profile?.share}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`;

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


    return (
        <>
            {/* <Helmet>
                <title>{title}</title>
                <meta property="og:title" content={title} />
                <meta property="og:site_name" content="Info Gujarat" />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={`https://img.youtube.com/vi/${profile?.video_img}/mqdefault.jpg`} />
                <meta property="og:url" content={shareUrl} />

                <meta name="title" content={title} />
                <meta name="description" content={description} />
                <meta name="image" content={`https://img.youtube.com/vi/${profile?.video_img}/mqdefault.jpg`} />
                <meta name="url" content={shareUrl} />
            </Helmet> */}
            <div className="px-1.5 flex flex-row gap-3 place-items-start mt-2">
                {profile?.img ?
                    <img loading="lazy" id="profile_5" src={profile?.img}
                        className="h-12 w-12 aspact-square rounded-full" alt="" />
                    :
                    <img loading="lazy" id="profile_5" src={`https://ui-avatars.com/api/?name=${profile?.name}&size=20`}
                        className="h-12 w-12 aspact-square rounded-full" alt="" />
                }
                <div className="px-1.5">
                    {title &&
                        <div className="flex flex-row gap-2 place-items-end">
                            <p className="text-base place-items-start px-1 font-semibold line-clamp-2">
                                {title}
                                <button onClick={() => setMore(!more)} className="text-blue-500 font-extrabold ms-2 text-sm md:text-base">{more ? 'Less' : 'More'}</button>
                            </p>
                        </div>
                    }
                    {title && more &&
                        <div className="my-3 px-1">
                            <p
                                className="text-sm space-y-3"
                                dangerouslySetInnerHTML={{ __html: moreData }}
                            />
                        </div>
                    }
                </div>
            </div>
            {title && profile &&
                <div className="flex flex-row gap-4 flex-wrap place-items-center mt-2 text-nowrap pb-1.5 px-1.5">
                    {show &&
                        <>
                            {profile?.name &&
                                <span id="fullName_5" className="text-xs md:text-base">{profile?.name?.substring(0, 13)}...</span>
                            }
                            {profile?.time &&
                                <div className="flex flex-row gap-1 place-items-center ">
                                    <FaStopwatch />
                                    <span id="day_5" className="text-xs md:text-base">{profile?.time}</span>
                                </div>
                            }
                        </>
                    }
                    {profile?.view &&
                        <div className="flex flex-row gap-1 place-items-center">
                            <FaEye />
                            <span id="view_5" className="text-xs md:text-base">{profile?.view}</span>
                        </div>
                    }
                    {profile?.share &&
                        <HtmlTooltip
                            open={share}
                            onClose={() => setShare(false)}

                            title={
                                <Typography color="inherit">
                                    <div ref={dropdownRef}
                                        className={`
                                                    flex flex-row gap-6 z-10 text-4xl
                                                    bg-white
                                                `}
                                    >
                                        <a
                                            target='_blank'
                                            href={whatsappUrl}
                                            data-title={title}
                                            data-description={moreData}
                                            data-image={`https://img.youtube.com/vi/${profile?.video_img}/0.jpg`}
                                            data-url={whatsappUrl}
                                            id="whatsapp-share"
                                            className="text-green-600"
                                        >
                                            <FaWhatsapp />
                                        </a>
                                        <a href="#" className="text-yellow-700"><FaInstagram /></a>
                                        <a href="#"><RiFacebookFill /></a>
                                    </div>

                                </Typography>
                            }
                        >
                            <button
                                className=" justify-center place-items-center py-1 hover:text-blue-600 inline-block cursor-pointer"
                                onClick={() => setShare(!share)}
                            >
                                <IoShareSocial />
                            </button>
                        </HtmlTooltip>
                    }
                </div>
            }
        </>
    )
}

export default Postdata