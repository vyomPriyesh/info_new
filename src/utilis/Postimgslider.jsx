import React, { useEffect, useState } from 'react'
import Postdata from './Postdata'
import Modalopen from './Modalopen';

const Postimgslider = ({ list, show }) => {


    const [open, setOpen] = useState(false)
    const [single, setSingle] = useState(null)
    const [profile, setProfile] = useState(null)

    const openModal = (data) => {
        setSingle({
            ...data,
            profile: {
                time: data?.create_date,
                name: data?.user?.name,
                img: data?.user?.image_path,
                view: data?.count,
                share: data?.id,
            }
        })
        setOpen(true)
    }


    useEffect(() => {
        setProfile({
            ...profile,
            time: list?.create_date,
            name: list?.user?.name,
            img: list?.user?.image_path,
            view: list?.count,
            share: list?.id,
        })
    }, [list])

    const imgUrl = import.meta.env.VITE_IMAGE_BASEURL;


    return (
        <>
            <div className="border-y border-gray-200 py-2" >
                <div className="flex flex-row gap-2 overflow-y-auto heading w-full" onClick={() => openModal(list)}>
                    {list?.blog_image.map((item, i) => (
                        list?.blog_image.length == 1 ?
                            <img src={`${imgUrl}${item?.details}`} alt="" className='w-full aspect-[16/9] bg-cover bg-no-repeat h-full  object-contain'
                                style={{
                                    backgroundImage: `
                              linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)),
                              url(${imgUrl}${item?.details})
                            `}}
                            />
                            :
                            list?.blog_image.length == 2 ?
                                <img src={`${imgUrl}${item?.details}`} alt="" className='w-1/2 aspect-[16/11] bg-cover bg-no-repeat h-full object-contain' style={{
                                    backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)),
      url(${imgUrl}${item?.details})
    `
                                }} />
                                :

                                <img src={`${imgUrl}${item?.details}`} alt="" className='w-2/5 aspect-[16/15] bg-cover bg-no-repeat h-full  object-contain' style={{
                                    backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)),
      url(${imgUrl}${item?.details})
    `
                                }} />
                    ))}
                    {/* <img loading="lazy" className={` ${list?.blog_image.length == 1 ? 'w-full' : list?.blog_image.length ==2 ? 'w-1/2': 'w-2/5'} object-cover aspect-[16/8]`} key={i} src={`${imgUrl}${item?.details}`} alt="" /> */}
                </div>
                <Postdata title={list?.title} moreData={list?.description} profile={profile} show={show} />
            </div>
            <Modalopen open={open} set={setOpen} data={single} />
        </>
    )
}

export default Postimgslider