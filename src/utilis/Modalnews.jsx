import { Modal } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import Modalyoutubeplayer from '../components/Modalyoutubeplayer';
import { RxCross1 } from 'react-icons/rx';

const Modalnews = ({ open, set, data, images, location, heroData, type, text }) => {

    const imgUrl = import.meta.env.VITE_IMAGE_BASEURL;

    useEffect(() => {
        if (!open) return;

        const handleBackButton = (e) => {
            e.preventDefault();
            set(false);
        };

        window.history.pushState(null, '', window.location.pathname);
        window.addEventListener('popstate', handleBackButton);

        return () => {
            window.removeEventListener('popstate', handleBackButton);
        };
    }, [open, set]);

    // const [data2, setData2] = useState([])
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [displayedWords, setDisplayedWords] = useState([]);
    const [refresh, setRefresh] = useState(0)

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
                {/* <Modal.Header closeButton={false} className='p-3 flex flex-row place-items-center w-full'> */}
                    <div className="flex items-center justify-center p-3 relative ">
                        <h2 className="text-3xl font-bold text-[#f00] text-center flip-text w-full">Breaking News</h2>
                        <button onClick={() => set(false)} className='text-2xl'><RxCross1 /></button>
                    </div>
                    {/* <span className='text-[#f00] w-full text-xl font-bold inline-block flip-text text-center'>Breaking News</span> */}
                {/* </Modal.Header> */}
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
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                modules={[Autoplay]}
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
                                    <Modalyoutubeplayer type={type} heroData={heroData} location={location} />
                                </div>
                            </>
                        }

                        {data?.type == 3 &&
                            <>
                                <div className="mb-10">
                                    <Modalyoutubeplayer type={type} heroData={heroData} location={location} />
                                </div>
                            </>
                        }

                        <div className="px-5">
                            <div id='wordDisplay' key={refresh} className="bg-[#f10] rounded-tr-[35px] rounded-bl-[35px] text-white font-semibold text-lg text-center p-4">
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
