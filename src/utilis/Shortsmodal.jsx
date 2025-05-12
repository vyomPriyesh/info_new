import { AnimatePresence, motion, wrap } from "framer-motion";
import React, { useEffect, useState } from "react";
import ShortsPlayer from "../components/ShortsPlayer";
import { RxCross2 } from "react-icons/rx";
import Postdata from "./Postdata";

const Shortsmodal = ({ open, set, data }) => {
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
                        className="absolute right-5 top-5 z-50 bg-white rounded-full h-7 w-7 flex justify-center items-center text-black"
                    >
                        <RxCross2 />
                    </button>

                    <div className="relative w-full h-full overflow-hidden">
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
                                {/* Video Player */}
                                <ShortsPlayer videoId={currentDetails} locations={currentItem?.locations} tickers={currentItem?.tickers} authors={currentItem?.authors} />

                                {/* Post Data */}
                                {currentItem?.profile && (
                                    <div className="absolute bottom-20 left-0 w-full px-4 z-40">
                                        <div className="bg_2 bg-opacity-80 backdrop-blur-md text-white max-h-[50vh] p-4 overflow-y-auto rounded-lg">
                                            <Postdata
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
