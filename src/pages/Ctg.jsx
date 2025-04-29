import React, { useEffect, useState } from 'react'
import Reporterdata from '../components/Reporterdata'
import Ourboarddata from '../components/Ourboarddata'
import { useParams } from 'react-router-dom'
import { useMyContext } from '../context/Allcontext'
import Imagetovideo from '../utilis/Imagetovideo'
import RandomeFour from '../utilis/RandomeFour'
import Advertise from '../components/Advertise'
import Sponsers from '../components/Sponsers'
import Postimgslider from '../utilis/Postimgslider'

const Ctg = ({ all, changeVideo, advertise, sponsers, title }) => {

    const { id } = useParams();
    const { setActive } = useMyContext();

    useEffect(() => {
        if (id) {
            setActive(id)
        }
    }, [id])

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


    return (
        <>
            <Reporterdata />
            <Ourboarddata />
            {/* <Check /> */}
            <div className="mb-20 space-y-1" key={count + 1 + 'ff'}>
                {all?.map((list, i) => (
                    <>
                        {list.type == 1 &&
                            <div className="" key={i}>
                                <Imagetovideo key={i} {...data} list={list} />
                            </div>
                        }

                        {list.typeNew == 2 &&
                            <RandomeFour data={list.data} {...data} />
                        }
                        {(i + 1) % 10 === 5 && <Advertise {...data} />}
                        {/* {(i + 1) % 8 === 0 && <Singlecategory />} */}
                        {(i + 1) % 10 === 0 && <Sponsers {...data} />}
                        {list.type == 2 &&
                            <div className="" key={i}>
                                <Postimgslider key={i} list={list} />
                            </div>
                        }
                        {list.type == 3 &&
                            <div className="" key={i}>
                                <Imagetovideo key={i} {...data} list={list} />
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

export default Ctg
