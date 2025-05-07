import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Modalnews from '../utilis/Modalnews';
import axios from 'axios';

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


    const apiUrl = import.meta.env.VITE_APP_BASEURL;




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
        try {
            const response = await axios.get(`${apiUrl}breaking_details/1/${id}`);
            if (response.data.status) {
                const locations = [];
                if (response.data.data.location) locations.push(response.data.data.location);
                if (response.data.data.location_1) locations.push(response.data.data.location_1);
                if (response.data.data.location_2) locations.push(response.data.data.location_2);
                setModalLocation(locations)
                setOpen(true)
                setType(response.data.data.type)
                setModaldata(response.data.data)
                setImages(response.data.data.blog_image.map(list => list.details))
                setModalHerodata(response.data.data.blog_image)
                setModaltext(response.data.data.blog_ticker.filter(list => list.type == 2))
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className="">
                {pathname?.pathname !== '/cms/reporter-sign-up' && pathname?.pathname !== '/cms/Info%20Gujarat' && singleCenter &&
                    <button onClick={() => openModal(singleCenter?.id)} className={`fixed me-auto text-start flex flex-col text-white rounded-lg w-fit bg top-2/3 p-2 inset-0 h-fit transition-all duration-1000 ease-linear z-50 ${center ? 'translate-x-3 me-3 ' : '-translate-x-28 me-0'} `}>
                        <h1 className=' font-bold text-xs'>{singleCenter?.name}</h1>
                        <span className='text-sm line-clamp-1'>{singleCenter?.title.substring(0, 13)}...</span>
                    </button>
                }
            </div>
            <Modalnews images={images} open={open} set={setOpen} data={modalData} location={modalLocation} heroData={modalHerodata} type={type} text={modalText} />
        </>
    )
}

export default Singlecenter
