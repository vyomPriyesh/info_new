import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Modalnews from '../utilis/Modalnews';
import axios from 'axios';
import API from '../apis/Apis';
import { apiFunctions } from '../apis/apiFunctions';

const Singlecenter = ({ centerData }) => {

    const [singleCenter, setSinglecenter] = useState(null)
    const [centerRefresh, setCenterRefresh] = useState(0)
    const [center, setCenter] = useState(false)
    const [modalLocation, setModalLocation] = useState([])
    const [modalHerodata, setModalHerodata] = useState([])
    const [modalData, setModaldata] = useState(null)
    const [open, setOpen] = useState(false)
    const [images, setImages] = useState([])
    const [modalText, setModaltext] = useState([])
    const [type, setType] = useState(null)


    const { apiGet } = apiFunctions();




    const isLoopRunning = useRef(false)

    const loopWithDelay = async () => {
        if (isLoopRunning.current || centerData.length === 0) return;
        isLoopRunning.current = true;

        for (let i = 0; i < centerData.length; i++) {
            setSinglecenter(centerData[i]);
            await delay(1000);
            setCenter(true);
            await delay(4000);
            setCenter(false);
            await delay(2000);
        }

        isLoopRunning.current = false;
        setCenterRefresh((prev) => prev + 1);
    };

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    useEffect(() => {
        loopWithDelay();
    }, [centerRefresh, centerData])

    const pathname = useLocation();

    const openModal = async (id) => {
        const response = await apiGet(API.breakingDetails(id));
        if (response.status) {
            const locations = [];
            if (response.data.location) locations.push(response.data.location);
            if (response.data.location_1) locations.push(response.data.location_1);
            if (response.data.location_2) locations.push(response.data.location_2);
            setModalLocation(locations)
            setOpen(true)
            setType(response.data.type)
            setModaldata(response.data)
            setImages(response.data.blog_image.map(list => list.details))
            setModalHerodata(response.data.blog_image)
            setModaltext(response.data.blog_ticker.filter(list => list.type == 2))
        }
    }

    return (
        <>
            {/* <div className=""> */}
                {pathname?.pathname !== '/cms/reporter-sign-up' && pathname?.pathname !== '/cms/Info%20Gujarat' && singleCenter &&
                    <buttom aria-label="Open Subscribe Modal" onClick={() => openModal(singleCenter?.id)} className={`fixed bottom-2 me-auto text-start flex flex-col text-white rounded-lg w-fit h-fit bg   p-2 transition-all duration-1000 ease-linear z-50 ${center ? 'translate-x-3 me-3 ' : '-translate-x-28 me-0'} `}>
                        <h1 className=' font-bold text-xs'>{singleCenter?.name}</h1>
                        <span className='text-sm line-clamp-1'>{singleCenter?.title.substring(0, 13)}...</span>
                    </buttom>
                }
            {/* </div> */}
            <Modalnews images={images} open={open} set={setOpen} data={modalData} location={modalLocation} heroData={modalHerodata} type={type} text={modalText} />
        </>
    )
}

export default Singlecenter
