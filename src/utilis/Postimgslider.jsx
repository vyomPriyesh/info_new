import React, { useEffect, useState } from 'react'
import Postdata from './Postdata'
import Modalopen from './Modalopen';

const Postimgslider = ({ list, key }) => {


    const [open, setOpen] = useState(false)
    const [single, setSingle] = useState(null)
    const [profile, setProfile] = useState(null)

    const openModal = (data) => {
        setSingle({
            ...data,
            profile: {
                time: data?.create_date,
                name: data?.user?.name,
                img: data?.user?.image,
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
            img: list?.user?.image,
            view: list?.count,
            share: list?.id,
        })
    }, [list])

    const imgUrl = import.meta.env.VITE_IMAGE_BASEURL;


    return (
        <>
            <div className="border-b border-gray-200 pb-2" key={key}>
                <div className="flex flex-row gap-2 overflow-y-auto heading" onClick={() => openModal(list)}>
                    {list?.blog_image.map((item, i) => (
                        <img loading="lazy" className={` ${list?.blog_image.length == 1 ? 'w-full' : 'w-1/2'} `} key={i} src={`${imgUrl}${item?.details}`} alt="" />
                    ))}
                </div>
                <Postdata title={list?.title} moreData={list?.description} profile={profile} />
            </div>
            <Modalopen open={open} set={setOpen} data={single}/>
        </>
    )
}

export default Postimgslider