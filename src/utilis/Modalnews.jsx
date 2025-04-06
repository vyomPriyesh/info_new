import { Modal } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import YouTubePlayer from '../components/YouTubePlayer';

const Modalnews = ({ open, set, data, images, location, heroData, type, text }) => {

    const imgUrl = import.meta.env.VITE_IMAGE_BASEURL;

    // const [data2, setData2] = useState([])
    const [refresh, setRefresh] = useState(0)
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [displayedWords, setDisplayedWords] = useState([]);


    const changeText = async () => {

        setDisplayedWords([]);

        const words = text[currentTextIndex]?.details?.split(" ");

        for (let i = 0; i < words.length; i++) {
            setDisplayedWords(prev => [...prev, words[i]]);
            if (i + 1 == words.length) {
                await delay(5000);
                setCurrentTextIndex(prev => (prev + 1) % text.length);
                setRefresh((prev) => prev + 1)
            }
        }
    }
    useEffect(() => {
        if (text?.length > 0) {
            changeText();
        }
    }, [text?.length > 0, refresh])

    return (
        <div>
            <Modal show={open} className='p-2 bg-black/50' onClose={() => set(false)}>
                <Modal.Header className='p-3'>
                    <span className='text-[#f00] text-xl font-bold inline-block flip-text'>Breaking News</span>
                </Modal.Header>
                <Modal.Body className='h-[85vh] relative overflow-hidden p-0'>
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className='absolute inset-0 z-40 w-full h-full object-cover'
                        src="https://infogujarat.in/asset/videos/bg-video.mp4"
                    >
                        Your browser does not support the video tag.
                    </video>

                    <div className="absolute z-50 h-full w-full pt-4">
                        {data?.type == 2 &&
                            <Swiper
                                direction={'vertical'}
                                className="mySwiper h-[40vh] w-full mb-10"
                            >
                                {images?.map((l, i) => (
                                    <SwiperSlide className='w-full '>
                                        <img loading="lazy" key={i} src={`${imgUrl}${l}`} alt="" className='h-full w-full object-contain' />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        }
                        {data?.type == 1 &&
                            <>
                                <div className="mb-10">
                                    <YouTubePlayer type={type} videoIds={heroData} location={location} />
                                </div>
                            </>
                        }

                        <div className="px-5">
                            <div id='wordDisplay' key={currentTextIndex} className="bg-[#f10] rounded-tr-[35px] rounded-bl-[35px] text-white font-semibold text-lg text-center p-4">
                                {displayedWords?.map((list, i) => (
                                    <span key={i} className='ms-2' style={{ '--i': i + 1 }}>{list} </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Modalnews
