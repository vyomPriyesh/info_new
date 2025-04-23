import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Ourboard = () => {

    const apiUrl = import.meta.env.VITE_APP_BASEURL;

    const { id } = useParams();
    const [data, setData] = useState([])

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

    return (
        <>
            <div className="flex flex-col gap-8 w-full place-items-center pb-10">
                {data.map((list, i) => (
                    <div className="flex flex-col gap-3 place-items-center" key={i}>
                        <img src={list.image_path} alt="" className='aspect-square w-48 object-cover' />
                        <div className="flex flex-col w-full place-items-center">
                            <h1 className='text-lg font-medium'>{list.name}</h1>
                            <span className='text-base font-medium'>{list.designation}</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Ourboard
