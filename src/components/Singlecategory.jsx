import React from 'react'
import { FaLongArrowAltRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Imagetovideo from './Imagetovideo'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';

const Singlecategory = ({ all, changeVideo, title, activeTitle, id }) => {

    const data = {
        // title,
        // moreData,
        // profile,
        changeVideo,
    }

    return (
        all.length > 0 &&
        <div className='pt-2 w-full bg-gray-200' >
            <div className="flex flex-row justify-between place-items-center text-red-500">
                <h1 className='font-bold  ps-5 text-xl'>{title}</h1>
                <Link to={`/ctg/${id}`} className='rounded-xl border border-black px-2 py-1'><FaLongArrowAltRight /></Link>
            </div>
            <Swiper
                slidesPerView={'auto'}
                spaceBetween={3}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className="mySwiper mt-2"
            >
                {all?.slice(0, 20).map((list, i) => {
                    if (list.type === 1 || list.type === 3) {
                        return (
                            <SwiperSlide className='max-w-[320px] w-full z-50' key={list.id || i}>
                                <Imagetovideo {...data} list={list} title={activeTitle} show={list.category_id == 1} />
                            </SwiperSlide>
                        );
                    }
                    return null;
                })}
            </Swiper>
            {/* <div className="flex flex-row overflow-x-auto gap-5 heading mt-2 w-full">
                {all?.slice(0, 3).map((list, i) => (
                    <>
                        {list.type == 1 &&
                            <div className=" max-w-full" key={i}>
                                <Imagetovideo key={i} {...data} list={list} />
                            </div>
                        }
                    </>
                ))}
            </div> */}
        </div>
    )
}

export default Singlecategory
