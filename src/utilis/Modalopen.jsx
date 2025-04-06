import { Modal } from 'flowbite-react'
import React, { useEffect } from 'react'
import Postdata from './Postdata'
import { RxCross2 } from 'react-icons/rx';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Modalopen = ({ open, set, data }) => {

    useEffect(() => {
        if (!open) return;

        const handleBackButton = (e) => {
            e.preventDefault();
            set(false);
        };

        window.history.pushState(null, '', window.location.pathname);
        window.addEventListener('popstate', handleBackButton);

    }, [open, set]);

    const imgUrl = import.meta.env.VITE_IMAGE_BASEURL;


    return (
        <div>
            <Modal show={open} className='bgg flex justify-center place-items-center text-white relative'>
                <button onClick={() => set(false)} className='absolute right-5 z-50 bg-white rounded-full h-7 w-7 top-5 aspect-square flex justify-center place-items-center text-black'><RxCross2 /></button>
                <Modal.Body className='p-2 bgg text-white relative h-screen overflow-y-auto'>
                    <div className="space-y-6 h-2/3 flex justify-center place-items-center p-5">
                        <Swiper
                            direction={'vertical'}
                            className="mySwiper h-64"
                        >
                            {data?.
                                blog_image.map((l, i) => (
                                    <SwiperSlide className=' flex justify-end'>
                                        <div className="h-full flex justify-center place-items-center">
                                            <img loading="lazy" key={i} src={`${imgUrl}${l?.details}`} alt="" />
                                        </div>
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                    </div>
                    {data?.profile &&
                        <div className="h-1/3">
                            <div className="bg_2 p-2">
                                <Postdata title={data?.title} moreData={data?.description} profile={data?.profile} />
                            </div>
                        </div>
                    }
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Modalopen
