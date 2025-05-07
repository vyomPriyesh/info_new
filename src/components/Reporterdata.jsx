import React, { useEffect, useRef, useState } from 'react'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { IoShareSocial } from 'react-icons/io5';
import { RiFacebookFill } from 'react-icons/ri'
import { useMyContext } from '../context/Allcontext';
import Usercardui from '../utilis/Usercardui';

const Reporterdata = ({ }) => {

    const { reporterData } = useMyContext();

    const protocol = window.location.protocol;  // 'http:' or 'https:'
    const host = window.location.hostname;      // e.g., '192.168.29.202'
    const port = window.location.port;
    const [share, setShare] = useState(false)

    const dropdownRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShare(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    return (
        reporterData &&
        <Usercardui data={reporterData} />
    )
}

export default Reporterdata
