import React from 'react'
import { FaLongArrowAltRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Imagetovideo from '../utilis/Imagetovideo'

const Singlecategory = ({ all, changeVideo }) => {

    const data = {
        // title,
        // moreData,
        // profile,
        changeVideo,
    }

    return (
        <div className='pt-2 px-2'>
            <div className="flex flex-row justify-between place-items-center">
                <h1 className='font-bold'>સમાચાર</h1>
                <Link className='rounded-xl border border-black px-2 py-1'><FaLongArrowAltRight /></Link>
            </div>
            <div className="flex flex-row overflow-x-auto gap-5 heading">
                {all.slice(3, 4).map((list, i) => (
                    <>
                        {list.type == 1 &&
                            <div className="" key={i}>
                                <Imagetovideo key={i} {...data} list={list} bannerText={list?.blog_ticker[0]} />
                            </div>
                        }
                    </>
                ))}
            </div>
        </div>
    )
}

export default Singlecategory
