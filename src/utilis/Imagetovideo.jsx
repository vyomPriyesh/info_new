import React, { useEffect, useState } from 'react'
import Redbanner from './Redbanner';
import { FaEye, FaInstagram, FaStopwatch, FaWhatsapp } from 'react-icons/fa';
import { IoShareSocial } from 'react-icons/io5';
import { RiFacebookFill } from 'react-icons/ri';
import Postdata from './Postdata';
import Location from './Location';

const Imagetovideo = ({ title, moreData, list, changeVideo, key }) => {

    const [refresh, setRefresh] = useState(0)
    const [all, setAll] = useState([])
    const [location, setLocation] = useState([])



    const [profile, setProfile] = useState({
        video_img: '',
        name: '',
        img: '',
        time: '',
        view: '',
        share: ''
    })

    useEffect(() => {
        if (list) {
            setProfile({
                video_img: list?.blog_image[0].details,
                name: list.user.name,
                img: list.user.image ? list.user.image_path + '/' + list.user.image : null,
                time: list.create_date,
                view: list.count,
                share: list.id
            })
        }
    }, [list])


    useEffect(() => {
        if (list?.blog_ticker.length > 0) {
            const filtered = list?.blog_ticker.filter(list => list.type == 1)
            setAll(filtered.map(list => list.details))
        }
        const locations = [];
        if (list?.location) locations.push(list?.location);
        if (list?.location_1) locations.push(list?.location_1);
        if (list?.location_2) locations.push(list?.location_2);

        setLocation(locations)
    }, [refresh, list]);


    return (
        <>
            <div className="border-b border-gray-200 pb-2 pt-1 w-full" key={key}>
                <div className="relative z-30 overflow-hidden h-full w-full">
                    {title == list?.title &&
                        <div className="bg-black/45 absolute h-full w-full z-20"></div>
                    }
                    <img loading="lazy" className="w-full h-full z-10" onClick={() => changeVideo(list)} src={`https://img.youtube.com/vi/${list?.blog_image[0]?.details}/mqdefault.jpg`} alt="" />
                    <Location data={location} />
                    <Redbanner data={all} />
                </div>
                <Postdata title={list?.title} moreData={list?.description} profile={profile} />
            </div>
        </>
    )
}

export default Imagetovideo