import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useMyContext } from '../context/Allcontext';

const Cmsmenudata = () => {


    const apiUrl = import.meta.env.VITE_APP_BASEURL;

    const { id } = useParams();
    const [data, setData] = useState()
    const { menu2, setActive } = useMyContext()

    const allData = async () => {
        try {
            const response = await axios.get(`${apiUrl}cms/1/${id}`);
            if (response.data.status) {
                setData(response.data.data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (id && menu2.length > 0) {
            const find = menu2?.find(list => list.to == `cms/${id}`)
            setActive(find)
            allData()
        }
    }, [id, menu2])

    useEffect(() => {
        allData()
    }, [id])

    return (
        <div className='px-2 mt-1'>
            <div className='text-[#6C6C6C] text-sm' dangerouslySetInnerHTML={{ __html: data?.description }} />
        </div>
    )
}

export default Cmsmenudata
