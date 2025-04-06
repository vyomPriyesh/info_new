import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Ourboard = () => {

    const apiUrl = import.meta.env.VITE_APP_BASEURL;

    const { id } = useParams();
    const [data, setData] = useState(null)

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
        allData()
    }, [id])

    return (
        <>

            <div className="px-2" dangerouslySetInnerHTML={{ __html: data?.description }}></div>
        </>
    )
}

export default Ourboard
