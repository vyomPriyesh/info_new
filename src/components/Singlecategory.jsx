import React from 'react'
import { FaLongArrowAltRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Imagetovideo from '../utilis/Imagetovideo'
import { Swiper, SwiperSlide } from 'swiper/react';

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
        <div className='pt-2 px-2 w-full' >
            <div className="flex flex-row justify-between place-items-center">
                <h1 className='font-bold'>{title}</h1>
                <Link to={`/ctg/${id}`} className='rounded-xl border border-black px-2 py-1'><FaLongArrowAltRight /></Link>
            </div>
            <Swiper
                slidesPerView={'auto'}
                spaceBetween={15}
                pagination={{
                    clickable: true,
                }}
                className="mySwiper mt-2"
            >
                {all?.slice(0, 5).map((list, i) => (
                    <>
                        {list.type == 1 &&
                            <SwiperSlide className='max-w-[300px] w-full overflow-hidden'><Imagetovideo key={i} {...data} list={list} title={activeTitle} /></SwiperSlide>
                        }
                    </>
                ))}
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
