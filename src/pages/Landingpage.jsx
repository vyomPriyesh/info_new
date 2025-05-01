import React, { useEffect, useState } from 'react';
import Reporterdata from '../components/Reporterdata';
import Ourboarddata from '../components/Ourboarddata';
import Imagetovideo from '../utilis/Imagetovideo';
import Postimgslider from '../utilis/Postimgslider';
import Advertise from '../components/Advertise';
import Sponsers from '../components/Sponsers';
import RandomeFour from '../utilis/RandomeFour';
import Singlecategory from '../components/Singlecategory';
import { useMyContext } from '../context/Allcontext';

const Landingpage = ({ all, changeVideo, advertise, sponsers, title }) => {

    const { allCtg, active } = useMyContext();

    const data = {
        title,
        changeVideo,
        advertise,
        sponsers,
    };

    console.log(all.length)

    let advertiseRendered = false;
    let singleCategoryRendered = false;
    let sponsersRendered = false;

    const content = all?.map((list, i) => {
        const renderedSingleCategories = Math.floor((i + 1) / 8);
        const elements = [];

        if (list.type === 1) {
            elements.push(
                <div key={`imgtovideo-${i}`}>
                    <Imagetovideo {...data} list={list} show={list.category_id === 1} />
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

        if ((i + 1) % 8 === 0 && renderedSingleCategories <= allCtg?.length) {
            singleCategoryRendered = true;
            const category = allCtg[renderedSingleCategories - 1];
            if (category && active !== category.id) {
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

        if (list.type === 2) {
            elements.push(
                <div className="" key={`postslider-${i}`}>
                    <Postimgslider list={list} show={true} />
                </div>
            );
        }

        if (list.type === 3) {
            elements.push(
                <div className="" key={`imgtovideo3-${i}`}>
                    <Imagetovideo {...data} list={list} show={list.category_id === 1} />
                </div>
            );
        }

        return <React.Fragment key={i}>{elements}</React.Fragment>;
    });

    // Add fallbacks if not rendered
    if (!advertiseRendered) {
        content.push(<Advertise key="ad-fallback" {...data} />);
    }
    if (!singleCategoryRendered && allCtg?.length > 0) {
        allCtg.forEach((category, index) => {
            if (active !== category.id) {
                content.push(
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
    }
    
    if (!sponsersRendered) {
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

export default Landingpage;
