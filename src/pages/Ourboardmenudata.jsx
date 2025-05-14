import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useMyContext } from '../context/Allcontext';
import axios from 'axios';
import Usercardui from '../utilis/Usercardui';
import API from '../apis/Apis';
import { apiFunctions } from '../apis/apiFunctions';

const Ourboardmenudata = () => {

    const { apiGet } = apiFunctions();

    const { id } = useParams();
    const [data, setData] = useState()
    const [allOur, setAllour] = useState([])
    const { setActive, menu2 } = useMyContext();

    const allData = async () => {
        const response = await apiGet(API.cmsMenuData(id));
        if (response.status) {
            setData(response.data)
            setAllour(response.data.cms_menu_detail)
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
                    <Usercardui data={list} key={i} share={true} shareId='oid'/>
                ))}
            </div>
        </>
    )
}

export default Ourboardmenudata
