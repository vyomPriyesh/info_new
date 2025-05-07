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
    };

    const renderedCategoryIds = new Set();
    let advertiseRendered = false;
    let sponsersRendered = false;

    const content = all?.map((list, i) => {
        const elements = [];

        if (list.type === 1 || list.type === 3) {
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

        if (list.typeNew === 2) {
            elements.push(
                <RandomeFour key={`random-${i}`} data={list.data} {...data} />
            );
        }

        if ((i + 1) % 10 === 5) {
            advertiseRendered = true;
            elements.push(<Advertise key={`ad-${i}`} advertise={advertise} />);
        }

        if ((i + 1) % 8 === 0 && allCtg?.length) {
            const categoryIndex = Math.floor((i + 1) / 8) - 1;
            const category = allCtg[categoryIndex];

            if (category  && !renderedCategoryIds.has(category.id)) {
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
            elements.push(<Sponsers key={`sponsor-${i}`} sponsers={sponsers} />);
        }

        return <React.Fragment key={i}>{elements}</React.Fragment>;
    });

    // 🔁 Render remaining Singlecategory components if any left
    if (!advertiseRendered && allCtg.length ==0) {
        content.push(<Advertise key="ad-fallback" sponsers={sponsers} />);
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
        content.push(<Sponsers key="sponsor-before-fallback" sponsers={sponsers} />);
        content.push(...fallbackCategories);
        content.push(<Advertise key="advertise-after-fallback" advertise={advertise} />);
    }


    if (!sponsersRendered && allCtg.length ==0) {
        content.push(<Sponsers key="sponsor-fallback" sponsers={sponsers} />);
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
