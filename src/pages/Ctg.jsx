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
            setActive(id);
        }
        window.scrollTo(0, 0); // Scroll to top when category changes
    }, [id]);

    const [moreData] = useState([
        'મહાત્માં ગાંઘીજીની જીવનગાથા | રાષ્ટ્રપિતા ગાંધીબાપુ જીવનકથા ગુજરાતી',
        'Mahatma Gandhi Bapu Life story in Gujarati'
    ]);

    const [profile] = useState({
        video_img: '',
        name: '',
        img: '',
        time: '',
        view: ''
    });

    const data = {
        title,
        moreData,
        profile,
        changeVideo,
        advertise,
        sponsers,
    };

    // Flags to track if they were ever rendered
    let advertiseRendered = false;
    let sponsersRendered = false;

    return (
        <>
            <Reporterdata />
            <Ourboarddata />

            <div className="mb-20 space-y-1">
                {all?.map((list, i) => (
                    <React.Fragment key={i}>
                        {list.type === 1 && (
                            <Imagetovideo {...data} list={list} show={list.category_id === 1} />
                        )}

                        {list.typeNew === 2 && (
                            <RandomeFour data={list.data} {...data} />
                        )}

                        {(i + 1) % 10 === 5 && !advertiseRendered && (
                            (() => {
                                advertiseRendered = true;
                                return <Advertise {...data} />;
                            })()
                        )}

                        {(i + 1) % 10 === 0 && !sponsersRendered && (
                            (() => {
                                sponsersRendered = true;
                                return <Sponsers {...data} />;
                            })()
                        )}

                        {list.type === 2 && (
                            <Postimgslider list={list} show={true} />
                        )}

                        {list.type === 3 && (
                            <Imagetovideo {...data} list={list} show={list.category_id === 1} />
                        )}
                    </React.Fragment>
                ))}

                {/* Fallbacks in case they were not rendered in loop */}
                {!advertiseRendered && <Advertise {...data} />}
                {!sponsersRendered && <Sponsers {...data} />}
            </div>
        </>
    );
};

export default Ctg;
