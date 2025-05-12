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
import Singlecategory from '../components/Singlecategory'
import Shortsvideo from '../utilis/Shortsvideo'

const Ctg = ({ all, changeVideo, advertise, sponsers, title }) => {
    const { id } = useParams();
    const { setActive, allCtg } = useMyContext();

    useEffect(() => {
        if (id) {
            setActive({ to: id });
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
    const renderedCategoryIds = new Set();
    let advertiseRendered = false;
    let sponsersRendered = false;

    const content = all?.map((list, i) => {
        const elements = [];

        if (list.type === 1) {
            elements.push(
                <div key={`imgtovideo-${i}`}>
                    <Imagetovideo {...data} list={list} show={list.category_id === 1} />
                </div>
            );
        }

        if (list.type === 2) {
            elements.push(
                <div className="" key={`postslider-${i}`}>
                    <Postimgslider list={list} show={true} />
                </div>
            );
        }
        if (list.type === 3) {
            elements.push(
                <div key={`shortvideo-${i}`}>
                    <Shortsvideo {...data} list={list} show={list.category_id === 1} />
                </div>
            );
        }

        if (list.typeNew === 2) {
            elements.push(
                <RandomeFour key={`random-${i}`} data={list.data} {...data} />
            );
        }

        if ((i + 1) % 10 === 5) {
            advertiseRendered = true;
            elements.push(<Advertise key={`ad-${i}`} {...data} />);
        }

        if ((i + 1) % 8 === 0 && allCtg?.length) {
            const categoryIndex = Math.floor((i + 1) / 8) - 1;
            const category = allCtg[categoryIndex];

            if (category && !renderedCategoryIds.has(category.id)) {
                renderedCategoryIds.add(category.id);
                elements.push(
                    <div className='' key={`singlecat-${i}`}>
                        <Singlecategory
                            activeTitle={title}
                            id={category.id}
                            changeVideo={changeVideo}
                            title={category.name}
                            all={category.blog}
                        />
                    </div>
                );
            }
        }

        if ((i + 1) % 10 === 0) {
            sponsersRendered = true;
            elements.push(<Sponsers key={`sponsor-${i}`} {...data} />);
        }

        return <React.Fragment key={i}>{elements}</React.Fragment>;
    });

    // 🔁 Render remaining Singlecategory components if any left
    if (!advertiseRendered && allCtg.length == 0) {
        content.push(<Advertise key="ad-fallback" {...data} />);
    }

    const fallbackCategories = [];

    allCtg?.forEach((category, index) => {
        if (!renderedCategoryIds.has(category.id)) {
            fallbackCategories.push(
                <div key={`singlecat-fallback-${index}`}>
                    <Singlecategory
                        activeTitle={title}
                        id={category.id}
                        changeVideo={changeVideo}
                        title={category.name}
                        all={category.blog}
                    />
                </div>
            );
        }
    });

    if (fallbackCategories.length > 0) {
        content.push(<Sponsers key="sponsor-before-fallback" {...data} />);
        content.push(...fallbackCategories);
        content.push(<Advertise key="advertise-after-fallback" {...data} />);
    }


    if (!sponsersRendered && allCtg.length == 0) {
        content.push(<Sponsers key="sponsor-fallback" {...data} />);
    }


    return (
        <>
            <Reporterdata />
            <Ourboarddata />

            <div className="mb-20 space-y-1">
                {content}
            </div>
        </>
    );
};

export default Ctg;
