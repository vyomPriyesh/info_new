import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useMyContext } from '../context/Allcontext';
import axios from 'axios';
import Usercardui from '../utilis/Usercardui';

const Ourboardmenudata = () => {
    const apiUrl = import.meta.env.VITE_APP_BASEURL;

    const { id } = useParams();
    const [data, setData] = useState()
    const [allOur, setAllour] = useState([])
    const { setActive, menu2 } = useMyContext();

    const allData = async () => {
        try {
            const response = await axios.get(`${apiUrl}cms_menu/1/${id}`);
            if (response.data.status) {
                setData(response.data.data)
                setAllour(response.data.data.cms_menu_detail)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (id && menu2.length > 0) {
            const find = menu2?.find(list => list.to == `our-board/${id}`)
            setActive(find)
            allData()
        }
    }, [id, menu2])

    return (
        <>
            <div className="flex flex-col">
                {allOur.map((list, i) => (
                    <Usercardui data={list} key={i} />
                ))}
            </div>
        </>
    )
}

export default Ourboardmenudata
