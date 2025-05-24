import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

const Advertise = ({ advertise }) => {

    return (
        advertise?.length > 0 &&
        <div className="">
            <Swiper
                loop={true}
                                slidesPerView={'auto'}
                                spaceBetween={5}
                                pagination={{
                                    clickable: true,
                                }}
                                centeredSlides={true}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                modules={[Autoplay]}
                className="mySwiper h-28"
            >
                {advertise.concat(advertise).map((list, i) => (
                    <SwiperSlide key={i} className='max-w-[320px] w-full'>
                        <a href={list?.url} target='_blank'>
                            <img loading="lazy" src={list?.image_path} className='h-full w-full object-contain' />
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Advertise
