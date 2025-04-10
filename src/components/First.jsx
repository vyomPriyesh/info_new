import React, { use, useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import { Autoplay } from 'swiper/modules';
import Redbanner from '../utilis/Redbanner';
import Location from '../utilis/Location';
import Menu from './Menu';
import { FaEye, FaInstagram, FaStopwatch, FaWhatsapp } from 'react-icons/fa';
import { IoShareSocial } from 'react-icons/io5';
import { RiFacebookFill } from 'react-icons/ri';
import Postdata from '../utilis/Postdata';
import { GoMute, GoUnmute } from 'react-icons/go';
import YouTubePlayer from './YouTubePlayer';

const First = ({ type, location, title, moreData, profile, heroData, scrollNews, bannerImg, newsData, delay, bannerDelay, bannerText }) => {

    // console.log(object)

    const [show, setShow] = useState(false)
    const [mute, setMute] = useState(false)
    const [data, setData] = useState('')
    const [refresh, setRefresh] = useState(0)
    const [refresh2, setRefresh2] = useState(0)
    const [refresh3, setRefresh3] = useState(0)
    const [refresh4, setRefresh4] = useState(0)
    const [showNews, setShownews] = useState(true)
    const [news, setNews] = useState(false)
    const [img, setImg] = useState(true)
    const [singleNews, setSinglenews] = useState(null)
    const [time, setTime] = useState(10);
    const [banner, setBanner] = useState()
    const [showBanner, setShowbanner] = useState(true)

    const delay2 = (ms) => new Promise(resolve => setTimeout(resolve, ms));


    const newsDatachange = async () => {
        let i = 0;
        let loopCompleted = false; // Track if the loop has completed a full cycle

        while (true) {
            await delay2(2000);
            i = (i + 1) % newsData.length; // Loop through the newsData array
            setNews(true);
            setSinglenews(newsData[i]);
            await delay2(4000);
            setNews(false);

            if (i === 0 && !loopCompleted) {
                setShownews(false);
                loopCompleted = true;
                await delay2(delay * 1000); // Wait before starting again
            } else if (i !== 0) {
                loopCompleted = false; // Reset when the loop hasn't completed
            }
        }
    };


    useEffect(() => {
        if (!showNews) {
            setTimeout(() => {
                setShownews(true)
                newsDatachange();
            }, delay * 1000);
        }
    }, [showNews, delay])



    const loopWithDelay = async () => {
        for (let i = 0; i <= bannerImg.length; i++) {
            setBanner(bannerImg[i]);
            await delay2(4000);
            if (i + 1 == bannerImg.length) {
                setImg(false)
            }
        }
    };

    useEffect(() => {
        if (!img) {
            setTimeout(() => {
                setImg(true)
                loopWithDelay();
            }, bannerDelay * 1000);
        }

    }, [img])






    useEffect(() => {
        loopWithDelay();
    }, [bannerImg]);


    useEffect(() => {
        if (!news && newsData.length > 0) {
            newsDatachange();
        }
    }, [refresh2, newsData]);

    const dateFormate = (startDate) => {
        const start = new Date(startDate);

        const formatDate = (date) => {
            const day = date.getDate();
            const month = date.toLocaleString("en-US", { month: "short" }); // Short month name
            return `${month} ${day}`;
        };

        return `${formatDate(start)}`;
    }

    const getShowTime = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let period = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return hours + ':' + minutes + ' ' + period;
    };

    useEffect(() => {

        const daysInGujarati = [
            'રવિવાર',  // Sunday
            'સોમવાર',  // Monday
            'મંગળવાર',  // Tuesday
            'બુધવાર',  // Wednesday
            'ગુરુવાર',  // Thursday
            'શુક્રવાર',  // Friday
            'શનિવાર'   // Saturday
        ];

        const date = new Date();
        const dayIndex = date.getDay();


        setTimeout(() => {
            setData(dateFormate(new Date()));
            setShow(true);
        }, 1000);

        setTimeout(() => {
            setShow(false);
        }, 4000);

        setTimeout(() => {
            setData(getShowTime(new Date()));
            setShow(true);
        }, 6000);

        setTimeout(() => {
            setShow(false);
        }, 8000);

        setTimeout(() => {
            setData(daysInGujarati[dayIndex]);
            setShow(true);
        }, 10000);

        setTimeout(() => {
            setShow(false);
            setRefresh3((prev) => prev + 1)
        }, 12000);

    }, [refresh3]);

    return (
        <>
            {/* <div className="sticky top-0"> */}
            <YouTubePlayer type={type} videoIds={heroData} location={location} data={bannerText} profile={profile} />
            <div className='bg-[#002793] relative h-5'>
                <div>
                    <marquee className="marq text-white" direction="left" loop="" scrollAmount={5}>
                        <p className="space-x-4 flex flex-row" key={refresh + 1}>
                            {scrollNews?.map((list, index) => (
                                <>
                                    <span className='place-items-center font-bold flex text-sm flex-row gap-2' key={index}><img loading="lazy" src={profile?.logo} alt="" className='h-4 w-4' />{list + '\u00A0'}</span>
                                </>
                            ))}
                        </p>
                    </marquee>
                </div>
                <span className={`${show ? 'translate-x-0 ' : '-translate-x-full `'} uppercase transition-all duration-1000 ease-in bg-white px-1 absolute top-0`}>{data}</span>
            </div>
            <div className="bg-white h-[49px] relative">
                {showNews &&
                    <div className={`bg heading overflow-hidden absolute h-[47px] mt-[1px]  z-30 w-full`}>
                        <>
                            {news ?
                                <div data-aos="fade-left" className="text-white h-full text-center" >
                                    <h1 key={singleNews} className="text-base flex justify-center place-items-center p-0  h-full font-semibold">
                                        {singleNews}
                                    </h1>
                                </div>
                                :
                                <div key={news} className="flex flex-row h-full" data-aos="fade-left">
                                    <div className="w-1/2 bg-yellow-400 h-full flex justify-center place-items-center text-xl font-bold">
                                        <h1 className="">Breaking</h1>
                                    </div>
                                    <div className="w-1/2 bg flex justify-center place-items-center text-white text-xl font-bold">
                                        <h1 className="">News</h1>
                                    </div>
                                </div>
                            }
                        </>
                    </div>
                }
                {img &&
                    <div className="absolute z-20  w-full mt-[1px] h-[47px] heading overflow-hidden">
                        <img loading="lazy" src={banner} data-aos="fade-left" className='h-full w-full' key={banner} alt="" />
                    </div>
                }
            </div>
            <div className="">

                {/* <Swiper

                    data-aos="fade-left"
                    spaceBetween={30}
                    loop={true}
                    centeredSlides={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    className="mySwiper"
                >
                    {bannerImg.map((list, i) => (
                        <SwiperSlide key={i}>
                            <img loading="lazy" src={list} />
                        </SwiperSlide>
                    ))}
                </Swiper> */}
            </div>
            {/* </div> */}

        </>
    )
}

export default First