import React, { useEffect, useState } from 'react'
import Menu from '../components/Menu'
import Hero from '../components/Hero'
import Redbanner from '../utilis/Redbanner';
import Imagetovideo from '../utilis/Imagetovideo';
import Postimgslider from '../utilis/Postimgslider';
import Multipost from '../utilis/Multipost';
import axios from 'axios';
import Advertise from '../components/Advertise';
import Sponsers from '../components/Sponsers';
import RandomeFour from '../utilis/RandomeFour';

const Landingpage = ({ all, changeVideo, advertise, sponsers, title }) => {

    // const [title, setTitle] = useState('મહાત્માં ગાંઘીજીની જીવનગાથા | રાષ્ટ્રપિતા ગાંધીબાપુ જીવનકથા ગુજરાતી')
    const [moreData, setMoreData] = useState([
        'મહાત્માં ગાંઘીજીની જીવનગાથા | રાષ્ટ્રપિતા ગાંધીબાપુ જીવનકથા ગુજરાતી',
        'Mahatma Gandhi Bapu Life story in Gujarati'
    ])
    const count = 2

    const [profile, setProfile] = useState({
        video_img: '',
        name: '',
        img: '',
        time: '',
        view: ''
    })

    const data = {
        title,
        moreData,
        profile,
        changeVideo,
        advertise,
        sponsers,
    }

    const [allPost, setAllpost] = useState([
        {
            image: [
                'https://infogujarat.in/news/2503160807090.jpg',
                'https://infogujarat.in/news/2503161032530.png',
                'https://infogujarat.in/news/2503161032530.png',
            ],
            title: 'મહાત્માં ગાંઘીજીની જીવનગાથા | રાષ્ટ્રપિતા ગાંધીબાપુ જીવનકથા ગુજરાતી',
            moreData: [
                'મહાત્માં ગાંઘીજીની જીવનગાથા | રાષ્ટ્રપિતા ગાંધીબાપુ જીવનકથા ગુજરાતી',
                'Mahatma Gandhi Bapu Life story in Gujarati',
            ],
            profile: {
                name: 'Ketan Savaliya',
                img: 'https://infogujarat.in/images/250227163049image.jpg',
                time: '1 day ago',
                view: '146'
            },
        },
        {
            image: [
                'https://infogujarat.in/news/2503160807090.jpg',
                'https://infogujarat.in/news/2503161032530.png',
                'https://infogujarat.in/news/2503161032530.png',
            ],
            title: 'મહાત્માં ગાંઘીજીની જીવનગાથા | રાષ્ટ્રપિતા ગાંધીબાપુ જીવનકથા ગુજરાતી',
            moreData: [
                'મહાત્માં ગાંઘીજીની જીવનગાથા | રાષ્ટ્રપિતા ગાંધીબાપુ જીવનકથા ગુજરાતી',
                'Mahatma Gandhi Bapu Life story in Gujarati',
            ],
            profile: {
                name: 'Ketan Savaliya',
                img: 'https://infogujarat.in/images/250227163049image.jpg',
                time: '1 day ago',
                view: '146'
            },
        },
    ])

    const [multiPost, setMulipost] = useState([
        {
            img: 'https://infogujarat.in/news/2503151721430.jpeg',
            title: 'PM નરેન્દ્ર મોદી એપ્રિલમાં ચોથી વખત શ્રીલંકાની લેશે મુલાકાત, સૌર ઉર્જા પ્લાન્ટનું કરશે ઉદ્ઘાટન',
        },
        {
            img: 'https://infogujarat.in/news/2503151711060.jpg',
            title: 'આગામી ૧૦૦ કલાકમાં રાજ્યભરના અસામાજીક ગુંડા તત્વોની યાદી તૈયાર કરવા રાજ્યના પોલીસ વડા વિકાસ સહાયનો આદેશ',
        },
        {
            img: 'https://infogujarat.in/news/2503151611330.jpg',
            title: 'PM નરેન્દ્ર મોદી એપ્રિલમાં ચોથી વખત શ્રીલંકાની લેશે મુલાકાત, સૌર ઉર્જા પ્લાન્ટનું કરશે ઉદ્ઘાટન',
        },
        {
            img: 'https://img.youtube.com/vi/j-vVQAUedzs/0.jpg',
            title: 'PM નરેન્દ્ર મોદી એપ્રિલમાં ચોથી વખત શ્રીલંકાની લેશે મુલાકાત, સૌર ઉર્જા પ્લાન્ટનું કરશે ઉદ્ઘાટન',
        },
    ])

    return (
        <>
            <div className="mb-20 space-y-2" key={count + 1 + 'ff'}>
                {all?.map((list, i) => (
                    <>
                        {list.type == 1 &&
                            <div className="" key={i}>
                                <Imagetovideo key={i} {...data} list={list} bannerText={list?.blog_ticker[0]} />
                            </div>
                        }
                        {list.typeNew == 2 &&
                            <RandomeFour data={list.data} {...data} />
                        }
                        {(i + 1) % 10 === 5 && <Advertise {...data} />}
                        {(i + 1) % 10 === 0 && <Sponsers {...data} />}
                        {list.type == 2 &&
                            <div className="" key={i}>
                                <Postimgslider key={i} list={list} />
                            </div>
                        }
                        {/* {list.type == 3 &&
                            <Postimgslider key={i} list={list} />
                        } */}
                    </>
                ))}
            </div>
        </>
    )
}

export default Landingpage