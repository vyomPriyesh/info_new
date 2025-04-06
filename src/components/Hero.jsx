import React, { useEffect, useRef, useState } from 'react'
import Menu from './Menu'
import First from './First';

const Hero = ({ title }) => {

    

    const menu = [
        {
            name: 'Home',
            to: '/',
        },
        {
            name: 'સમાચાર',
            to: '/',
        },
        {
            name: 'મારા ડૉકટર',
            to: '/',
        },
        {
            name: 'કાનુની સલાહ',
            to: '/',
        },
        {
            name: 'મહત્વપૂર્ણ લોકો',
            to: '/',
        },
        {
            name: 'શુભેચ્છક',
            to: '/',
        },
    ]

    return (
        <>
            <div className='sticky top-0'>
                <Menu menu={menu} />
                <First />
            </div>
        </>
    )
}

export default Hero