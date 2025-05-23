import React, { use, useEffect, useRef, useState } from 'react'
import { useMyContext } from '../context/Allcontext';
import YoutubeLive from '../videoplayer/YoutubeLive';
import YouTubePlayer from '../videoplayer/YouTubePlayer';
import YouTubePlayer2 from '../videoplayer/YouTubePlayer2';
import Customeplayer from '../videoplayer/Customeplayer';

const First = ({ type, title, scrollNews, bannerImg, bannerText, newsData }) => {

    // console.log(object)
    const [show, setShow] = useState(false)
    const [data, setData] = useState('')
    const [refresh3, setRefresh3] = useState(0)
    const [showNews, setShownews] = useState(true)
    const [news, setNews] = useState(true)
    const [img, setImg] = useState(true)
    const [singleNews, setSinglenews] = useState(null)
    const [time, setTime] = useState(10);
    const [banner, setBanner] = useState()
    const [currentIndex, setCurrentIndex] = useState(0); // index in data
    const [mode, setMode] = useState("news");
    const [textIndex, setTextIndex] = useState(0);
    const [bannerIndex, setBannerIndex] = useState(0);

    const [both, setBoth] = useState([])
    const currentItem = both[currentIndex];
    const banners = currentItem?.banner?.flat();

    const { liveData, firstRefresh, logo } = useMyContext();

    // useEffect(() => {
    //     if (bannerImg?.length > 0 || newsData?.length > 0) {
    //         const result = bannerImg.map(bannerGroup => ({
    //             news: ['Breaking', 'News'],
    //             text: newsData[0].map(list => list.name),
    //             banner: [bannerGroup]
    //         }));

    //         setBoth(result);
    //     }
    // }, [bannerImg, newsData]);

    // useEffect(() => {
    //     if (newsData?.length > 0) {
    //         // Prepare groups of headlines
    //         const newsGroups = newsData.map(group => ({
    //             news: ['Breaking', 'News'],
    //             text: group.map(item => item.name),
    //             banner: [],
    //         }));

    //         // Phase 1: Show all news groups
    //         const phase1 = [...newsGroups];

    //         // Phase 2: For each banner, show banner + all news groups again
    //         const phase2 = bannerImg.flatMap((bannerGroup) => ([
    //             {
    //                 news: [],
    //                 text: [],
    //                 banner: [bannerGroup], // Show banner
    //             },
    //             ...newsGroups.map(group => ({
    //                 news: ['Breaking', 'News'],
    //                 text: group.text,
    //                 banner: [],
    //             })),
    //         ]));

    //         const fullCycle = [...phase1, ...phase2];

    //         setBoth(fullCycle);
    //     }
    // }, [bannerImg, newsData]);

    // useEffect(() => {
    //     if (newsData?.length > 0) {
    //         // For each banner, create a full newsData cycle
    //         const fullCycle = bannerImg.flatMap((banner, bannerIdx) => {
    //             return newsData.map((group, index) => ({
    //                 news: ['Breaking', 'News'],
    //                 text: group.map(item => item.name),
    //                 banner: index === newsData.length - 1 ? [banner] : [], // Add banner only on last newsData item
    //             }));
    //         });

    //         setBoth(fullCycle);
    //     }
    // }, [bannerImg, newsData]);

    useEffect(() => {
        if (newsData?.length > 0 && bannerImg?.length > 0) {
            // Both available
            const fullCycle = bannerImg.flatMap((banner, bannerIdx) => {
                return newsData.map((group, index) => ({
                    news: ['Breaking', 'News'],
                    text: group.map(item => item.name),
                    banner: index === newsData.length - 1 ? [banner] : [],
                }));
            });
            setBoth(fullCycle);
        } else if (newsData?.length > 0) {
            // Only newsData available
            const newsOnly = newsData.map(group => ({
                news: ['Breaking', 'News'],
                text: group.map(item => item.name),
                banner: [],
            }));
            setBoth(newsOnly);
        } else if (bannerImg?.length > 0) {
            // Only bannerImg available
            const bannerOnly = bannerImg.map(banner => ({
                news: ['Breaking', 'News'],
                text: [],
                banner: [banner],
            }));
            setBoth(bannerOnly);
        }
    }, [bannerImg, newsData]);



    useEffect(() => {
        let interval;
        let newsTimeout;

        const currentItem = both[currentIndex];
        const banners = currentItem?.banner?.flat() || [];
        const texts = currentItem?.text || [];

        if (mode === "news") {
            // Show "news" for 4 seconds, then decide next mode
            newsTimeout = setTimeout(() => {
                // If no texts and there are banners, skip to banner directly
                if (texts.length > 0) {
                    setMode("text");
                } else if (banners.length > 0) {
                    setMode("banner");
                } else {
                    setCurrentIndex((prev) => (prev + 1) % both.length);
                }
            }, 4000);
        } else {
            interval = setInterval(() => {
                const currentItem = both[currentIndex];
                const banners = currentItem?.banner?.flat() || [];
                const texts = currentItem?.text || [];

                if (mode === "text") {
                    if (texts.length === 0) {
                        // No text, go directly to banner (skip showing news/text)
                        if (banners.length > 0) {
                            setMode("banner");
                        } else {
                            setCurrentIndex((prev) => (prev + 1) % both.length);
                            setMode("news");
                        }
                        return;
                    }

                    if (textIndex < texts.length - 1) {
                        setTextIndex((prev) => prev + 1);
                    } else {
                        setTextIndex(0);
                        if (banners.length > 0) {
                            setMode("banner");
                            setBannerIndex(0);
                        } else {
                            setCurrentIndex((prev) => (prev + 1) % both.length);
                            setMode("news");
                        }
                    }
                } else if (mode === "banner") {
                    if (banners.length === 0) {
                        // No banners, skip to next news item
                        setCurrentIndex((prev) => (prev + 1) % both.length);
                        setMode("news");
                        return;
                    }

                    if (bannerIndex < banners.length - 1) {
                        setBannerIndex((prev) => prev + 1);
                    } else {
                        // After last banner, skip news text and go to next news item
                        setBannerIndex(0);
                        setCurrentIndex((prev) => (prev + 1) % both.length);

                        // Here’s the important part: 
                        // if current item has banners but no news text, skip "news" mode, go directly to banner or next index
                        const nextItem = both[(currentIndex + 1) % both.length];
                        if (!nextItem?.text?.length && nextItem?.banner?.length) {
                            setMode("banner");
                        } else {
                            setMode("news");
                        }
                    }
                }
            }, 4000);
        }

        return () => {
            clearInterval(interval);
            clearTimeout(newsTimeout);
        };
    }, [mode, textIndex, bannerIndex, currentIndex, both]);

    // const newsDatachange = async () => {

    //     while (true) {
    //         await delay2(2000);
    //         for (let i = 0; i < newsData.length; i++) {
    //             setNews(true);
    //             setSinglenews(newsData[i]);
    //             await delay2(4000);
    //             setNews(false);
    //         }
    //     }
    // };

    const delay2 = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    useEffect(() => {
        let isMounted = true;

        const loopWithDelay = async () => {
            if (!bannerImg || bannerImg.length === 0 || showNews) return;

            for (let i = 0; i < bannerImg.length && isMounted; i++) {
                setImg(true);
                setBanner(bannerImg[i]);
                await delay2(4000);
            }

            if (isMounted) {
                setImg(false);
                setShownews(true); // Switch to news
            }
        };

        loopWithDelay();

        return () => {
            isMounted = false;
        };
    }, [bannerImg, showNews]);

    // useEffect(() => {
    //     if (!showNews) {
    //         setTimeout(() => {
    //             setShownews(true)
    //             newsDatachange();
    //         }, delay * 1000);
    //     }
    // }, [showNews, delay])


    useEffect(() => {
        if (!newsData || newsData.length === 0 || !showNews) return;

        let isCancelled = false;

        const newsDatachange = async () => {
            for (let i = 0; i < newsData.length && !isCancelled; i++) {
                setNews(false);
                await delay2(3000);

                setSinglenews(newsData[i]);
                setNews(true);
                await delay2(5000);
            }

            if (!isCancelled) {
                setShownews(false); // Switch back to banners
                setImg(true);
            }
        };

        newsDatachange();

        return () => {
            isCancelled = true;
        };
    }, [newsData, showNews]);

    // const loopWithDelay = async () => {
    //     for (let i = 0; i < bannerImg.length; i++) {
    //         setImg(true)
    //         setBanner(bannerImg[i]);
    //         await delay2(4000);
    //         if (i + 1 == bannerImg.length) {
    //             setImg(false)
    //         }
    //     }
    // };

    // useEffect(() => {
    //     if (!img) {
    //         setTimeout(() => {
    //             setImg(true)
    //             loopWithDelay();
    //         }, bannerDelay * 1000);
    //     }

    // }, [!img])

    // useEffect(() => {
    //     loopWithDelay();
    // }, [bannerImg.length > 0]);


    // useEffect(() => {
    //     if (!news && newsData.length > 0) {
    //         newsDatachange();
    //     }
    // }, [refresh2, newsData]);

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
            <div className="" key={firstRefresh}>
                {/* <div className="sticky top-0"> */}
                {liveData.length > 0 ?
                    <YoutubeLive />
                    :
                    title ?
                        <YouTubePlayer type={type} data={bannerText} />
                        :
                        <YouTubePlayer2 />
                }
                <div className='bg-[#002793] relative h-5'>
                    <div>
                        <marquee className="marq text-white" direction="left" loop="" scrollAmount={4}>
                            <p className="space-x-4 flex flex-row" >
                                {scrollNews?.map((list, index) => (
                                    <>
                                        <span className='place-items-center font-black flex text-sm flex-row gap-2' key={index}><img loading="lazy" src={logo} alt="" className='h-4 w-4' />{list + '\u00A0'}</span>
                                    </>
                                ))}
                            </p>
                        </marquee>
                    </div>
                    <span className={`${show ? 'translate-x-0 ' : '-translate-x-full `'} uppercase transition-all duration-1000 ease-in bg-white px-1 absolute top-0`}>{data}</span>
                </div>
                {/* <div className="bg-white h-[46px] relative">
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
                </div> */}
                {both.length > 0 &&
                    <div className='relative h-12 flex justify-center place-items-center mt-0.5 overflow-hidden'>
                        {newsData?.length > 0 ?
                            <>
                                {mode === 'news' &&
                                    <div className="flex flex-row h-full w-full bg" data-aos="fade-left">
                                        <div className="w-1/2 bg-yellow-400 h-full flex justify-center place-items-center text-4xl font-bold">
                                            <h1 className="">Breaking</h1>
                                        </div>
                                        <div className="w-1/2 bg flex justify-center place-items-center text-white text-4xl font-bold">
                                            <h1 className="">News</h1>
                                        </div>
                                    </div>
                                }
                                {mode === "text" &&
                                    <div className='absolute b h-full w-full flex justify-center text-2xl place-items-center text-white bg px-4 font-black'>
                                        <span data-aos="fade-left" key={currentItem?.text[textIndex]} className='line-clamp-1 text-center w-full'>{currentItem?.text[textIndex]}</span>
                                    </div>
                                }
                                {mode === "banner" &&
                                    <div className='absolute h-full flex justify-center place-items-center bg-white w-full'>
                                        <img
                                            data-aos="fade-left" key={banners[bannerIndex]?.image_path}
                                            src={banners[bannerIndex]?.image_path}
                                            alt="Banner"
                                            className='h-full w-full'
                                        />
                                    </div>
                                }
                            </>
                            :
                            bannerImg.length > 0 && (
                                <div className='absolute h-full flex justify-center place-items-center bg-white w-full'>
                                    <img
                                        data-aos="fade-left" key={banners[bannerIndex]?.image_path}
                                        src={banners[bannerIndex]?.image_path}
                                        alt="Banner"
                                        className='h-full w-full'
                                    />
                                </div>
                            )
                        }
                    </div>
                }
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
            </div>
        </>
    )
}

export default First