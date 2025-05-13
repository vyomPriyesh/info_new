import { AnimatePresence, motion, wrap } from "framer-motion";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Postdata from "./Postdata";
import ShortsPlayer from "../videoplayer/ShortsPlayer";
import { useMyContext } from "../context/Allcontext";

const Shortsmodal = ({ open, set, data }) => {

    const { logo } = useMyContext();

    const [[page, direction], setPage] = useState([0, 0]);

    const index = wrap(0, data.length, page); // Safe index
    const currentItem = data[index]; // Current video object
    const currentDetails = currentItem?.details;

    const variants = {
        enter: (direction) => ({
            y: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            y: 0,
            opacity: 1,
        },
        exit: (direction) => ({
            y: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    const swipeConfidenceThreshold = 100;
    const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

    const paginate = (newDirection) => {
        setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
    };


    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [open]);

    useEffect(() => {
        if (!open) return;

        const handleBackButton = (e) => {
            e.preventDefault();
            set(false);
        };

        window.history.pushState(null, "", window.location.pathname);
        window.addEventListener("popstate", handleBackButton);

        return () => {
            window.removeEventListener("popstate", handleBackButton);
        };
    }, [open, set]);

    console.log(currentItem?.profile)


    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 h-dvh w-screen z-50 flex justify-center items-center bg-black"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <button
                        onClick={() => set(false)}
                        className="absolute left-5 top-10 z-50 bg-white rounded-full h-7 w-7 flex justify-center items-center text-black"
                    >
                        <RxCross2 />
                    </button>

                    {logo &&
                        <img loading="lazy" className='md:h-16 md:w-16 h-10 w-10 absolute aspect-square right-5 top-10 logo z-50' src={logo} />
                    }

                    <div className="relative w-full h-full ">
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={page}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    y: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 },
                                }}
                                drag="y"
                                dragConstraints={{ top: 0, bottom: 0 }}
                                dragElastic={0.8}
                                onDragEnd={(e, { offset, velocity }) => {
                                    const swipe = swipePower(offset.y, velocity.y);

                                    if (swipe < -swipeConfidenceThreshold) {
                                        paginate(1);
                                    } else if (swipe > swipeConfidenceThreshold) {
                                        paginate(-1);
                                    }
                                }}
                                className="absolute w-full h-full top-0 left-0"
                            >

                                <ShortsPlayer videoId={currentDetails} locations={currentItem?.locations} tickers={currentItem?.tickers} authors={currentItem?.authors} />


                                {currentItem?.profile && (
                                    <div className="absolute bottom-20 left-0 w-full px-4 0 ">
                                        <div className="bg_2 bg-opacity-80 backdrop-blur-md text-white z-40 p-4 rounded-lg">
                                            <Postdata
                                                z='50'
                                                title={currentItem.title}
                                                moreData={currentItem.description}
                                                profile={currentItem.profile}
                                            />
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Shortsmodal;
