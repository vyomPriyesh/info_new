import React, { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet';
import { FaEye, FaInstagram, FaStopwatch, FaWhatsapp } from 'react-icons/fa';
import { IoShareSocial } from 'react-icons/io5';
import { RiFacebookFill } from 'react-icons/ri';
// import Head from 'next/head';

const Postdata = ({ title, profile, moreData }) => {


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
            <div className="px-1.5 pb-2">
                {title &&
                    <div className="flex flex-row flex-wrap gap-2 place-items-center mt-2">
                        <h1 className="gap-2 text-base place-items-start  px-1 font-semibold line-clamp-2">
                            {title}
                        </h1>
                        <button onClick={() => setMore(!more)} className="text-blue-500 font-extrabold mt-0 text-sm md:text-base">{more ? 'Less' : 'More'}</button>
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
                {title && profile &&
                    <div className="flex flex-row gap-7 flex-wrap place-items-center px-1 mt-2 text-nowrap">
                        {profile?.name &&
                            <div className="flex flex-row gap-3 place-items-center">
                                {profile?.img ?
                                    <img loading="lazy" id="profile_5" src={profile?.img}
                                        className="h-5 w-5 aspact-square" alt="" />
                                    :
                                    <img loading="lazy" id="profile_5" src={`https://ui-avatars.com/api/?name=${profile?.name}&size=20`}
                                        className="h-5 w-5 aspact-square" alt="" />
                                }
                                <span id="fullName_5" className="text-xs md:text-base">{profile?.name}</span>
                            </div>
                        }
                        {profile?.time &&
                            <div className="flex flex-row gap-1 place-items-center ">
                                <FaStopwatch />
                                <span id="day_5" className="text-xs md:text-base">{profile?.time}</span>
                            </div>
                        }
                        {profile?.view &&
                            <div className="flex flex-row gap-1 place-items-center">
                                <FaEye />
                                <span id="view_5" className="text-xs md:text-base">{profile?.view}</span>
                            </div>
                        }
                        {profile?.share &&
                            <button ref={dropdownRef} onClick={() => setShare(!share)} className="text-lg text-blue-500 relative ">
                                <IoShareSocial />
                                {share &&
                                    <div
                                        className="absolute flex rounded-md z-40 flex-row gap-3 text-2xl left-0 -translate-x-[100%] top-7 bg-white border border-gray-300 p-2">
                                        <a
                                            target='_blank'
                                            href={whatsappUrl}
                                            data-title={title}
                                            data-description={moreData}
                                            data-image={`https://img.youtube.com/vi/${profile?.video_img}/0.jpg`}
                                            data-url={whatsappUrl}
                                            // onClick={updateOGTags}
                                            id="whatsapp-share"
                                            className="text-green-600"><FaWhatsapp /></a>
                                        <a href="#" className="text-yellow-700"><FaInstagram /></a>
                                        <a href="#"><RiFacebookFill /></a>
                                    </div>
                                }
                            </button>
                        }
                    </div>
                }
            </div>
        </>
    )
}

export default Postdata