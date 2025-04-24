import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useMyContext } from '../context/Allcontext';
import { IoShareSocial } from 'react-icons/io5';

const Ourboard = () => {

    const apiUrl = import.meta.env.VITE_APP_BASEURL;

    const { id } = useParams();
    const [data, setData] = useState([])
    const { setOurdata } = useMyContext();
    const navigate = useNavigate()

    const allData = async () => {
        try {
            const response = await axios.get(`${apiUrl}our-board/1`);
            if (response.data.status) {
                setData(response.data.data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        allData()
    }, [id])

    const handleOur = (list) => {
        // setOurdata(list)
        navigate(`/?oid=${list.id}`)
    }

    return (
        <>
            <div className="flex flex-col gap-8 w-full place-items-center pb-10">
                {data.map((list, i) => (
                    <div key={i} className="flex flex-col gap-3 w-full place-items-center pt-5">
                        <img src={list.image_path} alt="" className='aspect-square w-48 object-cover' />
                        <div className="flex flex-col w-full place-items-center">
                            <div className="flex flex-row gap-6 flex-wrap">
                                <h1 className='text-lg font-medium'>{list.name}</h1>
                                <button onClick={() => handleOur(list)} className="text-lg text-blue-500 relative ">
                                    <IoShareSocial />
                                </button>
                            </div>
                            <span className='text-base font-medium'>{list.designation}</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Ourboard
