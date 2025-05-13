import React, { useEffect, useState } from 'react'
import Location from '../utilis/Location'
import Redbanner from '../utilis/Redbanner'
import Postdata from '../utilis/Postdata'
import Shortsmodal from '../utilis/Shortsmodal'
import axios from 'axios'
import { details } from 'framer-motion/client'
import API from '../apis/Apis'
import { apiFunctions } from '../apis/apiFunctions'

const Shortsvideo = ({ title, list, show }) => {

    const [all, setAll] = useState([])
    const [location, setLocation] = useState([])
    const [shortModal, setShortmodal] = useState(false)
    const [shorts, setShorts] = useState([])

    const { apiGet } = apiFunctions();

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
                video_img: list?.blog_image[0]?.details,
                name: list.user.name,
                img: list.user.image ? list.user.image_path : null,
                time: list.create_date,
                view: list.count,
                share: list.id
            })
        }
    }, [list])


    useEffect(() => {
        setAll([])
        if (list?.blog_ticker.length > 0) {
            const filtered = list?.blog_ticker.filter(list => list.type == 1)
            setAll(filtered.map(list => list.details))
        }
        const locations = [];
        if (list?.location) locations.push(list?.location);
        if (list?.location_1) locations.push(list?.location_1);
        if (list?.location_2) locations.push(list?.location_2);

        setLocation(locations)
    }, [list]);

    const handleShorts = async (list) => {
        setShortmodal(true)
        const response = await apiGet(API.shorts);

        if (response.status) {

            const locations = [];
            if (list.location) locations.push(list.location);
            if (list.location_1) locations.push(list.location_1);
            if (list.location_2) locations.push(list.location_2);

            const authors = [];
            if (list.blog_image[0].name_1) authors.push(list.blog_image[0].name_1);
            if (list.blog_image[0].name_2) authors.push(list.blog_image[0].name_2);
            if (list.blog_image[0].name_3) authors.push(list.blog_image[0].name_3);

            const finded = {
                details: list.blog_image[0].details,
                title: list.title,
                locations: locations,
                tickers: list.blog_ticker.map(list => list.details),
                description: list.description,
                authors: authors,
                profile: {
                    video_img: list.blog_image[0].details,
                    img: list.user.image ? list.user.image_path : null,
                    name: list.user.name,
                    time: list.create_date,
                    view: list.count,
                    share: list.id,
                }
            }

            const filtered = response.data.flatMap(item => {
                const locations = [];
                if (item.location) locations.push(item.location);
                if (item.location_1) locations.push(item.location_1);
                if (item.location_2) locations.push(item.location_2);

                const tickers = item.blog_ticker?.map(t => t.details) || [];

                return item.blog_image?.map(image => {
                    const authors = [];
                    if (image.name_1) authors.push(image.name_1);
                    if (image.name_2) authors.push(image.name_2);
                    if (image.name_3) authors.push(image.name_3);

                    return {
                        details: image.details,
                        title: item.title,
                        locations,
                        description: item.description,
                        authors,
                        tickers,
                        profile: {
                            video_img: image.details,
                            img: item.user?.image ? item.user.image_path : null,
                            name: item.user?.name,
                            time: item.create_date,
                            view: item.count,
                            share: item.id,
                        },
                    };
                }) || [];
            });


            const filteredWithoutMatch = filtered.filter(item => item.details !== finded.details);

            setShorts([finded, ...filteredWithoutMatch]);
        }
    }

    return (
        <>
            {list?.blog_image.length > 0 &&
                <div className="border-b border-gray-200 w-full" >
                    <div
                        onClick={() => handleShorts(list)}
                        style={{ backgroundImage: `url(https://img.youtube.com/vi/${list?.blog_image[0]?.details}/hqdefault.jpg)` }}
                        className="relative z-30 bg-shorts h-[220px] overflow-hidden w-full">
                        {title == list?.title &&
                            <div className="bg-black/45 absolute h-full w-full z-20"></div>
                        }
                        {/* <img loading="lazy" className="aspect-video object-cover z-10" onClick={() => changeVideo(list)} src={`https://img.youtube.com/vi/${list?.blog_image[0]?.details}/hqdefault.jpg`} alt="" /> */}
                        <Location data={location} />
                        <Redbanner data={all} />
                    </div>
                    <Postdata title={list?.title} moreData={list?.description} profile={profile} show={show} />
                </div>
            }
            <Shortsmodal open={shortModal} set={setShortmodal} data={shorts} />
        </>
    )
}

export default Shortsvideo
